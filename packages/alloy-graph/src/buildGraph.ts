import {
  AlloyAtom,
  AlloyInstance,
  applyProjections,
  atomIsOfType,
  getAtomType,
  getInstanceAtom,
  getInstanceAtoms,
  getInstanceRelations,
  getInstanceType,
  getRelationTuples,
  getTypeAtoms,
  isBuiltin
} from '@/alloy-instance';
import {
  getHiddenTypes,
  getProjectedTypes,
  SterlingTheme
} from '@/sterling-theme';
import { newGraph, Node } from '@/graph-lib';
import {
  getVisibleGraphComponents,
  GraphComponents
} from './getVisibleGraphComponents';
import { layoutNodes } from './layoutNodes';
import { projectInstance } from './projectInstances';
import { AlloyEdge, AlloyGraph, AlloyNode } from './types';
import dagre from 'dagre';

export function buildGraph(
  instance: AlloyInstance,
  theme?: SterlingTheme
): AlloyGraph {
  // Apply projections
  instance = projectInstance(instance, theme);

  // Get the graph components and position the nodes
  const graphComponents = getVisibleGraphComponents(instance, theme);
  const nodes = layoutNodes(graphComponents);
  const edges = graphComponents.edges;

  return newGraph(nodes, edges);
}
