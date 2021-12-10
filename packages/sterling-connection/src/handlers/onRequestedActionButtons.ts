import { Dispatch, MiddlewareAPI } from 'redux';
import { dispatchNotConnectedError } from '../dispatch/dispatchNotConnectedError';
import { ActionButtonsMessage } from '../types';
import { sendMessage } from './sendMessage';

/**
 * Handle a request for the action buttons by sending a request message to the
 * data provider. Dispatches a connection error to the store if the provided
 * WebSocket is null.
 *
 * @param ws A WebSocket.
 * @param api The DispatchAPI provided to the middleware.
 */
export function onRequestedActionButtons<D extends Dispatch, S>(
  ws: WebSocket | null,
  api: MiddlewareAPI<D, S>
) {
  if (!ws) return dispatchNotConnectedError(api);

  const request: ActionButtonsMessage = {
    type: 'action-buttons',
    version: 1
  };
  sendMessage(ws, request);
}
