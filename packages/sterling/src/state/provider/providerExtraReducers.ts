import { ProviderMeta } from '@/sterling-connection';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProviderState } from './provider';

/**
 * Update provider metadata.
 */
function metaReceived(
  state: ProviderState,
  action: PayloadAction<ProviderMeta>
) {
  const { name } = action.payload;
  state.providerName = name || 'unknown provider';
}

/**
 * Update connection status to connected.
 */
function sterlingConnected(state: ProviderState) {
  state.connected = true;
}

/**
 * Update connection status to disconnected.
 */
function sterlingDisconected(state: ProviderState) {
  state.connected = false;
}

export default {
  metaReceived,
  sterlingConnected,
  sterlingDisconected
};
