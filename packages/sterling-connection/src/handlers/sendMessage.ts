import { Message } from '../types';

/**
 * Send a message to the data provider.
 *
 * @param ws A WebSocket.
 * @param message The message to send.
 */
export function sendMessage(ws: WebSocket, message: Message) {
  ws.send(JSON.stringify(message));
}
