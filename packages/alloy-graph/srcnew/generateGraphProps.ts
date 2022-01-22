import { AlloyInstance, getAtomType } from '@/alloy-instance';
import { getEdges, getNodes, PositionedGraph } from '@/graph-lib';
import {
  CurveDef,
  EdgeLabelDef,
  GraphProps,
  NodeLabelDef,
  ShapeDef
} from '@/graph-svg';
import { EdgeStyleSpec, NodeStyleSpec, SterlingTheme } from '@/sterling-theme';
import { assign } from 'lodash';
import { CSSProperties } from 'react';
import { getInstanceEdgeStyleSpecs } from './getInstanceEdgeStyleSpecs';
import { getInstanceNodeStyleSpecs } from './getInstanceNodeStyleSpecs';
import { AlloyGraph } from './types';

export function generateGraphProps(
  id: string,
  instance: AlloyInstance,
  graph: AlloyGraph & PositionedGraph,
  theme: SterlingTheme
): GraphProps {
  // Create our props objects
  const nodeShapes: Record<string, ShapeDef> = {};
  const nodeStyles: Record<string, CSSProperties> = {};
  const nodeLabels: Record<string, NodeLabelDef[]> = {};
  const edgeCurves: Record<string, CurveDef> = {};
  const edgeStyles: Record<string, CSSProperties> = {};
  const edgeLabels: Record<string, EdgeLabelDef[]> = {};

  // For each type and for wildcard, get an ordered array of node style specs
  const nodeSpecs: Record<string, NodeStyleSpec[]> = getInstanceNodeStyleSpecs(
    instance,
    theme
  );

  // For each relation and for wildcard, get an ordered array of edge styles specs
  const edgeSpecs: Record<string, EdgeStyleSpec[]> = getInstanceEdgeStyleSpecs(
    instance,
    theme
  );

  // Generate node labels and styles
  getNodes(graph).forEach((node) => {
    nodeLabels[node.id] = [
      {
        text: node.atom.id,
        props: {},
        style: {}
      }
    ];
    nodeStyles[node.id] = {};
  });

  // Generate edge labels and styles
  getEdges(graph).forEach((edge) => {
    edgeLabels[edge.id] = [
      {
        text: edge.relation.name,
        props: {},
        style: {}
      }
    ];
    edgeStyles[edge.id] = {};
  });

  // Build props for each node
  getNodes(graph).forEach((node) => {
    const { id, atom } = node;
    const type = getAtomType(instance, atom);
    const typeHierarchy = ['*', 'univ', ...type.types.slice().reverse()];
    typeHierarchy.forEach((type) => {
      nodeSpecs[type]?.forEach((spec) => {
        // set the shape if one is specified
        if (spec.shape) {
          nodeShapes[id] = spec.shape;
        }

        // apply node shape styles if any are specified
        assign(nodeStyles[id], spec.styles?.node);

        // apply node label props and styles if any are specified
        nodeLabels[id].forEach((label) => {
          assign(label.props, spec.props?.label);
          assign(label.style, spec.styles?.label);
        });
      });
    });
  });

  getEdges(graph).forEach((edge) => {
    const { id, relation, tuple } = edge;
    const relations = ['*', relation.id];
    relations.forEach((relation) => {
      edgeSpecs[relation]?.forEach((spec) => {
        // set the curve if one is specified
        if (spec.curve) {
          edgeCurves[id] = spec.curve;
        }

        // apply edge shape styles if any are specified
        assign(edgeStyles[id], spec.styles?.edge);

        // apply edge label props and styles if any are specified
        edgeLabels[id].forEach((label) => {
          assign(label.props, spec.props?.label);
          assign(label.style, spec.styles?.label);
        });
      });
    });
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
