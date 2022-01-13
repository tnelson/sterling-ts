import { DatumGraphs, GraphMatrices, GraphViewState } from './graphView';

/**
 * Get the currently active graph for a specific datum.
 */
const selectDatumActiveGraph = (state: GraphViewState, datumId: string) => {
  const { active, graphs } = state.graphsByDatumId[datumId];
  return graphs[active];
};

/**
 * Get the complete graph state for a specific datum.
 */
const selectDatumGraphState = (
  state: GraphViewState,
  datumId: string
): DatumGraphs => {
  return state.graphsByDatumId[datumId];
};

/**
 * Get the zoom and spread matrices for a specific datum.
 */
const selectDatumMatrices = (
  state: GraphViewState,
  datumId: string
): GraphMatrices => {
  return state.matricesByDatumId[datumId];
};

export default {
  selectDatumActiveGraph,
  selectDatumGraphState,
  selectDatumMatrices
};
