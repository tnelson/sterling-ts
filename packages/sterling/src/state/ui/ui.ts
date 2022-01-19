export type GraphView = 'GraphView';
export type TableView = 'TableView';
export type ScriptView = 'ScriptView';
export type MainView = GraphView | TableView | ScriptView;
export type CommonDrawerView = 'evaluator' | 'log';
export type GraphDrawerView =
  | CommonDrawerView
  | 'state'
  | 'theme'
  | 'layout'
  | 'settings';
export type TableDrawerView = CommonDrawerView | 'settings';
export type ScriptDrawerView = CommonDrawerView | 'settings';

export interface UiState {
  mainView: MainView;
  graphViewDrawer: GraphDrawerView | null;
  tableViewDrawer: TableDrawerView | null;
  scriptViewDrawer: ScriptDrawerView | null;
}

/**
 * Create a new UI state.
 */
export const newUiState = (initialView?: MainView): UiState => {
  return {
    mainView: initialView || 'GraphView',
    graphViewDrawer: 'theme',
    tableViewDrawer: 'log',
    scriptViewDrawer: 'log'
  };
};

/**
 * Determine if a string is a common drawer view string.
 */
export function isCommonDrawerView(
  view: string | null
): view is CommonDrawerView {
  return view === 'data' || view === 'evaluator' || view === 'log';
}
