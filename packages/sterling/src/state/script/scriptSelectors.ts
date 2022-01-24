import { ScriptStageType, ScriptState } from './script';

function selectScriptStage(state: ScriptState): ScriptStageType {
  return state.stage;
}

function selectScriptText(state: ScriptState): string {
  return state.text;
}

export default {
  selectScriptStage,
  selectScriptText
};
