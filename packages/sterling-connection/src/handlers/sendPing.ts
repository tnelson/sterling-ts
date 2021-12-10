/**
 * Send a ping message to a websocket.
 *
 * @param ws A WebSocket
 */
import { PingMessage } from '../types';

export function sendPing(ws: WebSocket | null) {
  if (ws) {
    const message: PingMessage = {
      type: 'ping',
      version: 1
    };
    ws.send(JSON.stringify(message));
  }
}
