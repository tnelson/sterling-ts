import { DatumGraphs, GraphViewState } from './graphView';

const selectDatumActiveGraph = (state: GraphViewState, datumId: string) => {
  const { active, graphs } = state.byDatumId[datumId];
  return graphs[active];
};

const selectDatumGraphState = (
  state: GraphViewState,
  datumId: string
): DatumGraphs => {
  return state.byDatumId[datumId];
};

export default {
  selectDatumActiveGraph,
  selectDatumGraphState
};
