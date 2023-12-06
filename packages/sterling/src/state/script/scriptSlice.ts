import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newScriptState, ScriptStageType, ScriptState } from './script';

const initialState: ScriptState = newScriptState();

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    scriptStageDimensionsSet(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.stageDimensions = action.payload;
    },
    scriptStageSet(state, action: PayloadAction<ScriptStageType>) {
      state.stage = action.payload;
    },
    scriptTextSet(state, action: PayloadAction<string[]>) {
      state.text = action.payload;
    }
  }
});

export const { scriptStageSet, scriptStageDimensionsSet, scriptTextSet } =
  scriptSlice.actions;
export default scriptSlice.reducer;
