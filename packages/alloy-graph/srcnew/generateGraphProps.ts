import { getEdges, getNodes, Graph, PositionedGraph } from '@/graph-lib';
import {
  CurveDef,
  EdgeLabelDef,
  GraphProps,
  NodeLabelDef,
  ShapeDef
} from '@/graph-svg';
import { SterlingTheme } from '@/sterling-theme';
import { CSSProperties } from 'react';
import { AlloyGraph, GraphLayout } from './types';

/**
 * Generate a GraphProps object, which contains all data required to render a
 * graph, for a graph.
 *
 * @param id
 * @param graph An Alloy instance
 */
export function generateGraphProps(
  id: string,
  graph: AlloyGraph & PositionedGraph
): GraphProps {
  const nodeShapes: Record<string, ShapeDef> = {};
  const nodeStyles: Record<string, CSSProperties> = {};
  const nodeLabels: Record<string, NodeLabelDef[]> = {};
  const edgeCurves: Record<string, CurveDef> = {};
  const edgeStyles: Record<string, CSSProperties> = {};
  const edgeLabels: Record<string, EdgeLabelDef[]> = {};
  getNodes(graph).forEach((node) => {
    nodeShapes[node.id] = {
      shape: 'rectangle',
      width: 100,
      height: 60
    };
    nodeStyles[node.id] = {
      stroke: 'none',
      fill: 'steelblue'
    };
    nodeLabels[node.id] = [
      {
        text: node.atom.id,
        style: {
          fill: 'white',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          textAnchor: 'middle'
        },
        props: {
          dy: '0.33em'
        }
      }
    ];
  });
  getEdges(graph).forEach((edge) => {
    edgeCurves[edge.id] = {
      type: 'bspline'
    };
    edgeStyles[edge.id] = {
      stroke: '#333',
      fill: 'none'
    };
    edgeLabels[edge.id] = [
      {
        text: edge.relation.name,
        style: {
          fill: '#333',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          textAnchor: 'middle'
        },
        props: {
          dy: '0.33em'
        }
      }
    ];
  });
  return {
    id,
    graph,
    nodeShapes,
    nodeStyles,
    nodeLabels,
    edgeCurves,
    edgeLabels,
    edgeStyles
  };
}
