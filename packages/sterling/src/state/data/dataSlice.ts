import {
  AlloyInstance,
  getInstanceType,
  getTypeAtoms,
  isAlloyDatum
} from '@/alloy-instance';
import { dataReceived } from '@/sterling-connection';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { DataJoinParsed } from '@/sterling-connection';
import { DataState, newDataState, StateProject } from './data';

const initialState: DataState = newDataState();

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    datumSelected(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
    dumpClicked(state) {
      console.log(current(state));
    },
    stateProjectionAdded(
      state,
      action: PayloadAction<{
        datumId: string;
        instance: AlloyInstance;
        type: string;
        atom: string;
      }>
    ) {
      const { datumId, type, atom } = action.payload;
      if (!state.projectionsById[datumId])
        state.projectionsById[datumId] = {
          projections: {},
          stateProjections: {}
        };
      state.projectionsById[datumId].stateProjections[type] = atom;
    },
    nextStateProjClicked(
      state,
      action: PayloadAction<{ datumId: string; type: string }>
    ) {
      const { datumId, type } = action.payload;
      const datum = state.datumById[datumId];
      const parsed = datum.parsed;
      const projs = state.projectionsById[datumId]?.stateProjections;
      if (projs && isAlloyDatum(parsed)) {
        const currAtom = projs[type];
        const instance = parsed.instances[0];
        const atoms = getTypeAtoms(getInstanceType(instance, type));
        const index = atoms.findIndex((atom) => atom.id === currAtom);
        const next = index < atoms.length - 2 ? index + 1 : index;
        state.projectionsById[datumId].stateProjections[type] = atoms[next].id;
      }
    },
    prevStateProjClicked(
      state,
      action: PayloadAction<{ datumId: string; type: string }>
    ) {
      const { datumId, type } = action.payload;
      const datum = state.datumById[datumId];
      const parsed = datum.parsed;
      const projs = state.projectionsById[datumId]?.stateProjections;
      if (projs && isAlloyDatum(parsed)) {
        const currAtom = projs[type];
        const instance = parsed.instances[0];
        const atoms = getTypeAtoms(getInstanceType(instance, type));
        const index = atoms.findIndex((atom) => atom.id === currAtom);
        const prev = index > 0 ? index - 1 : index;
        state.projectionsById[datumId].stateProjections[type] = atoms[prev].id;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      dataReceived,
      (state, action: PayloadAction<DataJoinParsed>) => {
        const { enter, update, exit } = action.payload;
        if (enter) {
          /**
           * Add all entering data, first checking that the datum id does not
           * already exist before adding it to the state.
           */
          enter.forEach((datum) => {
            const id = datum.id;
            if (!state.datumById[id]) {
              state.datumById[id] = datum;
            }
          });
          state.datumIds.push(...enter.map((datum) => datum.id));
          state.active = state.datumIds[state.datumIds.length - 1];
        }

        if (update) {
          update.forEach((meta) => {
            // Check that the datum does exist in the state before updating it.
            const id = meta.id;
            if (state.datumById[id]) {
              Object.assign(state.datumById[id], meta);
            }
          });
        }
        if (exit) {
          exit.forEach((id) => {
            // Check that the datum exists before removing it from the state.
            if (state.datumById[id]) {
              delete state.datumById[id];
              if (state.active === id) {
                state.active = null;
              }
            }
          });
        }
      }
    );
  }
});

export const {
  datumSelected,
  dumpClicked,
  stateProjectionAdded,
  prevStateProjClicked,
  nextStateProjClicked
} = dataSlice.actions;
export default dataSlice.reducer;
