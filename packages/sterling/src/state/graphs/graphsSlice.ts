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
  edgeLabelStyleRemoved,
  edgeLabelStyleSet,
  edgeStyleRemoved,
  edgeStyleSet,
  curveRemoved,
  curveSet,
  graphSpread,
  graphZoomed,
  nodeLabelStyleRemoved,
  nodeLabelStyleSet,
  nodeLabelPropRemoved,
  nodeLabelPropSet,
  projectionAdded,
  projectionOrderingSet,
  projectionRemoved,
  projectionSet,
  shapeRemoved,
  shapeSet,
  shapeStyleRemoved,
  shapeStyleSet,
  timeIndexSet
} = graphsSlice.actions;
export default graphsSlice.reducer;
