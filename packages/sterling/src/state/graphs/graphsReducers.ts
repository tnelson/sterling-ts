import { generateGraph, generateLayout } from '@/alloy-graph';
import { applyProjections, isDefined } from '@/alloy-instance';
import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Projection } from '@/sterling-theme';
import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { remove } from 'lodash';
import { Matrix } from 'transformation-matrix';
import { generateLayoutId, GraphsState } from './graphs';
import { DEFAULT_LAYOUT_SETTINGS } from './graphsDefaults';

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

/**
 * Add a projection for a datum.
 */
function projectionAdded(
  state: DraftState,
  action: PayloadAction<{
    datum: DatumParsed<any>;
    type: string;
    atom: string;
    time?: boolean;
    timeOrdering?: string;
  }>
) {
  const { datum, type, atom, time, timeOrdering } = action.payload;

  const datumId = datum.id;
  const projection: Projection = {
    type,
    atom,
    time,
    timeOrdering
  };
  const theme = state.themeByDatumId[datumId];
  if (theme.projections) {
    theme.projections.push(projection);
  } else {
    theme.projections = [projection];
  }
  validateLayouts(state, datum);
}

/**
 * Set the relation that defines the total ordering for a projection.
 */
function projectionOrderingSet(
  state: DraftState,
  action: PayloadAction<{
    datum: DatumParsed<any>;
    type: string;
    relation: string | undefined;
  }>
) {
  const { datum, type, relation } = action.payload;

  const datumId = datum.id;
  const theme = state.themeByDatumId[datumId];
  const projections = theme ? theme.projections || [] : [];
  const projection = projections.find((p) => p.type === type);
  if (projection) {
    if (relation) {
      projection.timeOrdering = relation;
    } else {
      delete projection.timeOrdering;
    }
  }
}

/**
 * Remove a projected type for a datum.
 */
function projectionRemoved(
  state: DraftState,
  action: PayloadAction<{ datum: DatumParsed<any>; type: string }>
) {
  const { datum, type } = action.payload;

  const datumId = datum.id;
  const theme = state.themeByDatumId[datumId];
  if (theme.projections) {
    remove(theme.projections, (p) => p.type === type);
  }
  validateLayouts(state, datum);
}

/**
 * Set the projected atom of a certain type for a datum.
 */
function projectionSet(
  state: DraftState,
  action: PayloadAction<{ datum: DatumParsed<any>; type: string; atom: string }>
) {
  const { datum, type, atom } = action.payload;

  const datumId = datum.id;
  const theme = state.themeByDatumId[datumId];
  const projections = theme ? theme.projections || [] : [];
  const projection = projections.find((p) => p.type === type);
  if (projection) {
    projection.atom = atom;
  }
  validateLayouts(state, datum);
}

function timeIndexSet(
  state: DraftState,
  action: PayloadAction<{ datum: DatumParsed<any>; index: number }>
) {
  const { datum, index } = action.payload;

  const datumId = datum.id;
  state.timeByDatumId[datumId] = index;
}

/**
 * Validate layouts by making sure that one exists for the current set of
 * projections for the given datum.
 */
function validateLayouts(state: DraftState, datum: DatumParsed<any>) {
  if (isDatumAlloy(datum)) {
    const datumId = datum.id;
    const theme = state.themeByDatumId[datum.id];
    const projections = theme ? theme.projections || [] : [];
    const layoutId = generateLayoutId(projections);

    if (!state.layoutsByDatumId[datumId].layoutById[layoutId]) {
      const instances = datum.parsed.instances;
      const atoms = projections.map((proj) => proj.atom).filter(isDefined);
      console.log(atoms);
      console.log('applying projections');
      const projected = instances.map((inst) => applyProjections(inst, atoms));
      console.log('generating graphs');
      const graphs = projected.map((inst) => generateGraph(inst, theme));
      console.log('generating layout');

      state.layoutsByDatumId[datumId].layoutById[layoutId] = generateLayout(
        graphs,
        DEFAULT_LAYOUT_SETTINGS
      );
    }
  }
}

export default {
  graphSpread,
  graphZoomed,
  projectionAdded,
  projectionOrderingSet,
  projectionRemoved,
  projectionSet,
  timeIndexSet
};

export { validateLayouts };
