import { GraphLayout } from '@/alloy-graph';
import { GraphProps } from '@/graph-svg';
import { Matrix } from 'transformation-matrix';
import { GraphsState } from './graphs';

/**
 * Select a graph layout associated with a datum.
 */
function selectGraphLayout(
  state: GraphsState,
  datumId: string,
  layoutId: string
): GraphLayout | undefined {
  const layouts = state.layoutsByDatumId[datumId];
  return layouts ? layouts.layoutById[layoutId] : undefined;
}

/**
 * Select a graph props object associated with a datum.
 * @param state
 * @param datumId
 * @param graphId
 */
function selectGraphProps(
  state: GraphsState,
  datumId: string,
  graphId: string
): GraphProps | undefined {
  const graphs = state.graphsByDatumId[datumId];
  return graphs ? graphs.graphsById[graphId] : undefined;
}

/**
 * Select the spread matrix associated with a datum.
 */
function selectSpreadMatrix(
  state: GraphsState,
  datumId: string
): Matrix | undefined {
  return state.matricesByDatumId[datumId]?.spreadMatrix;
}

/**
 * Select the zoom matrix associated with a datum.
 */
function selectZoomMatrix(
  state: GraphsState,
  datumId: string
): Matrix | undefined {
  return state.matricesByDatumId[datumId]?.zoomMatrix;
}

export default {
  selectGraphLayout,
  selectGraphProps,
  selectSpreadMatrix,
  selectZoomMatrix
};
