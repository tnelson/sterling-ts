import {
  EvalExpression,
  evalReceived,
  evalRequested,
  EvalResult
} from '@/sterling-connection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EvaluatorState, newEvaluatorState } from './evaluator';

const initialState: EvaluatorState = newEvaluatorState();

const evaluatorSlice = createSlice({
  name: 'evaluator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      evalReceived,
      (state, action: PayloadAction<EvalResult>) => {
        const { id, result } = action.payload;
        state.expressionsById[id].result = result;
      }
    );
    builder.addCase(
      evalRequested,
      (state, action: PayloadAction<EvalExpression>) => {
        const { id, datumId, expression } = action.payload;
        const order = state.orderByDatumId[datumId] || [];
        state.nextExpressionId += 1;
        state.expressionsById[id] = {
          id,
          datumId,
          expression,
          result: ''
        };
        state.orderByDatumId[datumId] = [id, ...order];
      }
    );
  }
});

export const {} = evaluatorSlice.actions;
export default evaluatorSlice.reducer;
