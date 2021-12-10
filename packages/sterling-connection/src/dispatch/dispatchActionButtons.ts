import { receivedActionButtons } from '@/sterling-connection';
import { Dispatch, MiddlewareAPI } from 'redux';
import { Button } from '../types';

export function dispatchActionButtons<D extends Dispatch, S>(
  payload: Button[],
  api: MiddlewareAPI<D, S>
) {
  api.dispatch(receivedActionButtons(payload));
}
