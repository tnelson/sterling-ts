import { getNodes, Graph } from '@/graph-lib';
import { CSSProperties } from 'react';

export const DEFAULT_NODE_STYLE: CSSProperties = {
  stroke: 'steelblue',
  fill: 'none'
};

export function defaultNodeStyles(graph: Graph): Record<string, CSSProperties> {
  const nodeStyles: Record<string, CSSProperties> = {};
  getNodes(graph).forEach((node) => {
    nodeStyles[node.id] = DEFAULT_NODE_STYLE;
  });
  return nodeStyles;
}
