import { ProviderMeta } from '@/sterling-connection';
import { PayloadAction } from '@reduxjs/toolkit';
import { UiState } from './ui';

function metaReceived(state: UiState, action: PayloadAction<ProviderMeta>) {
  const meta = action.payload;
  state.availableViews = ['GraphView', 'TableView', 'ScriptView', 'JsonView']
  state.mainView = state.availableViews[0]
  // TODO: temporary, to avoid Forge-side change 
  
  /*if (meta.views) {
    state.availableViews = meta.views.map((view) => {
      switch (view) {
        case 'graph':
          return 'GraphView';
        case 'table':
          return 'TableView';
        case 'script':
          return 'ScriptView';
        case 'json':
          return 'JsonView';
        default:
          console.log(`Requested view type {view} unsupported. Reverting to GraphView`)
          return 'GraphView'
      }
    });
    state.mainView = state.availableViews[0];
  }*/
}

export default { metaReceived };
