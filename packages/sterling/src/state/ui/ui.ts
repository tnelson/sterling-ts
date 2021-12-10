export type GraphView = 'GraphView';
export type TableView = 'TableView';
export type ScriptView = 'ScriptView';
export type MainView = GraphView | TableView | ScriptView;

export interface UiState {
  mainView: MainView;
}

/**
 * Create a new Sterling UI base state.
 *
 * @param initialView The main view that will be initially displayed.
 */
export const newUiState = (initialView?: MainView): UiState => {
  return {
    mainView: initialView || 'GraphView'
  };
};
