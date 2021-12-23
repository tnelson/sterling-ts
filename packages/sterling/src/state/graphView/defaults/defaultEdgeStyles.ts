import { getEdges, Graph } from '@/graph-lib';
import { CSSProperties } from 'react';

export const DEFAULT_EDGE_STYLE: CSSProperties = {
  stroke: '#333',
  strokeWidth: 1,
  fill: 'none'
};

export function defaultEdgeStyles(graph: Graph): Record<string, CSSProperties> {
  const edgeStyles: Record<string, CSSProperties> = {};
  getEdges(graph).forEach((edge) => {
    edgeStyles[edge.id] = DEFAULT_EDGE_STYLE;
  });
  return edgeStyles;
}
