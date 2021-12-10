import { AlloyTrace } from '@/alloy-instance';
import { receivedState } from '@/sterling-connection';
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
    builder.addCase(
      receivedState,
      (state, action: PayloadAction<AlloyTrace>) => {
        state.trace = action.payload;
        state.selectedInstances = [];
      }
    );
  }
});

export const { selectedInstancesChanged } = dataSlice.actions;
export default dataSlice.reducer;
