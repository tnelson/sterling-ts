import { dataReceived } from '@/sterling-connection';
import { createSlice } from '@reduxjs/toolkit';
import { newThemeState, ThemeState } from './theme';
import reducers from './themeReducers';
import extraReducers from './themeExtraReducers';

const initialState: ThemeState = newThemeState();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers,
  extraReducers: (builder) =>
    builder.addCase(dataReceived, extraReducers.dataReceived)
});

export const { themeChanged } = themeSlice.actions;
export default themeSlice.reducer;
