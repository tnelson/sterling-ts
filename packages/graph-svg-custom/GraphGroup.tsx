import {
  getEdges,
  getNode,
  getNodes,
  PositionedNode,
  RoutedEdge
} from '@/graph-lib';
import { SVGProps } from 'react';
import { extractArrowHeads } from './components/ArrowHead/extractArrowHeads';
import { Defs } from './components/Defs/Defs';
import { EdgesGroup } from './components/EdgesGroup/EdgesGroup';
import { NodesGroup } from './components/NodesGroup/NodesGroup';
import { GraphGroupProps } from './GraphGroupProps';
import { buildPath } from './paths/buildPath';
import { InteractionProvider } from './providers/InteractionProvider';
import { ArrowDef, EdgeDef, NodeDef } from './types';
import { isDefined } from './util';

const GraphGroup = <N extends PositionedNode, E extends RoutedEdge>(
  props: GraphGroupProps<N, E> & SVGProps<SVGGElement>
) => {
  const {
    id,
    graph,
    edgeCurves,
    edgeStyles,
    edgeLabels,
    nodeShapes,
    nodeStyles,
    nodeLabels,
    targetSpread,
    ...rest
  } = props;

  const nodes: NodeDef[] = getNodes(graph).map((node) => {
    const position = { x: node.x, y: node.y };
    const shape = nodeShapes[node.id];
    const style = nodeStyles[node.id];
    const labels = nodeLabels ? nodeLabels[node.id] : undefined;
    return {
      id: node.id,
      position,
      shape,
      style,
      labels
    };
  });

  const edges: EdgeDef[] = getEdges(graph)
    .map((edge) => {
      const source = getNode(graph, edge.source);
      const target = getNode(graph, edge.target);
      if (!source || !target) return undefined;
      const sourceShape = nodeShapes[source.id];
      const targetShape = nodeShapes[target.id];
      const path = buildPath(edge, source, sourceShape, target, targetShape);
      const curve = edgeCurves[edge.id];
      const style = edgeStyles[edge.id];
      const labels = edgeLabels ? edgeLabels[edge.id] : undefined;
      return {
        id: edge.id,
        path,
        curve,
        style,
        labels
      };
    })
    .filter(isDefined);

  const arrows: ArrowDef[] = extractArrowHeads(Object.values(edgeStyles));

  return (
    <InteractionProvider spread={targetSpread}>
      <g id={id} {...rest}>
        <Defs arrowHeads={arrows} />
        <NodesGroup nodes={nodes} />
        <EdgesGroup edges={edges} />
      </g>
    </InteractionProvider>
  );
};

export { GraphGroup };
