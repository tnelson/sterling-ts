import {
  buttonClicked,
  Click,
  DataJoinParsed,
  dataReceived,
  dataRequested,
  metaReceived,
  metaRequested,
  ProviderMeta,
  sterlingConnected,
  sterlingConnectionError,
  sterlingDisconnected
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { datumSelected, datumToggled } from '../data/dataSlice';
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
    builder.addCase(buttonClicked, (state, action: PayloadAction<Click>) => {
      const { id, onClick } = action.payload;
      state.items.push(
        newMessage(`Click button - Datum ID: ${id} - Button: ${onClick}`)
      );
    });
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter, update, exit } = action.payload;
        const en = enter?.length || 0;
        const up = update?.length || 0;
        const ex = exit?.length || 0;
        state.items.push(
          newMessage(`Receive data: ${en} enter, ${up} update, ${ex} exit.`)
        );
      }
    );
    builder.addCase(datumSelected, (state, action: PayloadAction<string>) => {
      state.items.push(
        newMessage(`Datum selected - Datum ID: ${action.payload}`)
      );
    });
    builder.addCase(datumToggled, (state, action: PayloadAction<string>) => {
      state.items.push(
        newMessage(`Datum toggled - Datum ID: ${action.payload}`)
      );
    });
    builder.addCase(dataRequested, (state) => {
      state.items.push(newMessage('Request data.'));
    });
    builder.addCase(
      metaReceived,
      (state, action: PayloadAction<ProviderMeta>) => {
        const { name } = action.payload;
        state.items.push(newMessage(`Receive metadata from ${name}.`));
      }
    );
    builder.addCase(metaRequested, (state) => {
      state.items.push(newMessage('Request provider metadata.'));
    });
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
