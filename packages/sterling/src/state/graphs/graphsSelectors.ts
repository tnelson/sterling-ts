import { GraphLayout } from '@/alloy-graph';
import { Projection, SterlingTheme } from '@/sterling-theme';
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
 * Return an array of projections associated with a datum.
 */
function selectProjections(state: GraphsState, datumId: string): Projection[] {
  const theme = selectTheme(state, datumId);
  return theme ? theme.projections || [] : [];
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
 * Select the theme associated with a datum.
 */
function selectTheme(
  state: GraphsState,
  datumId: string
): SterlingTheme | undefined {
  return state.themeByDatumId[datumId];
}

/**
 * Select the current time index for a datum.
 */
function selectTimeIndex(state: GraphsState, datumId: string): number {
  return state.timeByDatumId[datumId] || 0;
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
  selectProjections,
  selectSpreadMatrix,
  selectTheme,
  selectTimeIndex,
  selectZoomMatrix
};
