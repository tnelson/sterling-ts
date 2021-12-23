import { Graph, PositionedNode, RoutedEdge } from '@/graph-lib';
import { Matrix } from 'transformation-matrix';
import { GraphProps } from './types';

export interface GraphGroupProps<N extends PositionedNode, E extends RoutedEdge>
  extends GraphProps {
  graph: Graph<N, E>;
  onHoverNode?: (nodeId: string | null) => void;
  targetSpread?: Matrix;
}
