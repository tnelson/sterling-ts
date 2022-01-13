import { DatumParsed } from '@/sterling-connection';

export interface DataState {
  activeById: Record<string, boolean>;
  datumById: Record<string, DatumParsed<any>>;
  datumIds: string[];
}

/**
 * Create a new Sterling data state.
 */
export const newDataState = (): DataState => {
  return {
    activeById: {},
    datumById: {},
    datumIds: []
  };
};
