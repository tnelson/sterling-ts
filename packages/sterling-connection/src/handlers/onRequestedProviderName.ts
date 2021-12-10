import { Dispatch, MiddlewareAPI } from 'redux';
import { dispatchNotConnectedError } from '../dispatch/dispatchNotConnectedError';
import { ProviderNameMessage } from '../types';
import { sendMessage } from './sendMessage';

/**
 * Handle a request for the provider name by sending a request message to the
 * data provider. Dispatches a connection error to the store if the provided
 * WebSocket is null.
 *
 * @param ws A WebSocket.
 * @param api The DispatchAPI provided to the middleware.
 */
export function onRequestedProviderName<D extends Dispatch, S>(
  ws: WebSocket | null,
  api: MiddlewareAPI<D, S>
) {
  if (!ws) return dispatchNotConnectedError(api);

  const request: ProviderNameMessage = {
    type: 'provider-name',
    version: 1
  };
  sendMessage(ws, request);
}
