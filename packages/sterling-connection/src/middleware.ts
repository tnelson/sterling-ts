import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  connectSterling,
  disconnectSterling,
  requestedProviderName,
  requestedState,
  sterlingConnected,
  sterlingConnectionError,
  sterlingDisconnected
} from './actions';
import { onMessage } from './handlers/onMessage';
import { onRequestedProviderName } from './handlers/onRequestedProviderName';
import { onRequestedState } from './handlers/onRequestedState';

const PING_INTERVAL = 3000;
const RECONNECT_INTERVAL = 1000;

/**
 * Create a new sterling middleware function.
 */
function sterlingConnectionMiddleware<S, D extends Dispatch>(): Middleware<
  {},
  S,
  D
> {
  let ws: WebSocket | null = null;
  let reconnectIntervalId: number = 0;

  /**
   * Clears the reconnect interval, which is responsible for attempting to
   * automatically reconnect to the provider when the connection is closed.
   */
  const clearReconnectInterval = () => {
    window.clearInterval(reconnectIntervalId);
    reconnectIntervalId = 0;
  };

  /**
   * Closes the WebSocket connnection.
   */
  const disconnect = () => {
    if (ws) ws.close();
  };

  /**
   * Send a ping to the provider.
   */
  const sendPing = () => {
    if (ws) ws.send('ping');
  };

  /**
   * Establish a new connection to a Sterling provider using WebSockets. If a
   * connection exists, closes that one before opening a new one.
   *
   * @param api A Redux Middleware API.
   * @param url The URL to connect to.
   */
  const connect = (api: MiddlewareAPI<D, S>, url: string) => {
    const dispatch = api.dispatch;

    if (ws) disconnect();
    ws = new WebSocket(url);

    // a function that initializes the reconnect attempt
    const startReconnect = () => {
      clearReconnectInterval();
      reconnectIntervalId = window.setInterval(
        () => connect(api, url),
        RECONNECT_INTERVAL
      );
    };

    // respond to websocket connection events by dispatching actions
    ws.onopen = () => {
      window.setTimeout(() => sendPing(), PING_INTERVAL);
      dispatch(sterlingConnected());
      clearReconnectInterval();
    };
    ws.onclose = () => {
      dispatch(sterlingDisconnected());
      startReconnect();
    };
    ws.onerror = (event: Event) => {
      dispatch(sterlingConnectionError(event.type));
      if (ws && ws.readyState === WebSocket.CLOSED) startReconnect();
    };

    // respond to received messages by parsing data and dispatching actions
    ws.onmessage = (event: MessageEvent) => {
      const data = event.data;
      if (data === 'pong') {
        window.setTimeout(() => sendPing(), PING_INTERVAL);
      } else {
        onMessage(event.data, api);
      }
    };
  };

  // return the middleware function
  return (api: MiddlewareAPI<D, S>) => (next: Dispatch) => (action: any) => {
    if (connectSterling.match(action)) {
      connect(api, action.payload);
    } else if (disconnectSterling.match(action)) {
      disconnect();
    } else if (requestedProviderName.match(action)) {
      onRequestedProviderName(ws, api);
    } else if (requestedState.match(action)) {
      onRequestedState(ws, api);
    }
    return next(action);
  };
}

export { sterlingConnectionMiddleware };
