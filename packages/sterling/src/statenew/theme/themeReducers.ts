import { DatumParsed } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { ThemeState } from './theme';

/**
 * Update the theme associated with a datum.
 */
function themeChanged(
  state: ThemeState,
  action: PayloadAction<{
    datum: DatumParsed<any>;
    theme: Partial<SterlingTheme>;
  }>
) {
  const { datum, theme } = action.payload;
  state.themeByDatumId[datum.id] = theme;
  // if (state.themeByDatumId[datum.id]) {
  //   merge(state.themeByDatumId[datum.id], theme);
  // }
}

export default { themeChanged };
