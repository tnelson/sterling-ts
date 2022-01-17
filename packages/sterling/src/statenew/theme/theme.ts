import { SterlingTheme } from '@/sterling-theme';

export interface ThemeState {
  // the theme associated with each datum
  themeByDatumId: Record<string, SterlingTheme>;
  // the set of projected atoms associated with each datum
  projectionsByDatumId: Record<string, Record<string, string>>;
}

/**
 * Create an empty theme state.
 */
export const newThemeState = (): ThemeState => {
  return {
    themeByDatumId: {},
    projectionsByDatumId: {}
  };
};
