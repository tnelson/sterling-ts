import {
  AlloyEdge,
  AlloyGraph,
  AlloyGraphPositioned,
  AlloyNode,
  generateGraph,
  generateGraphProps,
  GraphLayout,
  layoutGraph
} from '@/alloy-graph';
import {
  applyProjections,
  getInstanceAtoms,
  getInstanceType,
  getInstanceTypes,
  getProjectableTypes,
  getTypeAtoms,
  isDefined
} from '@/alloy-instance';
import { GraphProps } from '@/graph-svg';
import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { createSelector } from '@reduxjs/toolkit';
import { Matrix } from 'transformation-matrix';
import dataSelectors from './data/dataSelectors';
import { Expression } from './evaluator/evaluator';
import evaluatorSelectors from './evaluator/evaluatorSelectors';
import { generateGraphId, generateLayoutId, GraphData } from './graphs/graphs';
import { LogItem } from './log/log';
import logSelectors from './log/logSelectors';
import providerSelectors from './provider/providerSelectors';
import { SterlingState } from './store';
import graphsSelectors from './graphs/graphsSelectors';
import themeSelectors from './theme/themeSelectors';
import {
  GraphDrawerView,
  MainView,
  ScriptDrawerView,
  TableDrawerView
} from './ui/ui';
import uiSelectors from './ui/uiSelectors';

/**
 * Select the currently active datum.
 */
export function selectActiveDatum(
  state: SterlingState
): DatumParsed<any> | undefined {
  return dataSelectors.selectActiveDatum(state.data);
}

/**
 * Select the ordered array of expressions associated with the active datum.
 */
export function selectActiveDatumExpressions(
  state: SterlingState
): Expression[] {
  const activeDatumId = selectActiveDatumId(state);
  return activeDatumId ? selectDatumExpressions(state, activeDatumId) : [];
}

/**
 * Select the id of the currently active datum.
 */
export function selectActiveDatumId(state: SterlingState): string | null {
  return dataSelectors.selectActiveDatumId(state.data);
}

export const selectActiveGraphData = createSelector(
  [selectActiveDatum, selectActiveGraphLayout, selectActiveTheme],
  (datum, layout, theme) => {
    if (datum && layout && theme && isDatumAlloy(datum)) {
      const instance = datum.parsed.instances[0];
      const projections = theme.projections || [];
      const timeProjections = projections.filter((p) => p.time === true);
      // const regularProjections = projections.filter((p) => p.time !== true);

      const atoms = projections.map((p) => p.atom).filter(isDefined);
      const projected = applyProjections(instance, atoms);
      const graph = generateGraph(projected, theme);
      const graphPositioned = layoutGraph(graph, layout);
      const graphProps = generateGraphProps('', graphPositioned);

      if (timeProjections.length) {
        return timeProjections.map(() => graphProps);
      } else {
        return [graphProps];
      }
    }
    return [];
  }
);

// export const selectActiveGraphData = createSelector(
//   [selectActiveGraphsPositioned],
//   (graphs) => {
//     return graphs.map((graph) => {
//       return {
//         props: generateGraphProps('', graph) };
//     });
//   }
// );
// export const selectActiveGraphData = createSelector(
//   [selectActiveDatum, selectActiveTheme],
//   (datum, theme) => {
//     if (datum && theme) {
//       // here we would select the array of time signatures (if not a trace)
//       const graphId = generateGraphId(0, theme.projections || []);
//       const graphProps = graphsSelectors.selectGraphProps(state.g);
//     }
//     return [];
//     // if (datum && graphLayout && theme && isDatumAlloy(datum)) {
//     //   const alloyDatum = datum.parsed;
//     //   const instance = alloyDatum.instances[0];
//     //   const alloyGraph = generateGraph(instance, theme);
//     //   const positionedGraph = layoutGraph(alloyGraph, graphLayout);
//     //   const props = generateGraphProps('', positionedGraph);
//     //   return [
//     //     {
//     //       datum: datum,
//     //       graphProps: props
//     //     }
//     //   ];
//     // }
//     // return [];
//   }
// );
// export function selectActiveGraphData(state: SterlingState): GraphData[] {
//   const activeDatum = selectActiveDatum(state);
//   const activeLayout = selectActiveGraphLayout(state);
//   if (activeDatum && activeLayout && isDatumAlloy(activeDatum)) {
//     const alloyDatum = activeDatum.parsed;
//
//     // // get the projected types
//     // const projectedTypes = selectProjectedTypes(state, activeDatum.id);
//     // const projectedAtoms = selectProjectedAtoms(state, activeDatum.id);
//     //
//     // // get any projected time types
//     // const projectedTimes = projectedTypes.filter(
//     //   (projection) => projection.time === true
//     // );
//
//     // For now, only deal with first instance
//     const instance = alloyDatum.instances[0];
//     const theme = selectTheme(state, activeDatum.id);
//     const alloyGraph = generateGraph(instance, theme);
//     const positionedGraph = layoutGraph(alloyGraph, activeLayout);
//     const props = generateGraphProps('', positionedGraph);
//     return [
//       {
//         datum: activeDatum,
//         graphProps: props
//       }
//     ];
//   }
//   return [];
// }

/**
 * Select the graph layout being used by the currently active datum.
 */
