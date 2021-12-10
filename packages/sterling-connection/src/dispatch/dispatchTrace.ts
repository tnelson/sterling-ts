import { receivedTrace } from '@/sterling-connection';
import { Dispatch, MiddlewareAPI } from 'redux';
import { Trace } from '../types';

export function dispatchTrace<D extends Dispatch, S>(
  payload: Trace,
  api: MiddlewareAPI<D, S>
) {
  api.dispatch(receivedTrace(payload));
}
