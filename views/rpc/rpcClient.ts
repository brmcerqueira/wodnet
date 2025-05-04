import { EventEmitter } from "./eventEmitter.ts";
import Storage from "./storage.ts";

declare const context: {
  oauth2ClientId: string;
};

export enum RPCCommand {
  DISPATCH = "DISPATCH",

  AUTHORIZE = "AUTHORIZE",
  AUTHENTICATE = "AUTHENTICATE",

  GET_GUILD = "GET_GUILD",
  GET_GUILDS = "GET_GUILDS",
  GET_CHANNEL = "GET_CHANNEL",
  GET_CHANNELS = "GET_CHANNELS",
  CREATE_CHANNEL_INVITE = "CREATE_CHANNEL_INVITE",

  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",

  SET_LOCAL_VOLUME = "SET_LOCAL_VOLUME",
  SELECT_VOICE_CHANNEL = "SELECT_VOICE_CHANNEL",
}

export enum RPCEvent {
  GUILD_STATUS = "GUILD_STATUS",

  VOICE_STATE_CREATE = "VOICE_STATE_CREATE",
  VOICE_STATE_DELETE = "VOICE_STATE_DELETE",
  VOICE_STATE_UPDATE = "VOICE_STATE_UPDATE",
  SPEAKING_START = "SPEAKING_START",
  SPEAKING_STOP = "SPEAKING_STOP",

  MESSAGE_CREATE = "MESSAGE_CREATE",
  MESSAGE_UPDATE = "MESSAGE_UPDATE",
  MESSAGE_DELETE = "MESSAGE_DELETE",

  READY = "READY",
  ERROR = "ERROR",
}

export enum RPCErrorKind {
  UNKNOWN_ERROR = 1000,

  INVALID_PAYLOAD = 4000,
  INVALID_VERSION = 4001,
  INVALID_COMMAND = 4002,
  INVALID_GUILD = 4003,
  INVALID_EVENT = 4004,
  INVALID_CHANNEL = 4005,
  INVALID_PERMISSIONS = 4006,
  INVALID_CLIENTID = 4007,
  INVALID_ORIGIN = 4008,
  INVALID_TOKEN = 4009,
  INVALID_USER = 4010,

  OAUTH2_ERROR = 5000,
}

type Callback = (
  error: RPCError | null,
  response: { [key: string]: any } | null,
) => any;

class RPCError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

interface RPCClientUser {
  id: string;
  username: string;
}

class RPCClient {
  eventEmitter: EventEmitter;
  accessToken: string | null | undefined;
  activeSubscriptions: Array<{
    event: RPCEvent;
    args: { [key: string]: any };
    callback: Callback;
  }>;
  queue: Array<() => void>;
  connected: boolean;
  ready: boolean;
  authenticated: boolean;
  requestedDisconnect: boolean;
  connectionTries: number;
  socket: WebSocket | null;
  config: { [key: string]: any };
  user: RPCClientUser | null;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.accessToken = Storage.get("accessToken");
    this.activeSubscriptions = [];
    this.queue = [];
    this.connected = false;
    this.authenticated = false;
    this.ready = false;
    this.requestedDisconnect = false;
    this.connectionTries = 0;
    this.socket = null;
    this.config = {};
    this.user = null;

    // shares new access tokens across local storage
    window.addEventListener("storage", ({ key, oldValue, newValue }) => {
      if (key !== "accessToken" || oldValue === newValue) return;

      this.accessToken = newValue;
    });

