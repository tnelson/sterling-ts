import {
  requestedProviderName,
  requestedState,
  sterlingConnected
} from '@/sterling-connection';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

function sterlingMiddleware<S, D extends Dispatch>(): Middleware<{}, S, D> {
  return (api: MiddlewareAPI<D, S>) => (next: Dispatch) => (action: any) => {
    if (sterlingConnected.match(action)) {
      next(action);
      api.dispatch(requestedProviderName);
      api.dispatch(requestedState);
    } else {
      return next(action);
    }
  };
}

export { sterlingMiddleware };
