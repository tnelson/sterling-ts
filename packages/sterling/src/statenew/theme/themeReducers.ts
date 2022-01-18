import { DatumParsed } from '@/sterling-connection';
import { SterlingTheme } from '@/sterling-theme';
import { PayloadAction } from '@reduxjs/toolkit';
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
  //   mergeWith(state.themeByDatumId[datum.id], theme, (objValue, srcValue) => {
  //     if (isArray(objValue)) {
  //       return objValue.concat(srcValue);
  //     }
  //   });
  // }
}

export default { themeChanged };
