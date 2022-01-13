import { dataReceived } from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataJoinParsed } from '@/sterling-connection';
import { DataState, newDataState } from './data';

const initialState: DataState = newDataState();

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    datumSelected(state, action: PayloadAction<string>) {
      state.datumIds.forEach((id) => (state.activeById[id] = false));
      state.activeById[action.payload] = true;
    },
    datumToggled(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.activeById[id] = !state.activeById[id];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter, update, exit } = action.payload;
        if (enter) {
          enter.forEach((datum) => {
            // Check that the datum id does not already exist before adding it to the state.
            const id = datum.id;
            if (!state.datumById[id]) {
              state.datumById[id] = datum;
              state.activeById[id] = false;
            }
          });
          state.datumIds.push(...enter.map((datum) => datum.id));
          const lastDatumId = state.datumIds[state.datumIds.length - 1];
          state.activeById[lastDatumId] = true;
        }
        if (update) {
          update.forEach((meta) => {
            // Check that the datum does exist in the state before updating it.
            const id = meta.id;
            if (state.datumById[id]) {
              Object.assign(state.datumById[id], meta);
            }
          });
        }
        if (exit) {
          exit.forEach((id) => {
            // Check that the datum exists before removing it from the state.
            if (state.datumById[id]) {
              delete state.datumById[id];
              delete state.activeById[id];
            }
          });
        }
      }
    );
  }
});

export const { datumSelected, datumToggled } = dataSlice.actions;
export default dataSlice.reducer;
