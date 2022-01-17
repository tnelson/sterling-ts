import { DatumParsed } from '@/sterling-connection';

export interface StateProject {
  type: string;
  relation: string;
}

export interface DatumProjections {
  // projection atoms keyed by signature type
  projections: Record<string, string>;
  // state projection atoms keyed by signature type
  stateProjections: Record<string, string>;
}

export interface DataState {
  active: string | null;
  datumById: Record<string, DatumParsed<any>>;
  datumIds: string[];
  projectionsById: Record<string, DatumProjections>;
}

/**
 * Create a new Sterling data state.
 */
export const newDataState = (): DataState => {
  return {
    active: null,
    datumById: {},
    datumIds: [],
    projectionsById: {}
  };
};
