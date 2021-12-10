import { receivedProviderName } from '@/sterling-connection';
import { Dispatch, MiddlewareAPI } from 'redux';

export function dispatchProviderName<D extends Dispatch, S>(
  payload: string,
  api: MiddlewareAPI<D, S>
) {
  api.dispatch(receivedProviderName(payload));
}
