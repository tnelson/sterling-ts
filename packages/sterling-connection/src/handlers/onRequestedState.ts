import { parseTraceXML } from '@/alloy-instance';
import { receivedState } from '@/sterling-connection';
import { trace2 } from '@/test-data/trace2';
import { Dispatch, MiddlewareAPI } from 'redux';
import { dispatchNotConnectedError } from '../dispatch/dispatchNotConnectedError';

export function onRequestedState<D extends Dispatch, S>(
  ws: WebSocket | null,
  api: MiddlewareAPI<D, S>
) {
  if (!ws) return dispatchNotConnectedError(api);

  const trace = parseTraceXML(trace2);
  api.dispatch(receivedState(trace));
}
