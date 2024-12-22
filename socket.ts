let socket: WebSocket;

export function setSocket(value: WebSocket) {
  socket = value;
}

export function onOpen(event: Event) {
  console.log("a client connected!");
}

export function onMessage(event: MessageEvent) {
  if (event.data === "ping") {
    socket.send("pong");
  }
}
