import { DatumParsed } from '@/sterling-connection';
import { createSelector } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { DataState } from './data';

/**
 * Select the currently active datum.
 */
function selectActiveDatum(state: DataState): DatumParsed<any> | undefined {
  const active = selectActiveDatumId(state);
  console.log(`Active datum id: ${active}`);
  const datum = active ? selectDatumById(state, active) : undefined;
  console.log(datum);
  return datum;
}

/**
 * Select the id of the currently active datum.
 */
function selectActiveDatumId(state: DataState): string | null {
  return state.active;
}

/**
 * Select a datum by its datum id.
 */
function selectDatumById(
  state: DataState,
  datumId: string
): DatumParsed<any> | undefined {
  return state.datumById[datumId];
}

/**
 * Select an ordered array of all datum objects.
 */
const selectData = createSelector(
  [selectSelf, selectDatumIds],
  (state, datumIds) => {
    return datumIds
      .map((datumId) => selectDatumById(state, datumId))
      .filter((datum): datum is DatumParsed<any> => !isUndefined(datum));
  }
);

/**
 * Select an ordered array of all datum ids.
 */
function selectDatumIds(state: DataState): string[] {
  return state.datumIds;
}

/**
 * Select the DataState slice.
 */
function selectSelf(state: DataState): DataState {
  return state;
}

export default {
  selectActiveDatum,
  selectActiveDatumId,
  selectData,
  selectDatumById,
  selectDatumIds
};
