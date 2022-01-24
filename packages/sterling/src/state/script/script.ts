export type ScriptRunState = 'success' | 'error' | 'changed' | 'none';
export type ScriptStageType = 'div' | 'canvas' | 'svg';

export interface ScriptState {
  stage: ScriptStageType;
  text: string;
}

export function newScriptState(): ScriptState {
  return {
    stage: 'svg',
    text: ''
  };
}
