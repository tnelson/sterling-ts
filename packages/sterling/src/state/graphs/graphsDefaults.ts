import { GraphLayoutSettings } from '@/alloy-graph';
import { SterlingTheme } from '@/sterling-theme';

export const DEFAULT_LAYOUT_SETTINGS: GraphLayoutSettings = {
  nodeWidth: 100,
  nodeHeight: 60,
  nodeSep: 100,
  rankSep: 100
};

export const DEFAULT_THEME: SterlingTheme = {
  projections: [],
  hidden: {
    builtinDisconnected: true,
    disconnected: false
  }
};
