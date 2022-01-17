import { Projection, SterlingTheme } from '@/sterling-theme';
import { ThemeState } from './theme';

/**
 * Return an array of projections associated with a datum id.
 */
function selectProjections(state: ThemeState, datumId: string): Projection[] {
  const theme = selectTheme(state, datumId);
  return theme ? theme.projections || [] : [];
}

/**
 * Select the theme associated with a datum id.
 */
function selectTheme(
  state: ThemeState,
  datumId: string
): SterlingTheme | undefined {
  return state.themeByDatumId[datumId];
}

export default {
  selectProjections,
  selectTheme
};
