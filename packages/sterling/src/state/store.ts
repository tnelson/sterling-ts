import { getInstanceType, getTypeAtoms, isAlloyDatum } from '@/alloy-instance';
import { GraphProps } from '@/graph-svg';
import {
  DatumParsed,
  sterlingConnectionMiddleware
} from '@/sterling-connection';
import { configureStore } from '@reduxjs/toolkit';
import { isEmpty, keys } from 'lodash';
import { sterlingMiddleware } from '../middleware/sterlingMiddleware';
import dataSelectors from './data/dataSelectors';
import dataSlice from './data/dataSlice';
import evaluatorSelectors from './evaluator/evaluatorSelectors';
import evaluatorSlice from './evaluator/evaluatorSlice';
import graphViewSelectors from './graphView/graphViewSelectors';
import graphViewSlice from './graphView/graphViewSlice';
import logSelectors from './log/logSelectors';
import logSlice from './log/logSlice';
import providerSelectors from './provider/providerSelectors';
import providerSlice from './provider/providerSlice';
import uiSelectors from './ui/uiSelectors';
import uiSlice from './ui/uiSlice';
import { GraphMatrices } from './graphView/graphView';

const store = configureStore({
  reducer: {
    data: dataSlice,
    evaluator: evaluatorSlice,
    graphView: graphViewSlice,
    log: logSlice,
    provider: providerSlice,
    ui: uiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      sterlingConnectionMiddleware(),
      sterlingMiddleware()
    )
});

export type SterlingState = ReturnType<typeof store.getState>;
export type SterlingDispatch = typeof store.dispatch;
export default store;

// ---------- data slice selectors ---------- //

export const selectData = (state: SterlingState) =>
  dataSelectors.selectData(state.data);
export const selectActiveDatum = (state: SterlingState) =>
  dataSelectors.selectActiveDatum(state.data);
export const selectActiveDatumProjections = (state: SterlingState) =>
  dataSelectors.selectActiveDatumProjections(state.data);
export const selectActiveDatumStateProjections = (state: SterlingState) => {
  const activeDatum = selectActiveDatum(state);
  return activeDatum
    ? dataSelectors.selectStateProjections(state.data, activeDatum.id)
    : {};
};

// ---------- evaluator slice selectors ---------- //

export const selectActiveDatumExpressions = (state: SterlingState) => {
  const activeDatum = selectActiveDatum(state);
  return activeDatum
    ? evaluatorSelectors.selectDatumExpressions(state.evaluator, activeDatum.id)
    : [];
};
export const selectEvaluatorActive = (state: SterlingState) => {
  const activeDatum = selectActiveDatum(state);
  return activeDatum
    ? activeDatum.evaluator &&
        evaluatorSelectors.selectEvaluatorActive(state.evaluator)
    : false;
};
export const selectNextExpressionId = (state: SterlingState) =>
  evaluatorSelectors.selectNextExpressionId(state.evaluator);

// ---------- graph view slice selectors ---------- //

export interface ActiveGraphData {
  datumId: string;
  datum: DatumParsed<any>;
  graphProps: GraphProps;
  graphMatrices: GraphMatrices;
}

