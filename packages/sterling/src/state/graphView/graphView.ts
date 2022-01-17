import { GraphProps } from '@/graph-svg';
import { keyBy } from 'lodash';
import { identity, Matrix } from 'transformation-matrix';

// export interface DatumGraphsOld {
//   // the datum id
//   id: string;
//   // the active graph id
//   active: string;
//   // the graphs associated with the datum, by graph id
//   graphs: Record<string, GraphProps>;
//   // an ordered list of the graph ids
//   graphIds: string[];
// }

export interface DatumGraphs {
  // the datum id
  id: string;
  // the unprojected datum graph ids
  graphIds: string[];
  // the graphs associated with the datum, by graph id
  graphsById: Record<string, GraphProps>;
  // projection graph ids, keyed by type
  projectionGraphIds: Record<string, string[]>;
}

export interface GraphMatrices {
  // the datum id
  id: string;
  // the spread matrix
  spreadMatrix: Matrix;
  // the zoom matrix
  zoomMatrix: Matrix;
}

export interface GraphViewState {
  graphsByDatumId: Record<string, DatumGraphs>;
  matricesByDatumId: Record<string, GraphMatrices>;
}

export const newGraphViewState = (): GraphViewState => {
  return {
    graphsByDatumId: {},
    matricesByDatumId: {}
  };
};

export function newDatumGraphs(
  datumId: string,
  graphs: GraphProps[]
): DatumGraphs {
  return {
    id: datumId,
    graphIds: [graphs[0].id],
    graphsById: keyBy(graphs, (graph) => graph.id),
    projectionGraphIds: {}
    // graphIds: graphs.map((graph) => graph.id)
  };
}

export function newDatumMatrices(datumId: string): GraphMatrices {
  return {
    id: datumId,
    spreadMatrix: identity(),
    zoomMatrix: identity()
  };
}
