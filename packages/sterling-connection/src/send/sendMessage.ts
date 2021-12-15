import { MessageType, Msg } from '../message';

/**
 * Send a message to the data provider.
 *
 * @param ws A WebSocket.
 * @param message The message to send.
 */
export function sendMessage(ws: WebSocket, message: Msg) {
  console.log(`SEND: ${message}`);
  ws.send(JSON.stringify(message));
}
