import { Dispatch, MiddlewareAPI } from 'redux';
import { dispatchNotConnectedError } from '../dispatch/dispatchNotConnectedError';
import { TraceMessage } from '../types';
import { sendMessage } from './sendMessage';

/**
 * Handle a request for the trace by sending a request message to the data
 * provider. Dispatches a connection error to the store the provided WebSocket
 * is null.
 *
 * @param ws A WebSocket.
 * @param api The DispatchAPI provided to the middleware.
 */
export function onRequestedTrace<D extends Dispatch, S>(
  ws: WebSocket | null,
  api: MiddlewareAPI<D, S>
) {
  if (!ws) return dispatchNotConnectedError(api);

  const request: TraceMessage = {
    type: 'trace',
    version: 1
  };
  sendMessage(ws, request);
}
