import { DatumParsed, evalRequested } from '@/sterling-connection';
import { SingleComponent } from '../ir-expander';
import React, { useEffect, useRef, useState } from 'react';
import { useSterlingDispatch, useSterlingSelector } from 'sterling/src/state/hooks';
import { useLocalNextExpressionId } from '../../LocalNextExpressionIdProvider';
import { selectEvaluatorExpressions, selectNextExpressionId } from 'sterling/src/state/selectors';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import DoNothing from '../../components/DoNothing';
import { parseBoolean } from '../util';


interface ConditionalComponentProps {
  elementJson: any;
  datum: DatumParsed<any>;
  vizRow?: number;
  vizCol?: number;
}

// This function is only safe to call if you have a conditional element
export function ConditionalComponent(props: ConditionalComponentProps) {
  // [TODO] update this to make use of dynamics (when grid components are implemented)
  const { elementJson, datum, vizRow, vizCol } = props;

  const dispatch = useSterlingDispatch();
  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);

  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  const nextExpressionId = Math.max(expressionId, globalNextExpressionId);

  const [conditionResult, setConditionResult] = useState<undefined | string>(undefined);
  const setResult = useRef<null | ((expressions: Expression[]) => void)>(null);

  const expressions = useSterlingSelector((state) =>
    selectEvaluatorExpressions(state, datum)
  );

  function makeEvaluatorRequest(query: string, datum: DatumParsed<any>, expressionId: number) {
    dispatch(
      evalRequested({
        id: `${expressionId}`,
        datumId: datum.id,
        expression: query
      })
    );
    setExpressionId(nextExpressionId + 1);

    if (setResult.current === null) {
      const resultSetter = (expressions: Expression[]) => {
        const result = expressions.find(
          (expression: Expression) => expression.id === `${expressionId}`
        );
        if (result !== undefined && conditionResult === undefined) {
          setConditionResult(result.result);
        }
      };

      setResult.current = resultSetter;
    }
  }

  const conditionExpr = elementJson.condition;
  const thenExpr = elementJson.then;
  const elseExpr = elementJson.else;

  useEffect(() => {
    makeEvaluatorRequest(conditionExpr, datum, nextExpressionId);
  }, [])

  useEffect(() => {
    if (setResult.current !== null) {
      setResult.current(expressions);
    }
  }, [expressions]);
  

  if (conditionResult === undefined) {
    return <DoNothing />;
  }

  try {
    const condition = parseBoolean(conditionResult);
    if (condition)
      return <SingleComponent elementJson={thenExpr} datum={datum} vizRow={vizRow} vizCol={vizCol} />;
    else
      return <SingleComponent elementJson={elseExpr} datum={datum} vizRow={vizRow} vizCol={vizCol} />;
  } catch (e) {
    return <div color='red'>Error: condition didn't evaluate to bool -- {conditionExpr}</div>
  }
}