import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newScriptState, ScriptStageType, ScriptState } from './script';

const initialState: ScriptState = newScriptState();

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    scriptStageSet(state, action: PayloadAction<ScriptStageType>) {
      state.stage = action.payload;
    },
    scriptTextSet(state, action: PayloadAction<string>) {
      state.text = action.payload;
    }
  }
});

export const { scriptStageSet, scriptTextSet } = scriptSlice.actions;
export default scriptSlice.reducer;
