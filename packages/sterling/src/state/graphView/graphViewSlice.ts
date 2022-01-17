import { buildAlloyDatumGraphs, buildProps } from '@/alloy-graph';
import {
  AlloyInstance,
  applyProjections,
  getInstanceType,
  getTypeAtoms
} from '@/alloy-instance';
import {
  DataJoinParsed,
  dataReceived,
  isDatumAlloy
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { Matrix } from 'transformation-matrix';
import { StateProject } from '../data/data';
import { stateProjectionAdded } from '../data/dataSlice';
import {
  GraphViewState,
  newDatumGraphs,
  newDatumMatrices,
  newGraphViewState
} from './graphView';

const initialState: GraphViewState = newGraphViewState();

const graphViewSlice = createSlice({
  name: 'graphView',
  initialState,
  reducers: {
    graphSpread(state, action: PayloadAction<{ id: string; matrix: Matrix }>) {
      const { id, matrix } = action.payload;
      state.matricesByDatumId[id].spreadMatrix = matrix;
    },
    graphZoomed(state, action: PayloadAction<{ id: string; matrix: Matrix }>) {
      const { id, matrix } = action.payload;
      state.matricesByDatumId[id].zoomMatrix = matrix;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter } = action.payload;
        if (enter) {
          enter.forEach((enter) => {
            if (isDatumAlloy(enter)) {
              const id = enter.id;
              const trace = enter.parsed;
              const graphs = buildAlloyDatumGraphs(trace);
              const props = graphs.map((graph, index) => {
                return buildProps(`${index}`, graph);
              });
              state.graphsByDatumId[id] = castDraft(newDatumGraphs(id, props));
              state.matricesByDatumId[id] = newDatumMatrices(id);
            }
          });
        }
      }
    );

    builder.addCase(
      stateProjectionAdded,
      (
        state,
        action: PayloadAction<{
          datumId: string;
          instance: AlloyInstance;
          type: string;
          atom: string;
        }>
      ) => {
        const { datumId, instance, type } = action.payload;
        const atoms = getTypeAtoms(getInstanceType(instance, type));
        console.log(atoms);

        const projectedInstances = atoms.map((atom) =>
          applyProjections(instance, [atom.id])
        );

        const graphs = buildAlloyDatumGraphs({ instances: projectedInstances });

        atoms.forEach((atom, index) => {
          const graph = graphs[index];
          const graphId = atom.id;
          console.log(datumId, graphId, graph);
          const graphProps = buildProps(graphId, graph);
          state.graphsByDatumId[datumId].graphsById[graphId] =
            castDraft(graphProps);
        });
        // state.graphsByDatumId[datumId].projectionGraphIds[type] = atoms.map(
        //   (atom) => {
        //     const projected = applyProjections(instance, [atom.id]);
        //     const graph = buildAlloyDatumGraphs({ instances})
        //   }
        // )
      }
    );

    // builder.addCase(
    //   stateProjectionAdded,
    //   (
    //     state,
    //     action: PayloadAction<{
    //       datumId: string;
    //       projection: StateProject;
    //       instance: AlloyInstance;
    //     }>
    //   ) => {
    //     const { datumId, projection, instance } = action.payload;
    //
    //     // get all atoms in signature
    //     const type = getInstanceType(instance, projection.type);
    //     const atoms = getTypeAtoms(type);
    //
    //     // loop over each atom, project over that atom, generate graph, add graph to state
    //     state.graphsByDatumId[datumId].projectionGraphIds[type.id] = atoms.map(
    //       (atom) => {
    //         const projected = applyProjections(instance, [atom.id]);
    //         const graph = buildAlloyDatumGraphs({ instances: [projected] })[0];
    //         const graphId = `${atom.id}`;
    //         const graphProps = buildProps(graphId, graph);
    //         state.graphsByDatumId[datumId].graphsById[graphId] =
    //           castDraft(graphProps);
    //         return graphId;
    //       }
    //     );
    //   }
    // );
  }
});

export const { graphSpread, graphZoomed } = graphViewSlice.actions;
export default graphViewSlice.reducer;
