import { Dispatch, MiddlewareAPI } from 'redux';
import { dispatchActionButtons } from '../dispatch/dispatchActionButtons';
import { dispatchProviderName } from '../dispatch/dispatchProviderName';
import { dispatchTrace } from '../dispatch/dispatchTrace';
import { Message } from '../types';

/**
 * Parse a message from the data provider and dispatch actions to the store.
 *
 * @param message The message.
 * @param api The DispatchAPI provided to the middleware.
 */
export function onMessage<D extends Dispatch, S>(
  message: string,
  api: MiddlewareAPI<D, S>
) {
  const { type, payload } = parseMessage(message);
  switch (type) {
    case 'action-buttons':
      return dispatchActionButtons(payload, api);
    case 'provider-name':
      return dispatchProviderName(payload, api);
    case 'trace':
      return dispatchTrace(payload, api);
  }
}

/**
 * Convert a string to a Message object.
 *
 * @param message The message to convert.
 */
function parseMessage(message: string): Message {
  return JSON.parse(message);
}
