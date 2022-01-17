import {
  generateGraph,
  generateGraphProps,
  generateLayout,
  layoutGraph
} from '@/alloy-graph';
import { applyProjections } from '@/alloy-instance';
import {
  DataJoinParsed,
  DatumParsed,
  isDatumAlloy
} from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { WritableDraft } from 'immer/dist/types/types-external';
import { isUndefined } from 'lodash';
import { identity } from 'transformation-matrix';
import { DEFAULT_THEME } from '../theme/themeDefaults';
import { generateGraphId, generateLayoutId, GraphsState } from './graphs';
import { DEFAULT_LAYOUT_SETTINGS } from './graphsDefaults';

type DraftState = WritableDraft<GraphsState>;

function dataReceived(
  state: DraftState,
  action: PayloadAction<DataJoinParsed>
) {
  const { enter } = action.payload;

  if (enter) {
    // Extract Alloy data, since that's all we know how to use right now
    const alloyData = enter.filter(isDatumAlloy);

    // For each one, generate matrices and layouts
    alloyData.forEach((alloyDatum) => {
      const datumId = alloyDatum.id;

      // Generate matrices
      state.matricesByDatumId[alloyDatum.id] = {
        datumId,
        spreadMatrix: identity(),
        zoomMatrix: identity()
      };

      // Generate the layout associated with no projection
      const layoutId = generateLayoutId([]);
      const instances = alloyDatum.parsed.instances;
      const graphs = instances.map((instance) =>
        generateGraph(instance, DEFAULT_THEME)
      );
      const layout = generateLayout(graphs, DEFAULT_LAYOUT_SETTINGS);
      state.layoutsByDatumId[datumId] = {
        datumId,
        layoutById: {
          [layoutId]: layout
        }
      };

      // Generate the graph associated with the first instance
      const graphId = generateGraphId(0, []);
      const instance = instances[0];
      const alloyGraph = generateGraph(instance, DEFAULT_THEME);
      const positionedGraph = layoutGraph(alloyGraph, layout);
      const props = generateGraphProps(graphId, positionedGraph);
      state.graphsByDatumId[datumId] = {
        datumId,
        graphsById: {
          [graphId]: castDraft(props)
        }
      };
    });
  }
}

function themeChanged(
  state: DraftState,
  action: PayloadAction<{
    datum: DatumParsed<any>;
    theme: Partial<SterlingTheme>;
  }>
) {
  const { datum, theme } = action.payload;
  const datumId = datum.id;
  const projections = theme.projections || [];

  if (isDatumAlloy(datum)) {
    const layoutId = generateLayoutId(projections);
    const graphId = generateGraphId(0, projections);
    let layout = state.layoutsByDatumId[datumId].layoutById[layoutId];

    // get all instances and apply projections
    const instances = datum.parsed.instances;
    const projectedAtoms = projections
      .map((projection) => projection.atom)
      .filter(
        (projectedAtom): projectedAtom is string => !isUndefined(projectedAtom)
      );
    const projected = instances.map((instance) =>
      applyProjections(instance, projectedAtoms)
    );

    // generate the layout if it doesn't already exist
    if (!layout) {
      const graphs = projected.map((instance) =>
        generateGraph(instance, theme)
      );
      layout = generateLayout(graphs, DEFAULT_LAYOUT_SETTINGS);
      state.layoutsByDatumId[datumId].layoutById[layoutId] = layout;
    }

    // generate the graph if it doesn't already exist
    if (!state.graphsByDatumId[datumId].graphsById[graphId]) {
      const instance = projected[0];
      const alloyGraph = generateGraph(instance, DEFAULT_THEME);
      const positionedGraph = layoutGraph(alloyGraph, layout);
      const props = generateGraphProps(graphId, positionedGraph);
      state.graphsByDatumId[datumId].graphsById[graphId] = castDraft(props);
    }
  }
}

export default {
  dataReceived,
  themeChanged
};
