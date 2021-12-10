import { GraphSVGDiv } from '@graph-ts/graph-svg';
import { useMemo } from 'react';
import { buildGraph } from './buildGraph';
import { buildNodeLabels } from './buildNodeLabels';
import { edgeStyle, nodeShape, nodeStyle, selectedNodeStyle } from './styles';

export interface MiniMapProps {
  numStates: number;
  loopBack: number;
  selectedIndices: number[];
  onSelectedIndicesDidChange?: (indices: number[]) => void;
}

const MiniMap = (props: MiniMapProps) => {
  const { numStates, loopBack, selectedIndices, onSelectedIndicesDidChange } =
    props;

  const { graph, edgePaths } = useMemo(
    () => buildGraph(numStates, loopBack),
    [numStates, loopBack]
  );

  const nodeLabels = useMemo(
    () => buildNodeLabels(graph, selectedIndices),
    [graph, selectedIndices]
  );

  return (
    <GraphSVGDiv
      // @ts-ignore
      graph={graph}
      nodeLabels={nodeLabels}
      defaultEdgeStyle={edgeStyle}
      defaultEdgeStyleHovered={{}}
      defaultNodeStyle={nodeStyle}
      defaultNodeStyleSelected={selectedNodeStyle}
      defaultShape={nodeShape}
      edgePaths={edgePaths}
      onSelectionDidUpdate={(nodeIds) => {
        if (onSelectedIndicesDidChange) {
          onSelectedIndicesDidChange(nodeIds.map((nodeId) => +nodeId));
        }
      }}
      interactions={true}
    />
  );
};

export { MiniMap };
