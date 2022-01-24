import {
  generateGraph,
  generateGraphProps,
  getInstanceEdgeStyleSpecs,
  getInstanceNodeStyleSpecs,
  GraphLayout,
  layoutGraph
} from '@/alloy-graph';
import {
  applyProjections,
  getInstanceAtomsOfType,
  getInstanceRelations,
  getInstanceType,
  getProjectableTypes,
  isAlloyDatumTrace,
  isDefined
} from '@/alloy-instance';
import { DatumParsed, isDatumAlloy } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { createSelector } from '@reduxjs/toolkit';
import { difference, get, keys, pick, set } from 'lodash';
import { Matrix } from 'transformation-matrix';
import dataSelectors from './data/dataSelectors';
import { Expression } from './evaluator/evaluator';
import evaluatorSelectors from './evaluator/evaluatorSelectors';
import { generateLayoutId, RelationStyle, TypeStyle } from './graphs/graphs';
import graphsSelectors from './graphs/graphsSelectors';
import { LogItem } from './log/log';
import logSelectors from './log/logSelectors';
import providerSelectors from './provider/providerSelectors';
import { ScriptStageType } from './script/script';
import scriptSelectors from './script/scriptSelectors';
import { SterlingState } from './store';
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

/**
 * Select the active graph data. The active graph data is an array of GraphProps
 * objects, which should be rendered side-by-side in the graph view.
 */
export const selectActiveGraphData = createSelector(
  [
    selectActiveDatum,
    selectActiveGraphLayout,
    selectActiveTheme,
    selectActiveTimeIndex
  ],
  (datum, layout, theme, time) => {
    if (datum && layout && theme && isDatumAlloy(datum)) {
      const instance = datum.parsed.instances[time];
      const projections = theme.projections || [];
      const timeProjections = projections.filter((p) => p.time === true);

      const atoms = projections.map((p) => p.atom).filter(isDefined);
      const projected = applyProjections(instance, atoms);
      const graph = generateGraph(projected, theme);
      const graphPositioned = layoutGraph(graph, layout);
      const graphProps = generateGraphProps(
        '',
        projected,
        graphPositioned,
        theme
      );

      if (timeProjections.length) {
        return timeProjections.map(() => graphProps);
      } else {
        return [graphProps];
      }
    } else {
      console.log(`datum: ${datum !== undefined}`);
      console.log(`layout: ${layout !== undefined}`);
      console.log(`theme: ${theme !== undefined}`);
      console.log(`time: ${time}`);
    }
    return [];
  }
);

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
 * Select the current time index associated with the currently active datum.
 */
export function selectActiveTimeIndex(state: SterlingState): number {
  const activeDatumId = selectActiveDatumId(state);
  return activeDatumId ? selectTimeIndex(state, activeDatumId) : 0;
}

/**
 * Select the available projectable types and their atoms.
 */
