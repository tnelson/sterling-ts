import { GraphProps } from '@/graph-svg';
import { sterlingConnectionMiddleware } from '@/sterling-connection';
import { configureStore } from '@reduxjs/toolkit';
import { sterlingMiddleware } from '../middleware/sterlingMiddleware';
import dataSelectors from './data/dataSelectors';
import dataSlice from './data/dataSlice';
import graphViewSelectors from './graphView/graphViewSelectors';
import graphViewSlice from './graphView/graphViewSlice';
import logSelectors from './log/logSelectors';
import logSlice from './log/logSlice';
import providerSelectors from './provider/providerSelectors';
import providerSlice from './provider/providerSlice';
import uiSelectors from './ui/uiSelectors';
import uiSlice from './ui/uiSlice';

const store = configureStore({
  reducer: {
    data: dataSlice,
    graphView: graphViewSlice,
    log: logSlice,
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

export const selectActiveData = (state: SterlingState) =>
  dataSelectors.selectActiveData(state.data);
export const selectActiveDatumIds = (state: SterlingState) =>
  dataSelectors.selectActiveDatumIds(state.data);
export const selectDatumIds = (state: SterlingState) =>
  dataSelectors.selectDatumIds(state.data);

// ---------- graph view slice selectors ---------- //

export const selectActiveGraphStates = (state: SterlingState): GraphProps[] => {
  const activeDatumIds = selectActiveDatumIds(state);
  return activeDatumIds.map((datumId) => {
    return graphViewSelectors.selectDatumActiveGraph(state.graphView, datumId);
  });
};

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

// ---------- log slice selectors ---------- //

export const selectLogItems = (state: SterlingState) =>
  logSelectors.selectLogItems(state.log);

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
