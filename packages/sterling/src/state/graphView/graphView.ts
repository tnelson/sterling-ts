import { GraphProps } from '@/graph-svg';
import { keyBy } from 'lodash';

export interface DatumGraphs {
  // the datum id
  id: string;
  // the active graph id
  active: string;
  // the graphs associated with the datum, by graph id
  graphs: Record<string, GraphProps>;
  // an ordered list of the graph ids
  graphIds: string[];
}

export interface GraphViewState {
  byDatumId: Record<string, DatumGraphs>;
}

export const newGraphViewState = (): GraphViewState => {
  return {
    byDatumId: {}
  };
};

export function newDatumGraphs(
  datumId: string,
  graphs: GraphProps[]
): DatumGraphs {
  return {
    id: datumId,
    active: graphs[0].id,
    graphs: keyBy(graphs, (graph) => graph.id),
    graphIds: graphs.map((graph) => graph.id)
  };
}
