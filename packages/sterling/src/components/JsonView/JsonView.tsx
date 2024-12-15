import { useSterlingSelector, useSterlingDispatch } from '../../state/hooks';
import {
  selectActiveDatum,
  selectNextExpressionId,
  selectEvaluatorExpressions
} from '../../state/selectors';
import { DatumParsed } from '@/sterling-connection';
import { selectScriptVariables } from '../../state/selectors';
import { evalRequested } from '@/sterling-connection';
import { useState, useEffect, useRef } from 'react';
import { Expression } from 'sterling/src/state/evaluator/evaluator';

function getSigs(datum: DatumParsed<any>): string[] {
  const instances = datum.parsed.instances;
  const sigs = Object.keys(instances[instances.length - 1].types);
  const toIgnore = ['univ', 'seq/Int', 'Int'];
  return sigs.filter((name: string) => !toIgnore.includes(name));
}

const JsonView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  const dispatch = useSterlingDispatch();
  const nextExpressionId = useSterlingSelector(selectNextExpressionId);

  if (!datum) return null;

  // console.log('datum', datum.parsed);

  // const sigs = getSigs(datum);
  // console.log('sigs:', sigs);

  // const datumVariables = useSterlingSelector((state) =>
  //   selectScriptVariables(state, datum)
  // );
  // console.log('datum variables:', datumVariables);

  const dummyQuery = '#Board';

  const expressions = useSterlingSelector((state) =>
    selectEvaluatorExpressions(state, datum)
  );

  const [queryResult, setQueryResult] = useState<undefined | string>(undefined);
  const setResult = useRef<null | ((expressions: Expression[]) => void)>(null);

  function makeEvaluatorRequest(
    query: string,
    datum: DatumParsed<any>,
    expressionId: number
  ) {
    dispatch(
      evalRequested({
        id: `${expressionId}`,
        datumId: datum.id,
        expression: query
      })
    );

    if (setResult.current === null) {
      const resultSetter = (expressions: Expression[]) => {
        const result = expressions.find(
          (expression: Expression) => expression.id === `${expressionId}`
        );
        if (result !== undefined && queryResult === undefined) {
          setQueryResult(result.result);
        }
      };

      setResult.current = resultSetter;
    }
  }

  useEffect(() => {
    makeEvaluatorRequest(dummyQuery, datum, nextExpressionId);
  }, []);

  useEffect(() => {
    if (setResult.current !== null) {
      setResult.current(expressions);
    }
  }, [expressions]);

  console.log('queried: expression:', dummyQuery);
  console.log('expressions:', expressions);
  console.log('query result:', queryResult);

  return <b>Query Result: {queryResult}</b>;
};

export { JsonView };
