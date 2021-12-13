import {
  metaReceived,
  sterlingConnected,
  sterlingDisconnected
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProviderMeta } from '@/sterling-connection';
import { newProviderState, ProviderState } from './provider';

const initialState: ProviderState = newProviderState();

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(metaReceived, (state, action: PayloadAction<ProviderMeta>) => {
        const { name } = action.payload;
        state.providerName = name || 'unknown provider';
      })
      .addCase(sterlingConnected, (state) => {
        state.connected = true;
      })
      .addCase(sterlingDisconnected, (state) => {
        state.connected = false;
      });
  }
});

export const {} = providerSlice.actions;
export default providerSlice.reducer;
