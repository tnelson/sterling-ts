import { isConditional, isForgeBoolean, isForgeExpression, parseBoolean } from '../util';
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
  const { id, properties, shouldGlow } = json;
  let { text, topY, leftX, textStyle } = properties;

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
  const [isTextConditionalRequestMade, setIsTextConditionalRequestMade] = useState(false);
  const [isTextConditionSet, setIsTextConditionSet] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [topYConditionResult, setTopYConditionResult] = useState<undefined | string>(undefined);
  const topYConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [leftXConditionResult, setLeftXConditionResult] = useState<undefined | string>(undefined);
  const leftXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [textColorConditionResult, setTextColorConditionResult] = useState<undefined | string>(undefined);
  const textColorConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);

  console.log('textConditionResult:', textConditionResult);

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
        if (result !== undefined && result.result !== '') {
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
    if (isConditional(textValue)) {
      if (!isTextConditionalRequestMade) {
        makeEvaluatorRequest(
          textValue.condition.substring(1),
          datum,
          nextExpressionId,
          setTextConditionResult,
          textConditionResultSetter
        );
        setIsTextConditionalRequestMade(true);
      }
    } else {
      setTextConditionResult(textValue);
    }

    if (isConditional(topY) && !isTextConditionalRequestMade) {
      // fix second part of condition
      makeEvaluatorRequest(
        topY.condition.substring(1),
        datum,
        nextExpressionId,
        setTopYConditionResult,
        topYConditionResultSetter
      );
    } else {
      setTopYConditionResult(topY);
    }

    if (isConditional(leftX) && !isTextConditionalRequestMade) {
      // fix second part of condition
      makeEvaluatorRequest(
        leftX.condition.substring(1),
        datum,
        nextExpressionId,
        setLeftXConditionResult,
        leftXConditionResultSetter
      );
    } else {
      setLeftXConditionResult(leftX);
    }

    const textColor = textStyle && textStyle.textColor ? textStyle.textColor : undefined;
    if (isConditional(textColor) && !isTextConditionalRequestMade) {
      // fix second part of condition
      makeEvaluatorRequest(
        textColor.condition.substring(1),
        datum,
        nextExpressionId,
        setTextColorConditionResult,
        textColorConditionResultSetter
      );
    } else {
      setTextColorConditionResult(textColor);
    }
  }, [isTextConditionalRequestMade]);

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator
  useEffect(() => {
    if (textConditionResultSetter.current !== null && !isTextConditionSet) {
      textConditionResultSetter.current(expressions);
      if (
        isConditional(textValue) &&
        textConditionResult !== undefined &&
        isForgeBoolean(textConditionResult)
      ) {
        if (parseBoolean(textConditionResult)) {
          setTextConditionResult(undefined);
          setIsTextConditionalRequestMade(false);
          textConditionResultSetter.current = null;
          setTextValue(textValue.then);
        } else {
          setTextConditionResult(undefined);
          setIsTextConditionalRequestMade(false);
          textConditionResultSetter.current = null;
          setTextValue(textValue.else);
        }
        // if not a nested condition, no need for further conditional evaluation
        if (!isConditional(textValue)) {
          setIsTextConditionSet(true);
        }
      }
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
    if (textConditionResult !== undefined && isForgeExpression(textConditionResult)) {
      makeEvaluatorRequest(
        textConditionResult.substring(1),
        datum,
        nextExpressionId,
        setTextConditionResult,
        textConditionResultSetter
      );
    }
    if (topYConditionResult !== undefined && isForgeExpression(topYConditionResult)) {
      makeEvaluatorRequest(
        topYConditionResult.substring(1),
        datum,
        nextExpressionId,
        setTopYConditionResult,
        topYConditionResultSetter
      );
    }
    if (leftXConditionResult !== undefined && isForgeExpression(leftXConditionResult)) {
      makeEvaluatorRequest(
        leftXConditionResult.substring(1),
        datum,
        nextExpressionId,
        setLeftXConditionResult,
        leftXConditionResultSetter
      );
    }
    if (textColorConditionResult !== undefined && isForgeExpression(textColorConditionResult)) {
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
        shouldGlow={shouldGlow}
        id={id}
      />
    );
  }
}
