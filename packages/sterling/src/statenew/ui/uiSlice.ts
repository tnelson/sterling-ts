import { createSlice } from '@reduxjs/toolkit';
import { newUiState, UiState } from './ui';
import uiReducers from './uiReducers';

const initialState: UiState = newUiState();

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: uiReducers
});

export const {
  mainViewChanged,
  commonDrawerViewChanged,
  graphDrawerViewChanged,
  tableDrawerViewChanged,
  scriptDrawerViewChanged
} = uiSlice.actions;
export default uiSlice.reducer;
