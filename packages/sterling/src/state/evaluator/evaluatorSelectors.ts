import { EvaluatorState, Expression } from './evaluator';

const selectDatumExpressions = (
  state: EvaluatorState,
  datumId: string
): Expression[] => {
  const order = state.orderByDatumId[datumId] || [];
  return order.map((expressionId) => {
    return state.expressionsById[expressionId];
  });
};

const selectEvaluatorActive = (state: EvaluatorState): boolean => {
  return true;
};

const selectNextExpressionId = (state: EvaluatorState): number =>
  state.nextExpressionId;

export default {
  selectDatumExpressions,
  selectEvaluatorActive,
  selectNextExpressionId
};
