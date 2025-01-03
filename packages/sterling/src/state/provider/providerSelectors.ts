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

/** 
 * Select the generator names this provider uses.
 */
function selectProviderGeneratorNames(state: ProviderState): string[] | undefined {
  return state.providerGenerators
}

export default {
  selectIsConnected,
  selectProviderName,
  selectProviderGeneratorNames
};
