export type ScriptRunState = 'success' | 'error' | 'changed' | 'none';
export type ScriptStageType = 'div' | 'canvas' | 'svg';
export type ScriptStageElement =
  | SVGSVGElement
  | HTMLCanvasElement
  | HTMLDivElement
  | null;

export interface ScriptState {
  stage: ScriptStageType;
  stageDimensions: { width: number; height: number };
  text: string;
}

export interface ScriptVariable {
  name: string;
  type: string;
  typeUrl?: string;
  variable: any;
}

export function newScriptState(): ScriptState {
  return {
    stage: 'svg',
    stageDimensions: {
      width: 0,
      height: 0
    },
    text: ''
  };
}