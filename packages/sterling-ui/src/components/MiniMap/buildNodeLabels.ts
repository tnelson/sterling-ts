import { getNodes, Graph } from '@graph-ts/graph-lib';
import { Dict, LabelDef } from '@graph-ts/graph-svg';
import { nodeLabel, selectedNodeLabel } from './styles';

export function buildNodeLabels(
  graph: Graph,
  selectedIndices: number[]
): Dict<LabelDef[]> {
  const nodeLabels: Dict<LabelDef[]> = {};
  getNodes(graph).forEach((node) => {
    nodeLabels[node.id] = selectedIndices.includes(+node.id)
      ? [{ text: node.id, ...selectedNodeLabel }]
      : [{ text: node.id, ...nodeLabel }];
  });
  return nodeLabels;
}
