import { buildProps, buildTraceGraphs } from '@/alloy-graph';
import {
  DataJoinParsed,
  dataReceived,
  isDatumAlloy
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { GraphViewState, newDatumGraphs, newGraphViewState } from './graphView';

const initialState: GraphViewState = newGraphViewState();

const graphViewSlice = createSlice({
  name: 'graphView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter } = action.payload;
        if (enter) {
          enter.forEach((enter) => {
            if (isDatumAlloy(enter)) {
              const id = enter.id;
              const trace = enter.parsed;
              const graphs = buildTraceGraphs(trace);
              const props = graphs.map((graph, index) => {
                return buildProps(`${index}`, graph);
              });
              state.byDatumId[id] = castDraft(newDatumGraphs(id, props));
            }
          });
        }
      }
    );
  }
});

export const {} = graphViewSlice.actions;
export default graphViewSlice.reducer;
