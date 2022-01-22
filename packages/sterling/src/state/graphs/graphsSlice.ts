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
  asAttributeSet,
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
  saveThemeRequested,
  shapeSet,
  shapeStyleRemoved,
  shapeStyleSet,
  themeFileLoaded,
  timeIndexSet
} = graphsSlice.actions;
export default graphsSlice.reducer;
