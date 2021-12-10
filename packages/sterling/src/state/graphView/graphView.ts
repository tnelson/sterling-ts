import { StyleSet } from '@/sterling-theme';
import { Graph } from '@graph-ts/graph-lib';
import { Dict, PathDef } from '@graph-ts/graph-svg';

export interface GraphViewState {
  graphs: Graph[];
  paths: Dict<PathDef>[];
  styles: StyleSet[];
}

export const newGraphViewState = (): GraphViewState => {
  return {
    graphs: [],
    paths: [],
    styles: []
  };
};
