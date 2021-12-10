import { Edge, Graph, newGraph, PositionedNode } from '@graph-ts/graph-lib';
import { Dict, PathDef } from '@graph-ts/graph-svg';

// The space inbetween node centers
const NODE_SPACING = 50;

export function buildGraph(
  numStates: number,
  loopBack: number
): { graph: Graph; edgePaths: Dict<PathDef> } {
  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];
  const edgePaths: Dict<PathDef> = {};

  const width = NODE_SPACING * (numStates - 1);
  const sx = -width / 2;

  for (let i = 0; i < numStates; ++i) {
    nodes.push({
      id: `${i}`,
      x: sx + i * NODE_SPACING,
      y: 5
    });
    if (i < numStates - 1) {
      edges.push({
        id: `${i}->${i + 1}`,
        source: `${i}`,
        target: `${i + 1}`
      });
    } else {
      const id = `${i}->${loopBack}`;
      const tx = sx + loopBack * NODE_SPACING;
      edges.push({
        id: id,
        source: `${i}`,
        target: `${loopBack}`
      });
      edgePaths[id] = {
        type: 'line',
        waypoints: [
          { x: sx + i * NODE_SPACING - 15, y: -15 },
          { x: tx + 15, y: -15 }
        ]
      };
    }
  }

  return {
    graph: newGraph(nodes, edges),
    edgePaths: edgePaths
  };
}
