import { DatumParsed } from '@/sterling-connection';

export interface DataState {
  activeDatumIds: string[];
  datumById: Record<string, DatumParsed<any>>;
  datumIds: string[];
}

/**
 * Create a new Sterling data state.
 */
export const newDataState = (): DataState => {
  return {
    activeDatumIds: [],
    datumById: {},
    datumIds: []
  };
};
