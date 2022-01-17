import { DatumGraphs, GraphMatrices, GraphViewState } from './graphView';

// /**
//  * Get the currently active graph for a specific datum.
//  */
// const selectDatumActiveGraph = (state: GraphViewState, datumId: string) => {
//   const { active, graphs } = state.graphsByDatumId[datumId];
//   return graphs[active];
// };

/**
 * Get the unprojected graphs for a datum.
 */
const selectDatumGraphs = (state: GraphViewState, datumId: string) => {
  const datumGraphs = state.graphsByDatumId[datumId];
  return datumGraphs.graphIds.map((graphId) => datumGraphs.graphsById[graphId]);
};

/**
 * Get the projected graphs for a datum.
 */
const selectDatumProjectedGraphs = (
  state: GraphViewState,
  datumId: string,
  atom: string
) => {
  const datumGraphs = state.graphsByDatumId[datumId];
  return datumGraphs.projectionGraphIds[atom].map(
    (graphId) => datumGraphs.graphsById[graphId]
  );
};

const selectGraphById = (
  state: GraphViewState,
  datumId: string,
  graphId: string
) => {
  return state.graphsByDatumId[datumId].graphsById[graphId];
};

// /**
//  * Get the complete graph state for a specific datum.
//  */
// const selectDatumGraphState = (
//   state: GraphViewState,
//   datumId: string
// ): DatumGraphs => {
//   return state.graphsByDatumId[datumId];
// };

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
  selectDatumGraphs,
  selectDatumProjectedGraphs,
  selectDatumMatrices,
  selectGraphById
};
