import { DatumParsed } from '@/sterling-connection';
import { DataState, DatumProjections } from './data';

/**
 * Get an ordered list of all data.
 */
const selectData = (state: DataState): DatumParsed<any>[] => {
  const data = state.datumById;
  return state.datumIds.map((id) => data[id]);
};

/**
 * Get an ordered list of all active data.
 */
const selectActiveDatum = (state: DataState): DatumParsed<any> | null => {
  const active = state.active;
  return active ? state.datumById[active] : null;
};

/**
 * Get an ordered list of all active data projections.
 * @param state
 */
const selectActiveDatumProjections = (
  state: DataState
): DatumProjections | null => {
  const active = state.active;
  return active ? state.projectionsById[active] : null;
};

const selectStateProjections = (state: DataState, datumId: string) => {
  const projections = state.projectionsById[datumId];
  return projections ? projections.stateProjections || {} : {};
};

export default {
  selectData,
  selectActiveDatum,
  selectActiveDatumProjections,
  selectStateProjections
};
