import { DatumParsed } from '@/sterling-connection';

export interface DataState {
  data: Record<string, DatumParsed<any>>;
}

/**
 * Create a new Sterling data state.
 */
export const newDataState = (): DataState => {
  return {
    data: {}
  };
};
