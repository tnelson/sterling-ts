import { ProviderState } from './provider';

/**
 * Select the connection status.
 */
function selectIsConnected(state: ProviderState): boolean {
  return state.connected;
}

/**
 * Select the name of the provider.
 */
function selectProviderName(state: ProviderState): string {
  return state.providerName;
}

export default {
  selectIsConnected,
  selectProviderName
};
