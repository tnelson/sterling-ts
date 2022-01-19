import { dataReceived } from '@/sterling-connection';
import { createSlice } from '@reduxjs/toolkit';
import { GraphsState, newGraphsState } from './graphs';
import reducers from './graphsReducers';
import extraReducers from './graphsExtraReducers';

const initialState: GraphsState = newGraphsState();

const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers,
  extraReducers: (builder) =>
    builder.addCase(dataReceived, extraReducers.dataReceived)
});

export const {
  graphSpread,
  graphZoomed,
  projectionAdded,
  projectionOrderingSet,
  projectionRemoved,
  projectionSet,
  timeIndexSet
} = graphsSlice.actions;
export default graphsSlice.reducer;
