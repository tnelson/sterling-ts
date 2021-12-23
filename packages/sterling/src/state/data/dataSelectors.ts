import { DatumParsed } from '@/sterling-connection';
import { DataState } from './data';

/**
 * Get the active datum.
 */
const selectActiveData = (state: DataState): DatumParsed<any>[] => {
  return state.activeDatumIds.map((id) => state.datumById[id]);
};

/**
 * Get the ID of the active datum.
 */
const selectActiveDatumIds = (state: DataState): string[] => {
  return state.activeDatumIds;
};

/**
 * Get an ordered list of all datum IDs.
 */
const selectDatumIds = (state: DataState) => {
  return state.datumIds;
};

export default {
  selectActiveData,
  selectActiveDatumIds,
  selectDatumIds
};
