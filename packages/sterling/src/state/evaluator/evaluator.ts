import { EvalExpression, EvalResult } from '@/sterling-connection';

export type Expression = EvalExpression & EvalResult;

export interface EvaluatorState {
  nextExpressionId: number;
  expressionsById: Record<string, Expression>;
  orderByDatumId: Record<string, string[]>;
}

export const newEvaluatorState = (): EvaluatorState => {
  return {
    nextExpressionId: 0,
    expressionsById: {},
    orderByDatumId: {}
  };
};
