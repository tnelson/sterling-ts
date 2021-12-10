import { DataState } from './data';

/**
 * Get the selected instances of the current trace.
 */
const selectSelectedInstances = (state: DataState) => state.selectedInstances;

/**
 * Get the current trace.
 */
const selectTrace = (state: DataState) => state.trace;

/**
 * Get the length of the current trace.
 */
const selectTraceLength = (state: DataState) =>
  state.trace ? state.trace.instances.length : 0;

/**
 * Get the loopback index of the trace.
 */
const selectTraceLoopBack = (state: DataState) =>
  state.trace ? state.trace.loopBack : 0;

export default {
  selectSelectedInstances,
  selectTrace,
  selectTraceLength,
  selectTraceLoopBack
};
