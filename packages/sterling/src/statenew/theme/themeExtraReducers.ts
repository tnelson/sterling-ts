import { DataJoinParsed, isDatumAlloy } from '@/sterling-connection';
import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { ThemeState } from './theme';
import { DEFAULT_THEME } from './themeDefaults';

function dataReceived(
  state: WritableDraft<ThemeState>,
  action: PayloadAction<DataJoinParsed>
) {
  const { enter } = action.payload;

  if (enter) {
    // Extract Alloy data, since that's all we know how to use right now
    const alloyData = enter.filter(isDatumAlloy);

    alloyData.forEach((alloyDatum) => {
      state.themeByDatumId[alloyDatum.id] = DEFAULT_THEME;
    });
  }
}

export default {
  dataReceived
};
