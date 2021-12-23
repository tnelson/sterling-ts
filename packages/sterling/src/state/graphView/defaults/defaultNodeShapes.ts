import { getNodes, Graph } from '@/graph-lib';
import { ShapeDef } from '@/graph-svg';

export const DEFAULT_NODE_SHAPE: ShapeDef = {
  shape: 'rectangle',
  width: 100,
  height: 60
};

export function defaultNodeShapes(graph: Graph): Record<string, ShapeDef> {
  const nodeShapes: Record<string, ShapeDef> = {};
  getNodes(graph).forEach((node) => {
    nodeShapes[node.id] = DEFAULT_NODE_SHAPE;
  });
  return nodeShapes;
}
