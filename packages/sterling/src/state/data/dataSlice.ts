import { DataJoin, dataReceived } from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataState, newDataState } from './data';

const initialState: DataState = newDataState();

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    selectedInstancesChanged(state, action: PayloadAction<number[]>) {
      state.selectedInstances = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(dataReceived, (state, action: PayloadAction<DataJoin>) => {
      // TODO: Handle data joins
      console.log('TODO: Handle data joins');
    });
  }
});

export const { selectedInstancesChanged } = dataSlice.actions;
export default dataSlice.reducer;
