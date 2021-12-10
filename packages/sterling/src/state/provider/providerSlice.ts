import {
  receivedProviderName,
  sterlingConnected,
  sterlingDisconnected
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newProviderState, ProviderState } from './provider';

const initialState: ProviderState = newProviderState();

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(receivedProviderName, (state, action: PayloadAction<string>) => {
        state.providerName = action.payload;
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
