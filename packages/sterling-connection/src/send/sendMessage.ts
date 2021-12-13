import { MessageType, Msg } from '../message';

/**
 * Send a message to the data provider.
 *
 * @param ws A WebSocket.
 * @param message The message to send.
 */
export function sendMessage<T extends MessageType, V extends number, P>(
  ws: WebSocket,
  message: Msg<T, V, P>
) {
  ws.send(JSON.stringify(message));
}
