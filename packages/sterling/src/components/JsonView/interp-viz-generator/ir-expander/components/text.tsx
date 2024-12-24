import { isConditional } from '../conditional/conditional';
import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from '../../components/TextDisplay';
import { DatumParsed, evalRequested } from '@/sterling-connection';
import { useSterlingDispatch, useSterlingSelector } from 'sterling/src/state/hooks';
import { selectEvaluatorExpressions, selectNextExpressionId } from 'sterling/src/state/selectors';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import { useLocalNextExpressionId } from '../../LocalNextExpressionIdProvider';

interface TextComponentProps {
  json: any;
  datum: DatumParsed<any>;
  dynamics: { [key: string]: any };
  vizRow: number | undefined;
  vizCol: number | undefined;
}

export function TextComponent(props: TextComponentProps) {
  // [TODO] update this to use dynamics, vizRow, and vizCol where necessary 
  const { json, dynamics, vizRow, vizCol, datum } = props;
  const { id, properties } = json;
  const { text, topY, leftX, textStyle } = properties;

  const dispatch = useSterlingDispatch();

  /* for a text component, none of the props could have a nested component.
   * so we can simplify the design for processing conditional props by taking
   * advantage of the fact that this can't happen.
   */
  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);

  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  let nextExpressionId = Math.max(expressionId, globalNextExpressionId);

  // [TODO] abstract this into a function so we don't have to retype
  // the same logic for each (potentially conditional) prop
  const [textConditionResult, setTextConditionResult] = useState<undefined | string>(undefined);
  const textConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [topYConditionResult, setTopYConditionResult] = useState<undefined | string>(undefined);
  const topYConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [leftXConditionResult, setLeftXConditionResult] = useState<undefined | string>(undefined);
  const leftXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [textColorConditionResult, setTextColorConditionResult] = useState<undefined | string>(undefined);
  const textColorConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);

  // [TODO] this function isn't specific to this component; we should
  // move it to its own file so all components can use it to make eval requests
  // for conditional props
  function makeEvaluatorRequest(
    query: string,
    datum: DatumParsed<any>,
    expressionId: number,
    setConditionResult: React.Dispatch<React.SetStateAction<string | undefined>>,
    setResult: React.MutableRefObject<((expressions: Expression[]) => void) | null>
  ) {
    dispatch(
      evalRequested({
        id: `${expressionId}`,
        datumId: datum.id,
        expression: query
      })
    );
    setExpressionId(nextExpressionId + 1);
    nextExpressionId += 1;

    if (setResult.current === null) {
      const resultSetter = (expressions: Expression[]) => {
        const result = expressions.find(
          (expression: Expression) => expression.id === `${expressionId}`
        );
        if (result !== undefined) {
          setConditionResult(result.result);
        }
      };

      setResult.current = resultSetter;
    }
  }

  const expressions = useSterlingSelector((state) =>
    selectEvaluatorExpressions(state, datum)
  );

  // make initial requests to evaluate conditional expressions for props 
  useEffect(() => {
    if (isConditional(text)) {
      makeEvaluatorRequest(text.condition, datum, nextExpressionId, setTextConditionResult, textConditionResultSetter);
    } else {
      setTextConditionResult(text);
    }

    if (isConditional(topY)) {
      makeEvaluatorRequest(topY.condition, datum, nextExpressionId, setTopYConditionResult, topYConditionResultSetter);
    } else {
      setTopYConditionResult(topY);
    }

    if (isConditional(leftX)) {
      makeEvaluatorRequest(leftX.condition, datum, nextExpressionId, setLeftXConditionResult, leftXConditionResultSetter);
    } else {
      setLeftXConditionResult(leftX);
    }

    const textColor =
      textStyle && textStyle.textColor ? textStyle.textColor : undefined;
    if (isConditional(textColor)) {
      makeEvaluatorRequest(textColor.condition, datum, nextExpressionId, setTextColorConditionResult, textColorConditionResultSetter);
    } else {
      setTextColorConditionResult(textColor);
    }
  }, []);

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator 
  useEffect(() => {
    if (textConditionResultSetter.current !== null) {
      textConditionResultSetter.current(expressions);
    }
    if (topYConditionResultSetter.current !== null) {
      topYConditionResultSetter.current(expressions);
    }
    if (leftXConditionResultSetter.current !== null) {
      leftXConditionResultSetter.current(expressions);
    }
    if (textColorConditionResultSetter.current !== null) {
      textColorConditionResultSetter.current(expressions);
    }
  }, [expressions]);

  // evaluate props as forge expressions when specified by the user 
  useEffect(() => {
    if (textConditionResult !== undefined && typeof textConditionResult === 'string'
        && textConditionResult.startsWith('~')) {
      makeEvaluatorRequest(
        textConditionResult.substring(1),
        datum,
        nextExpressionId,
        setTextConditionResult,
        textConditionResultSetter
      );
    }
    if (topYConditionResult !== undefined && typeof topYConditionResult === 'string'
        && topYConditionResult.startsWith('~')) {
      makeEvaluatorRequest(
        topYConditionResult.substring(1),
        datum,
        nextExpressionId,
        setTopYConditionResult,
        topYConditionResultSetter
      );
    }
    if (leftXConditionResult !== undefined && typeof leftXConditionResult === 'string'
        && leftXConditionResult.startsWith('~')) {
      makeEvaluatorRequest(
        leftXConditionResult.substring(1),
        datum,
        nextExpressionId,
        setLeftXConditionResult,
        leftXConditionResultSetter
      );
    }
    if (textColorConditionResult !== undefined && typeof textColorConditionResult === 'string'
        && textColorConditionResult.startsWith('~')) {
      makeEvaluatorRequest(
        textColorConditionResult.substring(1),
        datum,
        nextExpressionId,
        setTextColorConditionResult,
        textColorConditionResultSetter
      );
    }
  }, [textConditionResult, topYConditionResult, leftXConditionResult, textColorConditionResult]);

  if (textConditionResult === undefined || topYConditionResult === undefined || leftXConditionResult === undefined) {
    return <></>; // not ready to render the component yet
  } else {
    return (
      <TextDisplay
        text={String(textConditionResult)}
        topY={Number(topYConditionResult)}
        leftX={Number(leftXConditionResult)}
        textStyle={
          textStyle && textStyle.textColor
            ? { textColor: String(textColorConditionResult) }
            : undefined
        }
      />
    );
  }
}
