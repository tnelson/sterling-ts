import { sterlingConnectionMiddleware } from '@/sterling-connection';
import { StyleSet } from '@/sterling-theme';
import { Graph } from '@/graph-lib';
// import { Dict, PathDef } from '@graph-ts/graph-svg';
import { configureStore, createSelector } from '@reduxjs/toolkit';
import { sterlingMiddleware } from '../middleware/sterlingMiddleware';
import dataSlice from './data/dataSlice';
import dataSelectors from './data/dataSelectors';
import graphViewSlice from './graphView/graphViewSlice';
import graphViewSelectors from './graphView/graphViewSelectors';
import providerSlice from './provider/providerSlice';
import providerSelectors from './provider/providerSelectors';
import uiSlice from './ui/uiSlice';
import uiSelectors from './ui/uiSelectors';

const store = configureStore({
  reducer: {
    data: dataSlice,
    graphView: graphViewSlice,
    provider: providerSlice,
    ui: uiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      sterlingConnectionMiddleware(),
      sterlingMiddleware()
    )
});

export type SterlingState = ReturnType<typeof store.getState>;
export type SterlingDispatch = typeof store.dispatch;
export default store;

// ---------- data slice selectors ---------- //

/**
 * Get the selected instances of the current trace.
 */
export const selectSelectedInstances = (state: SterlingState) =>
  dataSelectors.selectSelectedInstances(state.data);

/**
 * Get the current trace.
 */
export const selectTrace = (state: SterlingState) =>
  dataSelectors.selectTrace(state.data);

/**
 * Get the length of the current trace.
 * @param state
 */
export const selectTraceLength = (state: SterlingState) =>
  dataSelectors.selectTraceLength(state.data);

/**
 * Get the loopback index of the trace.
 */
export const selectTraceLoopBack = (state: SterlingState) =>
  dataSelectors.selectTraceLoopBack(state.data);

// ---------- graph view slice selectors ---------- //

// /**
//  * Get the graphs of the current trace.
//  */
// export const selectGraphs = (state: SterlingState) =>
//   graphViewSelectors.selectGraphs(state.graphView);
//
// /**
//  * Get the edge paths of the current trace.
//  */
// export const selectPaths = (state: SterlingState) =>
//   graphViewSelectors.selectPaths(state.graphView);
//
// /**
//  * Get the graph styles of the current trace.
//  */
// export const selectStyles = (state: SterlingState) =>
//   graphViewSelectors.selectStyles(state.graphView);

// ---------- provider slice selectors ---------- //

/**
 * Determine if Sterling is connected to a provider.
 */
export const selectIsConnected = (state: SterlingState) =>
  providerSelectors.selectIsConnected(state.provider);

/**
 * Get the name of the data provider.
 */
export const selectProviderName = (state: SterlingState) =>
  providerSelectors.selectProviderName(state.provider);

// ---------- ui slice selectors ---------- //

/**
 * Get the currently active main view.
 */
export const selectMainView = (state: SterlingState) =>
  uiSelectors.selectMainView(state.ui);

/**
 * Select the currently open common drawer view. Returns null if a common drawer
 * view is not currently open.
 */
export const selectCommonDrawer = (state: SterlingState) =>
  uiSelectors.selectCommonDrawer(state.ui);

/**
 * Get a string indicating if the drawer is open or closed.
 */
export const selectDrawerIsCollapsed = (state: SterlingState) =>
  uiSelectors.selectDrawerIsCollapsed(state.ui);

/**
 * Get the drawer that's open for the graph view.
 */
export const selectGraphDrawer = (state: SterlingState) =>
  uiSelectors.selectGraphDrawer(state.ui);

/**
 * Get the drawer that's open for the table view.
 */
export const selectTableDrawer = (state: SterlingState) =>
  uiSelectors.selectTableDrawer(state.ui);

/**
 * Get the drawer that's open for the script view.
 */
export const selectScriptDrawer = (state: SterlingState) =>
  uiSelectors.selectScriptDrawer(state.ui);

// ---------- combination selectors ---------- //
//
// export const selectSelectedGraphs = createSelector(
//   [selectSelectedInstances, selectGraphs],
//   (indices, graphs) => {
//     const selectedGraphs: Graph[] = [];
//     indices.forEach((index) => selectedGraphs.push(graphs[index]));
//     return selectedGraphs;
//   }
// );
//
// export const selectSelectedGraphPaths = createSelector(
//   [selectSelectedInstances, selectPaths],
//   (indices, paths) => {
//     const selectedPaths: Dict<PathDef>[] = [];
//     indices.forEach((index) => selectedPaths.push(paths[index]));
//     return selectedPaths;
//   }
// );
//
// export const selectSelectedGraphStyles = createSelector(
//   [selectSelectedInstances, selectStyles],
//   (indices, styles) => {
//     const selectedStyles: StyleSet[] = [];
//     indices.forEach((index) => selectedStyles.push(styles[index]));
//     return selectedStyles;
//   }
// );
