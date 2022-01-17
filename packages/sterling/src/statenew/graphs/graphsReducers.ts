import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { Matrix } from 'transformation-matrix';
import { GraphsState } from './graphs';

/**
 * An Immer draft of a GraphsState object, so that we can "mutate" the state
 * rather than build a new one in our reducers.
 */
type DraftState = WritableDraft<GraphsState>;

/**
 * Set the spread matrix for a datum.
 */
function graphSpread(
  state: DraftState,
  action: PayloadAction<{ datumId: string; matrix: Matrix }>
) {
  const { datumId, matrix } = action.payload;
  const matrices = state.matricesByDatumId[datumId];
  if (matrices) {
    matrices.spreadMatrix = matrix;
  }
}

/**
 * Set the zoom matrix for a datum.
 */
function graphZoomed(
  state: DraftState,
  action: PayloadAction<{ datumId: string; matrix: Matrix }>
) {
  const { datumId, matrix } = action.payload;
  const matrices = state.matricesByDatumId[datumId];
  if (matrices) {
    matrices.zoomMatrix = matrix;
  }
}

export default {
  graphSpread,
  graphZoomed
};
