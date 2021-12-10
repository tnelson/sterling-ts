import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainView, newUiState, UiState } from './ui';

const initialState: UiState = newUiState();

const uiSlice = createSlice({
  name: 'ui-base',
  initialState,
  reducers: {
    mainViewChanged(state, action: PayloadAction<MainView>) {
      state.mainView = action.payload;
    }
  }
});

export const { mainViewChanged } = uiSlice.actions;
export default uiSlice.reducer;
