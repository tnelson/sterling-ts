import { AlloyAtom, AlloyTuple } from '@/alloy-instance';
import { Edge, Graph, PositionedNode } from '@graph-ts/graph-lib';

export type AlloyNode = PositionedNode<{ atom: AlloyAtom }>;
export type AlloyEdge = Edge<{ relation: string; tuple: AlloyTuple }>;
export type AlloyGraph = Graph<AlloyNode, AlloyEdge>;
