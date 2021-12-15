import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CommonDrawerView,
  GraphDrawerView,
  MainView,
  newUiState,
  ScriptDrawerView,
  TableDrawerView,
  UiState
} from './ui';

const initialState: UiState = newUiState();

const uiSlice = createSlice({
  name: 'ui-base',
  initialState,
  reducers: {
    mainViewChanged(state, action: PayloadAction<MainView>) {
      state.mainView = action.payload;
    },
    commonDrawerViewChanged(state, action: PayloadAction<CommonDrawerView>) {
      const view = action.payload;
      switch (state.mainView) {
        case 'GraphView':
          state.graphViewDrawer = view === state.graphViewDrawer ? null : view;
          break;
        case 'TableView':
          state.tableViewDrawer = view === state.tableViewDrawer ? null : view;
          break;
        case 'ScriptView':
          state.scriptViewDrawer =
            view === state.scriptViewDrawer ? null : view;
          break;
      }
    },
    graphDrawerViewChanged(state, action: PayloadAction<GraphDrawerView>) {
      const view = action.payload;
      state.graphViewDrawer = view === state.graphViewDrawer ? null : view;
    },
    tableDrawerViewChanged(state, action: PayloadAction<TableDrawerView>) {
      const view = action.payload;
      state.tableViewDrawer = view === state.tableViewDrawer ? null : view;
    },
    scriptDrawerViewChanged(state, action: PayloadAction<ScriptDrawerView>) {
      const view = action.payload;
      state.scriptViewDrawer = view === state.scriptViewDrawer ? null : view;
    }
  }
});

export const {
  mainViewChanged,
  commonDrawerViewChanged,
  graphDrawerViewChanged,
  tableDrawerViewChanged,
  scriptDrawerViewChanged
} = uiSlice.actions;
export default uiSlice.reducer;