export function selectActiveGraphLayout(
  state: SterlingState
): GraphLayout | undefined {
  const activeDatumId = selectActiveDatumId(state);
  if (activeDatumId) {
    const projections = selectProjections(state, activeDatumId);
    const layoutId = generateLayoutId(projections);
    return graphsSelectors.selectGraphLayout(
      state.graphs,
      activeDatumId,
      layoutId
    );
  }
  return undefined;
}

/**
 * Select the theme associated with the currently active datum.
 */
export function selectActiveTheme(
  state: SterlingState
): SterlingTheme | undefined {
  const activeDatumId = selectActiveDatumId(state);
  return activeDatumId ? selectTheme(state, activeDatumId) : undefined;
}

/**
 * Select an ordered array of all datum objects.
 */
export function selectData(state: SterlingState): DatumParsed<any>[] {
  return dataSelectors.selectData(state.data);
}

/**
 * Select a datum by its datum id.
 */
export function selectDatumById(
  state: SterlingState,
  datumId: string
): DatumParsed<any> | undefined {
  return dataSelectors.selectDatumById(state.data, datumId);
}

/**
 * Select the ordered array of expressions associated with a datum.
 */
export function selectDatumExpressions(
  state: SterlingState,
  datumId: string
): Expression[] {
  return evaluatorSelectors.selectDatumExpressions(state.evaluator, datumId);
}

/**
 * Select an ordered array of all datum ids.
 */
export function selectDatumIds(state: SterlingState): string[] {
  return dataSelectors.selectDatumIds(state.data);
}

/**
 * Select the open/closed state of the drawer.
 */
export function selectDrawerIsCollapsed(state: SterlingState) {
  return uiSelectors.selectDrawerIsCollapsed(state.ui);
}

/**
 * Select the drawer view.
 */
export function selectDrawerView(
  state: SterlingState
): GraphDrawerView | TableDrawerView | ScriptDrawerView | null {
  return uiSelectors.selectDrawerView(state.ui);
}

/**
 * Select a boolean indicating if the currently active datum can use the evaluator.
 */
export function selectEvaluatorActive(state: SterlingState): boolean {
  const activeDatum = selectActiveDatum(state);
  return activeDatum !== undefined && activeDatum.evaluator === true;
}

/**
 * Select the graph drawer view.
 */
export function selectGraphDrawer(
  state: SterlingState
): GraphDrawerView | null {
  return uiSelectors.selectGraphDrawer(state.ui);
}

/**
 * Select the connection status.
 */
export function selectIsConnected(state: SterlingState): boolean {
  return providerSelectors.selectIsConnected(state.provider);
}

/**
 * Select all log items.
 */
export function selectLogItems(state: SterlingState): LogItem[] {
  return logSelectors.selectLogItems(state.log);
}

/**
 * Select the main view.
 */
export function selectMainView(state: SterlingState): MainView {
  return uiSelectors.selectMainView(state.ui);
}

/**
 * Select the next expression id.
 */
export function selectNextExpressionId(state: SterlingState): number {
  return evaluatorSelectors.selectNextExpressionId(state.evaluator);
}

/**
 * Select the available projectable types and their atoms.
 * @param state
 * @param datumId
 */
export function selectProjectableTypes(
  state: SterlingState,
  datumId: string
): Record<string, string[]> {
  const datum = selectDatumById(state, datumId);
  const projections = selectProjections(state, datumId);
  if (datum && isDatumAlloy(datum)) {
    const alloyDatum = datum.parsed;
    const instance = alloyDatum.instances[0];
    const projectables: Record<string, string[]> = {};

    // get an array of types that are allowed to be projected, remove the ones
    // that are already projected over, and add the rest to the available
    // projectables
    getProjectableTypes(instance)
      .filter(
        (type) => !projections.some((projection) => projection.type === type)
      )
      .forEach((type) => {
        projectables[type] = getTypeAtoms(getInstanceType(instance, type)).map(
          (atom) => atom.id
        );
      });

    return projectables;
  }
  return {};
}

/**
 * Select projections associated with a datum.
 */
export function selectProjections(
  state: SterlingState,
  datumId: string
): Projection[] {
  return themeSelectors.selectProjections(state.theme, datumId);
}

/**
 * Select the name of the provider.
 */
export function selectProviderName(state: SterlingState): string {
  return providerSelectors.selectProviderName(state.provider);
}

/**
 * Select the script drawer view.
 */
export function selectScriptDrawer(
  state: SterlingState
): ScriptDrawerView | null {
  return uiSelectors.selectScriptDrawer(state.ui);
}

/**
 * Select the spread matrix associated with a datum.
 */
export function selectSpreadMatrix(
  state: SterlingState,
  datumId: string
): Matrix | undefined {
  return graphsSelectors.selectSpreadMatrix(state.graphs, datumId);
}

/**
 * Select the table drawer view.
 */
export function selectTableDrawer(
  state: SterlingState
): TableDrawerView | null {
  return uiSelectors.selectTableDrawer(state.ui);
}

/**
 * Select the theme associated with a datum id.
 */
export function selectTheme(
  state: SterlingState,
  datumId: string
): SterlingTheme | undefined {
  return themeSelectors.selectTheme(state.theme, datumId);
}

/**
 * Select the zoom matrix associated with a datum.
 */
export function selectZoomMatrix(
  state: SterlingState,
  datumId: string
): Matrix | undefined {
  return graphsSelectors.selectZoomMatrix(state.graphs, datumId);
}
