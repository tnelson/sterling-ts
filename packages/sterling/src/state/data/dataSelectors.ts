import { DatumParsed } from '@/sterling-connection';
import { DataState } from './data';

/**
 * Get a record of active data by id
 */
const selectActiveById = (state: DataState): Record<string, boolean> => {
  return state.activeById;
};

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
const selectDataActive = (state: DataState): DatumParsed<any>[] => {
  const activeById = selectActiveById(state);
  return selectData(state).filter((datum) => activeById[datum.id]);
};

export default {
  selectActiveById,
  selectData,
  selectDataActive
};
