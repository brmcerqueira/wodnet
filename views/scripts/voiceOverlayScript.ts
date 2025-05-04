import { rpc, RPCCommand, RPCEvent } from "../rpc/rpcClient.ts";

declare const context: {
  channelId: string;
};

rpc.connect();

rpc.request(
  RPCCommand.GET_CHANNEL,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    /*this.setState({
    voiceStates: data.voice_states,
  });*/
  },
);

rpc.subscribe(
  RPCEvent.VOICE_STATE_CREATE,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    /*this.state.voiceStates.push(data);
  this.setState({
    voiceStates: lodash.uniqBy(this.state.voiceStates, 'user.id'),
  });*/
  },
);

rpc.subscribe(
  RPCEvent.VOICE_STATE_DELETE,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    /*lodash.remove(this.state.voiceStates, (v) => {
    // @ts-expect-error state types unknown
    return v.user.id === data.user.id;
  });
  this.forceUpdate();*/
  },
);

rpc.subscribe(
  RPCEvent.VOICE_STATE_UPDATE,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    // @ts-expect-error state types unknown
    const state = this.state.voiceStates.find((v) => {
      return v.user.id === data.user.id;
    });
    if (!state) return;
    Object.assign(state, data);
    //this.forceUpdate();
  },
);

rpc.subscribe(
  RPCEvent.SPEAKING_START,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    // @ts-expect-error state types unknown
    const state = this.state.voiceStates.find((v) => {
      return v.user.id === data.user_id;
    });
    if (!state) return;
    state.speaking = true;
    //this.forceUpdate();
  },
);

rpc.subscribe(
  RPCEvent.SPEAKING_STOP,
  { channel_id: context.channelId },
  (error, data) => {
    if (error || data == null) return;
    // @ts-expect-error state types unknown
    const state = this.state.voiceStates.find((v) => {
      return v.user.id === data.user_id;
    });
    if (!state) return;
    state.speaking = false;
    //this.forceUpdate();
  },
);
