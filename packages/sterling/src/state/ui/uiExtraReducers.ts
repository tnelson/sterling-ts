import { ProviderMeta } from '@/sterling-connection';
import { PayloadAction } from '@reduxjs/toolkit';
import { UiState } from './ui';

function metaReceived(state: UiState, action: PayloadAction<ProviderMeta>) {
  const meta = action.payload;
  if (meta.views) {
    state.availableViews = meta.views.map((view) => {
      switch (view) {
        case 'graph':
          return 'GraphView';
        case 'table':
          return 'TableView';
        case 'script':
          return 'ScriptView';
      }
    });
    state.mainView = state.availableViews[0];
  }
}

export default { metaReceived };
