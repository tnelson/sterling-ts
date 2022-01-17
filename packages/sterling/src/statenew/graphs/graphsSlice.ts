import { dataReceived } from '@/sterling-connection';
import { createSlice } from '@reduxjs/toolkit';
import { themeChanged } from '../theme/themeSlice';
import { GraphsState, newGraphsState } from './graphs';
import reducers from './graphsReducers';
import extraReducers from './graphsExtraReducers';

const initialState: GraphsState = newGraphsState();

const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers,
  extraReducers: (builder) =>
    builder
      .addCase(dataReceived, extraReducers.dataReceived)
      .addCase(themeChanged, extraReducers.themeChanged)
});

export const { graphSpread, graphZoomed } = graphsSlice.actions;
export default graphsSlice.reducer;
