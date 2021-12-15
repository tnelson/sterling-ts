import { dataReceived } from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataJoinParsed } from '@/sterling-connection';
import { DataState, newDataState } from './data';

const initialState: DataState = newDataState();

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter, update, exit } = action.payload;
        if (enter) {
          enter.forEach((datum) => {
            // Check that the datum id does not already exist before adding it to the state.
            const id = datum.id;
            if (state.data[id] !== undefined)
              return console.error(
                `Cannot add datum. Datum with id ${id} already exists.`
              );
            state.data[id] = datum;
          });
        }
        if (update) {
          update.forEach((meta) => {
            // Check that the datum does exist in the state before updating it.
            const id = meta.id;
            if (state.data[id] === undefined)
              return console.error(
                `Cannot update datum. Datum with id ${id} does not exist`
              );
            Object.assign(state.data[id], meta);
          });
        }
        if (exit) {
          exit.forEach((id) => {
            // Check that the datum exists before removing it from the state.
            if (state.data[id] === undefined)
              return console.error(
                `Cannot remove datum. Datum with id ${id} does not exist`
              );
            delete state.data[id];
          });
        }
      }
    );
  }
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