export const selectActiveGraphData = (
  state: SterlingState
): ActiveGraphData[] => {
  const activeDatum = selectActiveDatum(state);
  if (!activeDatum) return [];

  const matrices = graphViewSelectors.selectDatumMatrices(
    state.graphView,
    activeDatum.id
  );

  const stateProjections = dataSelectors.selectStateProjections(
    state.data,
    activeDatum.id
  );

  if (!isEmpty(stateProjections)) {
    const types = keys(stateProjections);
    console.log(types);
    return types.map((type) => {
      const atom = stateProjections[type];
      return {
        datum: activeDatum,
        datumId: activeDatum.id,
        graphProps: graphViewSelectors.selectGraphById(
          state.graphView,
          activeDatum.id,
          atom
        ),
        graphMatrices: matrices
      };
    });
  }

  // if (projections && isAlloyDatum(parsed)) {
  //   const stateProjections = projections.stateProjections;
  //   return stateProjections.map((projection) => {
  //     const type = getInstanceType(parsed.instances[0], projection.type);
  //     return {
  //       datum: activeDatum,
  //       datumId: activeDatum.id,
  //       graphProps: graphViewSelectors.selectDatumProjectedGraphs(
  //         state.graphView,
  //         activeDatum.id,
  //         type.id
  //       )[0],
  //       graphMatrices: matrices
  //     };
  //   });
  // }

  // TODO: determine if we're projected, and choose correct graphs.
  // TODO: determine from data slice which index to return
  const graphs = graphViewSelectors.selectDatumGraphs(
    state.graphView,
    activeDatum.id
  );

  return [
    {
      datum: activeDatum,
      datumId: activeDatum.id,
      graphProps: graphs[0],
      graphMatrices: matrices
    }
  ];
  //
  // if (!activeData) return [];
  // return activeData.map((datum) => {
  //   const id = datum.id;
  //   return {
  //     datum,
  //     datumId: id,
  //     graphProps: graphViewSelectors.selectDatumActiveGraph(
  //       state.graphView,
  //       id
  //     ),
  //     graphMatrices: graphViewSelectors.selectDatumMatrices(state.graphView, id)
  //   };
  // });
};

// ---------- log slice selectors ---------- //

export const selectLogItems = (state: SterlingState) =>
  logSelectors.selectLogItems(state.log);

// ---------- provider slice selectors ---------- //

/**
 * Determine if Sterling is connected to a provider.
 */
export const selectIsConnected = (state: SterlingState) =>
  providerSelectors.selectIsConnected(state.provider);

/**
 * Get the name of the data provider.
 */
export const selectProviderName = (state: SterlingState) =>
  providerSelectors.selectProviderName(state.provider);

// ---------- ui slice selectors ---------- //

/**
 * Get the currently active main view.
 */
export const selectMainView = (state: SterlingState) =>
  uiSelectors.selectMainView(state.ui);

/**
 * Select the currently open common drawer view. Returns null if a common drawer
 * view is not currently open.
 */
export const selectCommonDrawer = (state: SterlingState) =>
  uiSelectors.selectCommonDrawer(state.ui);

/**
 * Get a string indicating if the drawer is open or closed.
 */
export const selectDrawerIsCollapsed = (state: SterlingState) =>
  uiSelectors.selectDrawerIsCollapsed(state.ui);

/**
 * Get the drawer that's open for the graph view.
 */
export const selectGraphDrawer = (state: SterlingState) =>
  uiSelectors.selectGraphDrawer(state.ui);

/**
 * Get the drawer that's open for the table view.
 */
export const selectTableDrawer = (state: SterlingState) =>
  uiSelectors.selectTableDrawer(state.ui);

/**
 * Get the drawer that's open for the script view.
 */
export const selectScriptDrawer = (state: SterlingState) =>
  uiSelectors.selectScriptDrawer(state.ui);

// ---------- combination selectors ---------- //
//
// export const selectSelectedGraphs = createSelector(
//   [selectSelectedInstances, selectGraphs],
//   (indices, graphs) => {
//     const selectedGraphs: Graph[] = [];
//     indices.forEach((index) => selectedGraphs.push(graphs[index]));
//     return selectedGraphs;
//   }
// );
//
// export const selectSelectedGraphPaths = createSelector(
//   [selectSelectedInstances, selectPaths],
//   (indices, paths) => {
//     const selectedPaths: Dict<PathDef>[] = [];
//     indices.forEach((index) => selectedPaths.push(paths[index]));
//     return selectedPaths;
//   }
// );
//
// export const selectSelectedGraphStyles = createSelector(
//   [selectSelectedInstances, selectStyles],
//   (indices, styles) => {
//     const selectedStyles: StyleSet[] = [];
//     indices.forEach((index) => selectedStyles.push(styles[index]));
//     return selectedStyles;
//   }
// );
