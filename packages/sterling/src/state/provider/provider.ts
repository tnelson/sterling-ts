export interface ProviderState {
  connected: boolean;
  providerName: string;
}

/**
 * Create a new provider state.
 */
export const newProviderState = (): ProviderState => {
  return {
    connected: false,
    providerName: 'unknown provider'
  };
};
