import { AlloyTrace } from '@/alloy-instance';

export interface DataState {
  trace: AlloyTrace | undefined;
  selectedInstances: number[];
}

/**
 * Create a new Sterling data state.
 */
export const newDataState = (): DataState => {
  return {
    trace: undefined,
    selectedInstances: []
  };
};
