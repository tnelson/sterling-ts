import { GraphLayout } from '@/alloy-graph';
import { DatumParsed } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { Matrix } from 'transformation-matrix';
import { generateLayoutId, GraphsState } from './graphs';

/**
 * Select a graph layout associated with a datum.
 */
function selectGraphLayout(
  state: GraphsState,
  datum: DatumParsed<any>
): GraphLayout {
  const projections = selectProjections(state, datum);
  const layouts = state.layoutsByDatumId[datum.id];
  const layoutId = generateLayoutId(projections);
  return layouts.layoutById[layoutId];
}

/**
 * Return an array of projections associated with a datum.
 */
function selectProjections(
  state: GraphsState,
  datum: DatumParsed<any>
): Projection[] {
  const theme = selectTheme(state, datum);
  return theme ? theme.projections || [] : [];
}

/**
 * Select the spread matrix associated with a datum.
 */
function selectSpreadMatrix(
  state: GraphsState,
  datum: DatumParsed<any>
): Matrix | undefined {
  return state.matricesByDatumId[datum.id]?.spreadMatrix;
}

/**
 * Select the theme associated with a datum.
 */
function selectTheme(
  state: GraphsState,
  datum: DatumParsed<any>
): SterlingTheme {
  return state.themeByDatumId[datum.id];
}

/**
 * Select the current time index for a datum.
 */
function selectTimeIndex(state: GraphsState, datum: DatumParsed<any>): number {
  return state.timeByDatumId[datum.id] || 0;
}

/**
 * Select the zoom matrix associated with a datum.
 */
function selectZoomMatrix(
  state: GraphsState,
  datum: DatumParsed<any>
): Matrix | undefined {
  return state.matricesByDatumId[datum.id]?.zoomMatrix;
}

export default {
  selectGraphLayout,
  selectProjections,
  selectSpreadMatrix,
  selectTheme,
  selectTimeIndex,
  selectZoomMatrix
};
