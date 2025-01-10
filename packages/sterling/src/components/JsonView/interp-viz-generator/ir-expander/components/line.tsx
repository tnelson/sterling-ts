import React, { useState, useRef, useEffect } from 'react';
import { DatumParsed, evalRequested } from "@/sterling-connection";
import { useSterlingDispatch, useSterlingSelector } from "sterling/src/state/hooks";
import { selectEvaluatorExpressions, selectNextExpressionId } from "sterling/src/state/selectors";
import { useLocalNextExpressionId } from "../../LocalNextExpressionIdProvider";
import { Expression } from "sterling/src/state/evaluator/evaluator";
import { isConditional, isForgeExpression } from '../util';
import Line from '../../components/Line';

interface LineComponentProps {
  json: any;
  datum: DatumParsed<any>;
  dynamics: { [key: string]: any };
  vizRow: number | undefined;
  vizCol: number | undefined;
}

export function LineComponent(props: LineComponentProps) {
  // [TODO] update this to use dynamics, vizRow, and vizCol where necessary 
  const { json, dynamics, vizRow, vizCol, datum } = props;
  const { id, properties } = json;
  const { startX, endX, startY, endY, lineStyle } = properties;

  const dispatch = useSterlingDispatch();

  /* for a line component, none of the props could have a nested component.
   * so we can simplify the design for processing conditional props by taking
   * advantage of the fact that this can't happen.
   */
  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);

  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  let nextExpressionId = Math.max(expressionId, globalNextExpressionId);

  // [TODO] abstract this into a function so we don't have to retype
  // the same logic for each (potentially conditional) prop
  const [startXConditionResult, setStartXConditionResult] = useState<undefined | string>(undefined);
  const startXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [endXConditionResult, setEndXConditionResult] = useState<undefined | string>(undefined);
  const endXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [startYConditionResult, setStartYConditionResult] = useState<undefined | string>(undefined);
  const startYConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [endYConditionResult, setEndYConditionResult] = useState<undefined | string>(undefined);
  const endYConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [strokeWidthConditionResult, setStrokeWidthConditionResult] = useState<undefined | string>(undefined);
  const strokeWidthConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [strokeColorConditionResult, setStrokeColorConditionResult] = useState<undefined | string>(undefined);
  const strokeColorConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);

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
    if (isConditional(startX)) {
      makeEvaluatorRequest(startX.condition.substring(1), datum, nextExpressionId, setStartXConditionResult, startXConditionResultSetter);
    } else {
      setStartXConditionResult(startX);
    }

    if (isConditional(endX)) {
      makeEvaluatorRequest(endX.condition.substring(1), datum, nextExpressionId, setEndXConditionResult, endXConditionResultSetter);
    } else {
      setEndXConditionResult(endX);
    }

    if (isConditional(startY)) {
      makeEvaluatorRequest(startY.condition.substring(1), datum, nextExpressionId, setStartYConditionResult, startYConditionResultSetter);
    } else {
      setStartYConditionResult(startY);
    }

    if (isConditional(endY)) {
      makeEvaluatorRequest(endY.condition.substring(1), datum, nextExpressionId, setEndYConditionResult, endYConditionResultSetter);
    } else {
      setEndYConditionResult(endY);
    }

    const strokeWidth = lineStyle && lineStyle.strokeWidth ? lineStyle.strokeWidth : undefined;
    if (isConditional(strokeWidth)) {
      makeEvaluatorRequest(strokeWidth.condition.substring(1), datum, nextExpressionId, setStrokeWidthConditionResult, strokeWidthConditionResultSetter);
    } else {
      setStrokeWidthConditionResult(strokeWidth);
    }

    const strokeColor = lineStyle && lineStyle.strokeColor ? lineStyle.strokeColor : undefined;
    if (isConditional(strokeColor)) {
      makeEvaluatorRequest(strokeColor.condition.substring(1), datum, nextExpressionId, setStrokeColorConditionResult, strokeColorConditionResultSetter);
    } else {
      setStrokeColorConditionResult(strokeColor);
    }
  }, []);

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator
  useEffect(() => {
    if (startXConditionResultSetter.current !== null) {
      startXConditionResultSetter.current(expressions);
    }
    if (endXConditionResultSetter.current !== null) {
      endXConditionResultSetter.current(expressions);
    }
    if (startYConditionResultSetter.current !== null) {
      startYConditionResultSetter.current(expressions);
    }
    if (endYConditionResultSetter.current !== null) {
      endYConditionResultSetter.current(expressions);
    }
    if (strokeWidthConditionResultSetter.current !== null) {
      strokeWidthConditionResultSetter.current(expressions);
    }
    if (strokeColorConditionResultSetter.current !== null) {
      strokeColorConditionResultSetter.current(expressions);
    }
  }, [expressions]);

  // evaluate props as forge expressions when specified by the user
  useEffect(() => {
    if (startXConditionResult !== undefined && isForgeExpression(startXConditionResult)) {
      makeEvaluatorRequest(
        startXConditionResult.substring(1),
        datum,
        nextExpressionId,
        setStartXConditionResult,
        startXConditionResultSetter
      );
    }
    if (endXConditionResult !== undefined && isForgeExpression(endXConditionResult)) {
      makeEvaluatorRequest(
        endXConditionResult.substring(1),
        datum,
        nextExpressionId,
        setEndXConditionResult,
        endXConditionResultSetter
      );
    }
    if (startYConditionResult !== undefined && isForgeExpression(startYConditionResult)) {
      makeEvaluatorRequest(
        startYConditionResult.substring(1),
        datum,
        nextExpressionId,
        setStartYConditionResult,
        startYConditionResultSetter
      );
    }
    if (endYConditionResult !== undefined && isForgeExpression(endYConditionResult)) {
      makeEvaluatorRequest(
        endYConditionResult.substring(1),
        datum,
        nextExpressionId,
        setEndYConditionResult,
        endYConditionResultSetter
      );
    }
    if (strokeWidthConditionResult !== undefined && isForgeExpression(strokeWidthConditionResult)) {
      makeEvaluatorRequest(
        strokeWidthConditionResult.substring(1),
        datum,
        nextExpressionId,
        setStrokeWidthConditionResult,
        strokeWidthConditionResultSetter
      );
    }
    if (strokeColorConditionResult !== undefined && isForgeExpression(strokeColorConditionResult)) {
      makeEvaluatorRequest(
        strokeColorConditionResult.substring(1),
        datum,
        nextExpressionId,
        setStrokeColorConditionResult,
        strokeColorConditionResultSetter
      );
    }
  }, [startXConditionResult, endXConditionResult, startYConditionResult, endYConditionResult, strokeWidthConditionResult, strokeColorConditionResult]);

  if (startXConditionResult === undefined || endXConditionResult === undefined || startYConditionResult === undefined || endYConditionResult === undefined) {
    return <></>; // not ready to render the component yet
  } else {
    return (
      <Line
        startX={Number(startXConditionResult)}
        endX={Number(endXConditionResult)}
        startY={Number(startYConditionResult)}
        endY={Number(endYConditionResult)}
        lineStyle={{
          strokeWidth: strokeWidthConditionResult ? Number(strokeWidthConditionResult) : undefined,
          strokeColor: strokeColorConditionResult ? String(strokeColorConditionResult) : undefined
        }}
      />
    );
  }
}