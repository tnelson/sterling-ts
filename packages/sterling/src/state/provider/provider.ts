export interface ProviderState {
  connected: boolean;
  providerName: string;
}

export const newProviderState = (): ProviderState => {
  return {
    connected: false,
    providerName: 'unknown provider'
  };
};
