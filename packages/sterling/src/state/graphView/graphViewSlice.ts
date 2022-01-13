import { buildProps, buildTraceGraphs } from '@/alloy-graph';
import {
  DataJoinParsed,
  dataReceived,
  isDatumAlloy
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { Matrix } from 'transformation-matrix';
import {
  GraphViewState,
  newDatumGraphs,
  newDatumMatrices,
  newGraphViewState
} from './graphView';

const initialState: GraphViewState = newGraphViewState();

const graphViewSlice = createSlice({
  name: 'graphView',
  initialState,
  reducers: {
    graphSpread(state, action: PayloadAction<{ id: string; matrix: Matrix }>) {
      const { id, matrix } = action.payload;
      state.matricesByDatumId[id].spreadMatrix = matrix;
    },
    graphZoomed(state, action: PayloadAction<{ id: string; matrix: Matrix }>) {
      const { id, matrix } = action.payload;
      state.matricesByDatumId[id].zoomMatrix = matrix;
    }
  },
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
              state.graphsByDatumId[id] = castDraft(newDatumGraphs(id, props));
              state.matricesByDatumId[id] = newDatumMatrices(id);
            }
          });
        }
      }
    );
  }
});

export const { graphSpread, graphZoomed } = graphViewSlice.actions;
export default graphViewSlice.reducer;