export function selectAvailableProjectableTypes(
  state: SterlingState,
  datumId: string
): Record<string, string[]> {
  const types = selectProjectableTypes(state, datumId);
  const projections = selectProjections(state, datumId);
  const projected = projections.map((p) => p.type);
  const available = difference(keys(types), projected);
  return pick(types, available);
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
 * Select whether a datum is stateful, meaning it consists of multiple states
 * that can each be viewed individually.
 */
export function selectDatumIsStateful(
  state: SterlingState,
  datum: DatumParsed<any>
): boolean {
  const datumId = datum.id;
  const projections = selectProjections(state, datumId) || [];

  return (
    selectDatumIsTrace(state, datum) || projections.some((p) => p.time === true)
  );
}

/**
 * Select whether a datum is a trace, meaning it is stateful by default and
 * does not require projections to become stateful.
 */
export function selectDatumIsTrace(
  state: SterlingState,
  datum: DatumParsed<any>
): boolean {
  return isDatumAlloy(datum) && isAlloyDatumTrace(datum.parsed);
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
 * Select whether a relation style is expanded in the graph drawer view associated
 * with a datum.
 */
export function selectGraphDrawerThemeRelationExpanded(
  state: SterlingState,
  datumId: string,
  relation: string
): boolean {
  return uiSelectors.selectGraphDrawerThemeRelationExpanded(
    state.ui,
    datumId,
    relation
  );
}

/**
 * Select whether a type style is expanded in the graph drawer view associated
 * with a datum.
 */
export function selectGraphDrawerThemeTypeExpanded(
  state: SterlingState,
  datumId: string,
  type: string
): boolean {
  return uiSelectors.selectGraphDrawerThemeTypeExpanded(
    state.ui,
    datumId,
    type
  );
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
 * Select the loopback index associated with a datum.
 */
export function selectLoopbackIndex(
  state: SterlingState,
  datumId: string
): number | undefined {
  const datum = selectDatumById(state, datumId);
  if (datum && isDatumAlloy(datum) && isAlloyDatumTrace(datum.parsed)) {
    return datum.parsed.loopBack;
  }
  return undefined;
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
 * Select all projectable types and their atoms.
 */
export function selectProjectableTypes(
  state: SterlingState,
  datumId: string
): Record<string, string[]> {
  const datum = selectDatumById(state, datumId);
  const projectableTypes: Record<string, string[]> = {};
  if (datum && isDatumAlloy(datum)) {
    const instance = datum.parsed.instances[0];
    getProjectableTypes(instance).forEach((typeId) => {
      const type = getInstanceType(instance, typeId);
      projectableTypes[typeId] = getInstanceAtomsOfType(instance, type).map(
        (a) => a.id
      );
    });
  }
  return projectableTypes;
}

/**
 * Select projections associated with a datum.
 */
export function selectProjections(
  state: SterlingState,
  datumId: string
): Projection[] {
  return graphsSelectors.selectProjections(state.graphs, datumId);
}

/**
 * Select the name of the provider.
 */
export function selectProviderName(state: SterlingState): string {
  return providerSelectors.selectProviderName(state.provider);
}

/**
 * Select all relations from a datum.
 */
export function selectRelations(
  state: SterlingState,
  datumId: string
): string[] {
  const datum = selectDatumById(state, datumId);
  if (datum && isDatumAlloy(datum)) {
    const instance = datum.parsed.instances[0];
    const relations = getInstanceRelations(instance);
    return relations.map((relation) => relation.name);
  }
  return [];
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
 * Select the current stage type.
 */
export function selectScriptStage(state: SterlingState): ScriptStageType {
  return scriptSelectors.selectScriptStage(state.script);
}

/**
 * Select the current script text.
 */
export function selectScriptText(state: SterlingState): string {
  return scriptSelectors.selectScriptText(state.script);
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
): SterlingTheme {
  return graphsSelectors.selectTheme(state.graphs, datumId);
}

/**
 * Select the time index associated with a datum.
 */
export function selectTimeIndex(state: SterlingState, datumId: string): number {
  return graphsSelectors.selectTimeIndex(state.graphs, datumId);
}

/**
 * Select the total length of the trace.
 * TODO: The naming (trace) is confusing, need to decide for consistency
 */
export function selectTraceLength(
  state: SterlingState,
  datumId: string
): number {
  const datum = selectDatumById(state, datumId);
  if (datum && isDatumAlloy(datum) && isAlloyDatumTrace(datum.parsed)) {
    return datum.parsed.instances.length;
  }
  return 1;
}

/**
 * Select the displayable styles associated with a datum's relation.
 */
export function selectRelationStyle(
  state: SterlingState,
  datum: DatumParsed<any>,
  relationId: string
): RelationStyle {
  if (isDatumAlloy(datum)) {
    const instance = datum.parsed.instances[0];
    const theme = selectTheme(state, datum.id);
    const specs = getInstanceEdgeStyleSpecs(instance, theme);

    const style: RelationStyle = {};
    const relations = ['*', relationId];

    relations.forEach((relation) => {
      specs[relation].forEach((spec) => {
        const asAttribute = get(spec, ['asAttribute']);
        const curve = get(spec, ['curve']);
        const stroke = get(spec, ['styles', 'edge', 'stroke']);
        const strokeWidth = get(spec, ['styles', 'edge', 'strokeWidth']);
        const fontSize = get(spec, ['styles', 'label', 'fontSize']);
        const textColor = get(spec, ['styles', 'label', 'fill']);

        set(style, ['asAttribute'], asAttribute === true);
        if (curve) {
          set(style, ['curve', 'value'], curve);
          set(style, ['curve', 'inherited'], relation !== relationId);
        }
        if (stroke) {
          set(style, ['stroke', 'value'], stroke);
          set(style, ['stroke', 'inherited'], relation !== relationId);
        }
        if (strokeWidth) {
          set(style, ['strokeWidth', 'value'], strokeWidth);
          set(style, ['strokeWidth', 'inherited'], relation !== relationId);
        }
        if (fontSize) {
          set(style, ['fontSize', 'value'], fontSize);
          set(style, ['fontSize', 'inherited'], relation !== relationId);
        }
        if (textColor) {
          set(style, ['textColor', 'value'], textColor);
          set(style, ['textColor', 'inherited'], relation !== relationId);
        }
      });
    });

    return style;
  }
  return {};
}

/**
 * Select the displayable styles associated with a datum's type.
 */
export function selectTypeStyle(
  state: SterlingState,
  datum: DatumParsed<any>,
  typeId: string
): TypeStyle {
  if (isDatumAlloy(datum)) {
    const instance = datum.parsed.instances[0];
    const theme = selectTheme(state, datum.id);
    const specs = getInstanceNodeStyleSpecs(instance, theme);

    const style: TypeStyle = {};
    const type = getInstanceType(instance, typeId);
    const hierarchy = ['*', 'univ', ...type.types.slice().reverse()];

    hierarchy.forEach((type) => {
      specs[type].forEach((spec) => {
        const shape = get(spec, ['shape']);
        const fill = get(spec, ['styles', 'node', 'fill']);
        const stroke = get(spec, ['styles', 'node', 'stroke']);
        const strokeWidth = get(spec, ['styles', 'node', 'strokeWidth']);
        const fontSize = get(spec, ['styles', 'label', 'fontSize']);
        const textColor = get(spec, ['styles', 'label', 'fill']);
        if (shape) {
          set(style, ['shape', 'value'], shape);
          set(style, ['shape', 'inherited'], type !== typeId);
        }
        if (fill) {
          set(style, ['fill', 'value'], fill);
          set(style, ['fill', 'inherited'], type !== typeId);
        }
        if (stroke) {
          set(style, ['stroke', 'value'], stroke);
          set(style, ['stroke', 'inherited'], type !== typeId);
        }
        if (strokeWidth) {
          set(style, ['strokeWidth', 'value'], strokeWidth);
          set(style, ['strokeWidth', 'inherited'], type !== typeId);
        }
        if (fontSize) {
          set(style, ['fontSize', 'value'], fontSize);
          set(style, ['fontSize', 'inherited'], type !== typeId);
        }
        if (textColor) {
          set(style, ['textColor', 'value'], textColor);
          set(style, ['textColor', 'inherited'], type !== typeId);
        }
      });
    });
    return style;
  }
  return {};
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