    window.addEventListener("beforeunload", () => {
      this.disconnect();
    });
  }

  public connect(tries = 0) {
    if (this.connected) {
      return;
    }

    const port = 6463 + (tries % 10);

    try {
      this.socket = new WebSocket(
        `ws://127.0.0.1:${port}/?v=1&client_id=${context.oauth2ClientId}`,
      );
    } catch (_) {
      this.handleClose({ code: 1006 });
      return;
    }

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
  }

  private disconnect() {
    if (!this.connected) {
      return;
    }

    this.requestedDisconnect = true;

    this.socket?.close();
  }

  private async authenticate() {
    if (this.authenticated) {
      return;
    }

    if (!this.accessToken) {
      await this.authorize();
      return;
    }

    this.request(
      RPCCommand.AUTHENTICATE,
      {
        access_token: this.accessToken,
      },
      async (error, response) => {
        if (error && error.code === RPCErrorKind.INVALID_TOKEN) {
          await this.authorize();
          return;
        }

        this.authenticated = true;

        if (response) {
          this.user = response.user;
        }

        this.flushQueue();

        this.activeSubscriptions.forEach((s) =>
          this.subscribe(s.event, s.args, s.callback)
        );
      },
    );
  }

  private flushQueue() {
    const queue = this.queue;
    this.queue = [];
    queue.forEach((c) => c());
  }

  private async authorize(tries = 0) {
    if (this.authenticated) {
      return;
    }

    try {
      const response = await this.request(RPCCommand.AUTHORIZE, {
        client_id: context.oauth2ClientId,
        scopes: ["rpc", "messages.read"],
        prompt: "none",
      });

      const tokenResponse = await fetch(`rpc/token?code=${response?.code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!tokenResponse.ok) {
        throw new Error("no access token");
      }

      const json = await tokenResponse.json();

      this.accessToken = json.body.accessToken;

      Storage.set("accessToken", this.accessToken);

      await this.authenticate();
    } catch (error) {
      console.log("Authorize Error", error);
      setTimeout(
        async () => await this.authorize(tries + 1),
        Math.pow(2, tries),
      );
    }
  }

  public request(
    cmd: RPCCommand,
    args: { [key: string]: any },
    eventOrCallback: RPCEvent | Callback | undefined = undefined,
    callback: Callback | undefined = undefined,
  ): Promise<{ [key: string]: any } | null> {
    if (typeof eventOrCallback === "function") {
      callback = eventOrCallback;
      eventOrCallback = undefined;
    }

    return new Promise((resolve, reject) => {
      const treatPromise: Callback = async (error, response) => {
        if (callback) {
          await callback(error, response);
        }

        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      };

      if (
        !this.connected ||
        !this.ready ||
        (!this.authenticated &&
          [RPCCommand.AUTHORIZE, RPCCommand.AUTHENTICATE].indexOf(cmd) === -1)
      ) {
        this.queue.push(() =>
          this.request(cmd, args, eventOrCallback, treatPromise)
        );
        return;
      }

      const nonce = crypto.randomUUID();

      this.eventEmitter.once(
        this.getEventName(RPCCommand.DISPATCH, nonce),
        treatPromise,
      );

      this.socket?.send(
        JSON.stringify({ cmd, args, evt: eventOrCallback, nonce }),
      );
    });
  }

  public subscribe(
    event: RPCEvent,
    args: { [key: string]: any },
    callback: Callback,
  ) {
    this.request(RPCCommand.SUBSCRIBE, args, event, (error) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (
        !this.activeSubscriptions.find((s) => {
          return callback === s.callback;
        })
      ) {
        this.activeSubscriptions.push({ event, args, callback });
        this.eventEmitter.on(
          this.getEventName(RPCCommand.DISPATCH, event),
          (d) => callback(null, d),
        );
      }
    });
  }

  private getEventName(command: RPCCommand, event: string) {
    return `${command}:${event}`;
  }

  private handleOpen() {
    this.connected = true;

    console.log("WS Open");

    this.authenticate();
  }

  private handleClose(e: CloseEvent | { code: number }) {
    this.connected = false;
    this.authenticated = false;
    this.ready = false;

    console.error("WS Closed: ", e);

    if (this.requestedDisconnect) {
      this.requestedDisconnect = false;
      return;
    }

    try {
      this.socket?.close();
    } catch {}

    const tries = e.code === 1006 ? ++this.connectionTries : 0;
    const backoff = Math.pow(2, Math.floor(tries / 10));
    setTimeout(() => this.connect(tries), backoff);
  }

  private handleMessage(message: MessageEvent) {
    let payload: {
      cmd: RPCCommand;
      evt: RPCEvent;
      nonce: string;
      data: any;
    } | undefined;

    try {
      payload = JSON.parse(message.data);
    } catch {
      console.error("Payload not JSON: ", payload);
      return;
    }

    console.log("Incoming Payload: ", payload);

    if (payload!.cmd === RPCCommand.DISPATCH) {
      if (payload!.evt === RPCEvent.READY) {
        this.config = payload!.data.config;
        this.ready = true;
        this.flushQueue();
        return;
      }

      if (payload!.evt === RPCEvent.ERROR) {
        console.error("Dispatched Error: ", payload!.data);
        this.socket?.close();
        return;
      }

      this.eventEmitter.emit(
        this.getEventName(RPCCommand.DISPATCH, payload!.evt),
        payload!.data,
      );
      return;
    }

    this.eventEmitter.emit(
      this.getEventName(RPCCommand.DISPATCH, payload!.nonce),
      payload!.evt === RPCEvent.ERROR
        ? new RPCError(payload?.data.message, payload!.data.code)
        : null,
      payload!.evt === RPCEvent.ERROR ? null : payload?.data,
    );
  }
}

export const rpc = new RPCClient();