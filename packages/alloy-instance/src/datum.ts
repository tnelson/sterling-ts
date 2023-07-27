import { AlloyInstance } from '@/alloy-instance';
import { GraphProps } from '@/graph-svg';
import { SterlingTheme } from '@/sterling-theme';

export interface VisualizerConfig {
  script?: string
}

export interface AlloyDatum {
  instances: AlloyInstance[];
  bitwidth?: number;
  command?: string;
  loopBack?: number;
  maxSeq?: number;
  maxTrace?: number;
  minTrace?: number;
  traceLength?: number;
  visualizerConfig?: VisualizerConfig;
}

export interface AlloyDatumTrace extends AlloyDatum {
  loopBack: number;
  maxTrace: number;
  minTrace: number;
  traceLength: number;
}

export const isAlloyDatum = (datum: any): datum is AlloyDatum => {
  return Array.isArray(datum.instances);
};

export const isAlloyDatumTrace = (
  datum: AlloyDatum
): datum is AlloyDatumTrace => {
  return (
    // datum.minTrace !== undefined &&
    // datum.minTrace > 0 &&
    // datum.maxTrace !== undefined &&
    // datum.maxTrace > 0 &&
    // datum.traceLength !== undefined &&
    datum.loopBack !== undefined
  );
};

export function generateGraphId(
  datum: AlloyDatum,
  theme: SterlingTheme,
  projections: Record<string, string>,
  index: number
): string {
  return '';
}

export const getTraceLength = (datum: AlloyDatumTrace): number => {
  return datum.traceLength;
};

export const getTraceLoopback = (datum: AlloyDatumTrace): number => {
  return datum.loopBack;
};
