import {
  sterlingConnected,
  sterlingConnectionError,
  sterlingDisconnected
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LogItemType,
  LogSortOrder,
  LogState,
  newLogState,
  newMessage
} from './log';

const initialState: LogState = newLogState();

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    filtersChanged(state, action: PayloadAction<LogItemType[]>) {
      state.filters = action.payload;
    },
    logCleared(state) {
      state.items = [];
    },
    sortOrderChanged(state, action: PayloadAction<LogSortOrder>) {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sterlingConnected, (state) => {
      state.items.push(newMessage('Connection established.'));
    });
    builder.addCase(sterlingDisconnected, (state) => {
      state.items.push(newMessage('Connection lost.'));
    });
    builder.addCase(sterlingConnectionError, (state, payload) => {
      state.items.push(newMessage(payload.payload));
    });
  }
});

export const { logCleared, sortOrderChanged } = logSlice.actions;
export default logSlice.reducer;
