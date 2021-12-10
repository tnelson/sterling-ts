import { buildTraceGraphs, generateStyles } from '@/alloy-graph';
import { AlloyTrace } from '@/alloy-instance';
import { receivedState } from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { GraphViewState, newGraphViewState } from './graphView';

const initialState: GraphViewState = newGraphViewState();

const graphViewSlice = createSlice({
  name: 'graphView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      receivedState,
      (state, action: PayloadAction<AlloyTrace>) => {
        const trace = action.payload;
        const graphs = buildTraceGraphs(trace);
        const styles = graphs.map(([graph, _]) => generateStyles(graph));
        state.graphs = graphs.map(([g, _]) => g);
        state.paths = graphs.map(([_, p]) => p);
        state.styles = castDraft(styles);
      }
    );
  }
});

export const {} = graphViewSlice.actions;
export default graphViewSlice.reducer;
