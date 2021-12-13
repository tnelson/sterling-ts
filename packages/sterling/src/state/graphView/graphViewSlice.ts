import { dataReceived } from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataJoin } from '@/sterling-connection';
import { GraphViewState, newGraphViewState } from './graphView';

const initialState: GraphViewState = newGraphViewState();

const graphViewSlice = createSlice({
  name: 'graphView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dataReceived, (state, action: PayloadAction<DataJoin>) => {
      // TODO: Handle data joins
      // const trace = action.payload;
      // const graphs = buildTraceGraphs(trace);
      // const styles = graphs.map(([graph, _]) => generateStyles(graph));
      // state.graphs = graphs.map(([g, _]) => g);
      // state.paths = graphs.map(([_, p]) => p);
      // state.styles = castDraft(styles);
    });
  }
});

export const {} = graphViewSlice.actions;
export default graphViewSlice.reducer;
