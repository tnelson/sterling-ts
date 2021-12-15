import { createSelector } from '@reduxjs/toolkit';
import { isCommonDrawerView, UiState } from './ui';

/**
 * Get the currently active main view.
 */
const selectMainView = (state: UiState) => state.mainView;

/**
 * Get the drawer that's open for the graph view.
 */
const selectGraphDrawer = (state: UiState) => state.graphViewDrawer;

/**
 * Get the drawer that's open for the table view.
 */
const selectTableDrawer = (state: UiState) => state.tableViewDrawer;

/**
 * Get the drawer that's open for the script view.
 */
const selectScriptDrawer = (state: UiState) => state.scriptViewDrawer;

/**
 * Select the currently open common drawer view. Returns null if a common drawer
 * view is not currently open.
 */
const selectCommonDrawer = createSelector(
  [selectMainView, selectGraphDrawer, selectTableDrawer, selectScriptDrawer],
  (main, graph, table, script) => {
    switch (main) {
      case 'GraphView':
        return isCommonDrawerView(graph) ? graph : null;
      case 'TableView':
        return isCommonDrawerView(table) ? table : null;
      case 'ScriptView':
        return isCommonDrawerView(script) ? script : null;
    }
    return null;
  }
);

/**
 * Get a string indicating if the drawer is open or closed.
 */
const selectDrawerState = createSelector(
  [selectMainView, selectGraphDrawer, selectTableDrawer, selectScriptDrawer],
  (main, graph, table, script) => {
    switch (main) {
      case 'GraphView':
        return graph !== null ? 'open' : 'closed';
      case 'TableView':
        return table !== null ? 'open' : 'closed';
      case 'ScriptView':
        return script !== null ? 'open' : 'closed';
      default:
        return 'closed';
    }
  }
);

export default {
  selectMainView,
  selectGraphDrawer,
  selectTableDrawer,
  selectScriptDrawer,
  selectCommonDrawer,
  selectDrawerState
};
