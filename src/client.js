import { TelepartyClient } from 'teleparty-websocket-lib';


let client = null;

export const getClient = () => {
  if (!client) {
    client = new TelepartyClient({
      onConnectionReady: () => {
        console.log("Connected to WebSocket");
      },
      onClose: () => {
        window.location.reload();
      },
      onMessage: () => {
      }
    });
  }

  return client;
};
