import { ProviderState } from './provider';

/**
 * Determine if Sterling is connected to a provider
 */
const selectIsConnected = (state: ProviderState) => state.connected;

/**
 * Get the name of the data provider.
 */
const selectProviderName = (state: ProviderState) => state.providerName;

export default { selectIsConnected, selectProviderName };
