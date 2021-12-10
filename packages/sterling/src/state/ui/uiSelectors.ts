import { UiState } from './ui';

/**
 * Get the currently active main view.
 */
const selectMainView = (state: UiState) => state.mainView;

export default {
  selectMainView
};
