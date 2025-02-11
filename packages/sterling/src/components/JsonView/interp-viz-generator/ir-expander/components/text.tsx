import {
  applyTextRename,
  isConditional,
  isForgeBoolean,
  isForgeExpression,
  parseBoolean
} from '../util';
import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from '../../components/TextDisplay';
import { DatumParsed, evalRequested } from '@/sterling-connection';
import {
  useSterlingDispatch,
  useSterlingSelector
} from 'sterling/src/state/hooks';
import {
  selectEvaluatorExpressions,
  selectNextExpressionId
} from 'sterling/src/state/selectors';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import { useLocalNextExpressionId } from '../../LocalNextExpressionIdProvider';

interface TextComponentProps {
  json: any;
  datum: DatumParsed<any>;
  textRenames: [string, string][];
  dynamics: { [key: string]: any };
  vizRow: number | undefined;
  vizCol: number | undefined;
}

export function TextComponent(props: TextComponentProps) {
  // [TODO] update this to use dynamics, vizRow, and vizCol where necessary
  const { json, dynamics, textRenames, vizRow, vizCol, datum } = props;
  const { id, properties, shouldGlow } = json;
  let { text, topY, leftX, textStyle } = properties;
  console.log('topY value received here:', topY);

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
  const [isTopYConditionalRequestMade, setIsTopYConditionalRequestMade] = useState(false);
  const [isTopYConditionSet, setIsTopYConditionSet] = useState(false);
  const [topYValue, setTopYValue] = useState(topY);

  const [leftXConditionResult, setLeftXConditionResult] = useState<undefined | string>(undefined);
  const leftXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [isLeftXConditionalRequestMade, setIsLeftXConditionalRequestMade] = useState(false);
  const [isLeftXConditionSet, setIsLeftXConditionSet] = useState(false);
  const [leftXValue, setLeftXValue] = useState(leftX);

  const [textColorConditionResult, setTextColorConditionResult] = useState<undefined | string>(undefined);
  const textColorConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [isTextColorConditionalRequestMade, setIsTextColorConditionalRequestMade] = useState(false);
  const [isTextColorConditionSet, setIsTextColorConditionSet] = useState(false);
  const [textColorValue, setTextColorValue] = useState(
    textStyle && textStyle.textColor ? textStyle.textColor : undefined
  );

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

  const handleConditional = (
    value: any,
    isRequestMade: boolean,
    setIsRequestMade: (value: React.SetStateAction<boolean>) => void,
    setResult: React.Dispatch<React.SetStateAction<string | undefined>>,
    resultSetter: React.MutableRefObject<((expressions: Expression[]) => void) | null>
  ) => {
    if (isConditional(value)) {
      if (!isRequestMade) {
        makeEvaluatorRequest(
          value.condition.substring(1),
          datum,
          nextExpressionId,
          setResult,
          resultSetter
        );
        setIsRequestMade(true);
      }
    } else {
      setResult(value);
    }
  };

  // make initial requests to evaluate conditional expressions for props
  useEffect(() => {
    // if (isConditional(textValue)) {
    //   if (!isTextConditionalRequestMade) {
    //     makeEvaluatorRequest(
    //       textValue.condition.substring(1),
    //       datum,
    //       nextExpressionId,
    //       setTextConditionResult,
    //       textConditionResultSetter
    //     );
    //     setIsTextConditionalRequestMade(true);
    //   }
    // } else {
    //   setTextConditionResult(textValue);
    // }
    handleConditional(
      textValue,
      isTextConditionalRequestMade,
      setIsTextConditionalRequestMade,
      setTextConditionResult,
      textConditionResultSetter
    );

    // if (isConditional(topY) && !isTextConditionalRequestMade) {
    //   // fix second part of condition
    //   makeEvaluatorRequest(
    //     topY.condition.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTopYConditionResult,
    //     topYConditionResultSetter
    //   );
    // } else {
    //   setTopYConditionResult(topY);
    // }
    handleConditional(
      topYValue,
      isTopYConditionalRequestMade,
      setIsTopYConditionalRequestMade,
      setTopYConditionResult,
      topYConditionResultSetter
    );

    // if (isConditional(leftX) && !isTextConditionalRequestMade) {
    //   // fix second part of condition
    //   makeEvaluatorRequest(
    //     leftX.condition.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setLeftXConditionResult,
    //     leftXConditionResultSetter
    //   );
    // } else {
    //   setLeftXConditionResult(leftX);
    // }
    handleConditional(
      leftXValue,
      isLeftXConditionalRequestMade,
      setIsLeftXConditionalRequestMade,
      setLeftXConditionResult,
      leftXConditionResultSetter
    );

    // const textColor = textStyle && textStyle.textColor ? textStyle.textColor : undefined;
    // if (isConditional(textColor) && !isTextConditionalRequestMade) {
    //   // fix second part of condition
    //   makeEvaluatorRequest(
    //     textColor.condition.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTextColorConditionResult,
    //     textColorConditionResultSetter
    //   );
    // } else {
    //   setTextColorConditionResult(textColor);
    // }
    handleConditional(
      textColorValue,
      isTextColorConditionalRequestMade,
      setIsTextColorConditionalRequestMade,
      setTextColorConditionResult,
      textColorConditionResultSetter
    );
  }, [
    isTextConditionalRequestMade,
    isTopYConditionalRequestMade,
    isLeftXConditionalRequestMade,
    isTextColorConditionalRequestMade
  ]);

  const handleForgeValueUpdate = (
    value: any,
    isConditionSet: boolean,
    conditionResult: string | undefined,
    resultSetter: React.MutableRefObject<
      ((expressions: Expression[]) => void) | null
    >,
    setConditionResult: (
      value: React.SetStateAction<string | undefined>
    ) => void,
    setIsRequestMade: (value: React.SetStateAction<boolean>) => void,
    setValue: (value: any) => void,
    setIsConditionSet: (value: React.SetStateAction<boolean>) => void
  ) => {
    if (resultSetter.current !== null && !isConditionSet) {
      resultSetter.current(expressions);
      if (
        isConditional(value) &&
        conditionResult !== undefined &&
        isForgeBoolean(conditionResult)
      ) {
        if (parseBoolean(conditionResult)) {
          setConditionResult(undefined);
          setIsRequestMade(false);
          resultSetter.current = null;
          setValue(value.then);
        } else {
          setConditionResult(undefined);
          setIsRequestMade(false);
          resultSetter.current = null;
          setValue(value.else);
        }
        // if not a nested condition, no need for further conditional evaluation
        if (!isConditional(value)) {
          setIsConditionSet(true);
        }
      }
    }
  };

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator
  useEffect(() => {
    // if (textConditionResultSetter.current !== null && !isTextConditionSet) {
    //   textConditionResultSetter.current(expressions);
    //   if (
    //     isConditional(textValue) &&
    //     textConditionResult !== undefined &&
    //     isForgeBoolean(textConditionResult)
    //   ) {
    //     if (parseBoolean(textConditionResult)) {
    //       setTextConditionResult(undefined);
    //       setIsTextConditionalRequestMade(false);
    //       textConditionResultSetter.current = null;
    //       setTextValue(textValue.then);
    //     } else {
    //       setTextConditionResult(undefined);
    //       setIsTextConditionalRequestMade(false);
    //       textConditionResultSetter.current = null;
    //       setTextValue(textValue.else);
    //     }
    //     // if not a nested condition, no need for further conditional evaluation
    //     if (!isConditional(textValue)) {
    //       setIsTextConditionSet(true);
    //     }
    //   }
    // }
    handleForgeValueUpdate(
      textValue,
      isTextConditionSet,
      textConditionResult,
      textConditionResultSetter,
      setTextConditionResult,
      setIsTextConditionalRequestMade,
      setTextValue,
      setIsTextConditionSet
    );

    // if (topYConditionResultSetter.current !== null) {
    //   topYConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      topYValue,
      isTopYConditionSet,
      topYConditionResult,
      topYConditionResultSetter,
      setTopYConditionResult,
      setIsTopYConditionalRequestMade,
      setTopYValue,
      setIsTopYConditionSet
    );

    // if (leftXConditionResultSetter.current !== null) {
    //   leftXConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      leftXValue,
      isLeftXConditionSet,
      leftXConditionResult,
      leftXConditionResultSetter,
      setLeftXConditionResult,
      setIsLeftXConditionalRequestMade,
      setLeftXValue,
      setIsLeftXConditionSet
    );

    // if (textColorConditionResultSetter.current !== null) {
    //   textColorConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      textColorValue,
      isTextColorConditionSet,
      textColorConditionResult,
      textColorConditionResultSetter,
      setTextColorConditionResult,
      setIsTextColorConditionalRequestMade,
      setTextColorValue,
      setIsTextColorConditionSet
    );
  }, [expressions]);

  const evaluateForgeProps = (value: any, setValue: React.Dispatch<any>, resultSetter: React.MutableRefObject<((expressions: Expression[]) => void) | null>) => {
    if (value !== undefined && isForgeExpression(value)) {
      makeEvaluatorRequest(
        value.substring(1),
        datum,
        nextExpressionId,
        setValue,
        resultSetter
      );
    }
  }

  // evaluate props as forge expressions when specified by the user
  useEffect(() => {
    // if (textConditionResult !== undefined && isForgeExpression(textConditionResult)) {
    //   makeEvaluatorRequest(
    //     textConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTextConditionResult,
    //     textConditionResultSetter
    //   );
    // }
    evaluateForgeProps(textValue, setTextValue, textConditionResultSetter);

    // if (
    //   topYConditionResult !== undefined &&
    //   isForgeExpression(topYConditionResult)
    // ) {
    //   makeEvaluatorRequest(
    //     topYConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTopYConditionResult,
    //     topYConditionResultSetter
    //   );
    // }
    evaluateForgeProps(topYValue, setTopYValue, topYConditionResultSetter);

    // if (
    //   leftXConditionResult !== undefined &&
    //   isForgeExpression(leftXConditionResult)
    // ) {
    //   makeEvaluatorRequest(
    //     leftXConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setLeftXConditionResult,
    //     leftXConditionResultSetter
    //   );
    // }
    evaluateForgeProps(leftXValue, setLeftXValue, leftXConditionResultSetter);

    // if (
    //   textColorConditionResult !== undefined &&
    //   isForgeExpression(textColorConditionResult)
    // ) {
    //   makeEvaluatorRequest(
    //     textColorConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTextColorConditionResult,
    //     textColorConditionResultSetter
    //   );
    // }
    evaluateForgeProps(textColorValue, setTextColorValue, textColorConditionResultSetter);
  }, [
    textConditionResult,
    topYConditionResult,
    leftXConditionResult,
    textColorConditionResult,
    textValue,
    topYValue,
    leftXValue,
    textColorValue
  ]);

  // if (
  //   textConditionResult === undefined ||
  //   topYConditionResult === undefined ||
  //   leftXConditionResult === undefined
  // ) {
  //   return <></>; // not ready to render the component yet
  // } 
  
  if (textValue === undefined || isForgeExpression(textValue) || topYValue === undefined || isForgeExpression(topYValue) || leftXValue === undefined || isForgeExpression(leftXValue)) { 
    return <></>; // not ready to render the component yet
  } else {
    console.log('about to call, text:', textConditionResult);
    console.log('about to call, topY:', topYConditionResult);
    console.log('textValue here is:', textValue);
    console.log('topYValue here is:', topYValue);
    // return (
    //   <TextDisplay
    //     text={String(textConditionResult)}
    //     topY={Number(topYConditionResult)}
    //     leftX={Number(leftXConditionResult)}
    //     textStyle={
    //       textStyle && textStyle.textColor
    //         ? { textColor: String(textColorConditionResult) }
    //         : undefined
    //     }
    //     shouldGlow={shouldGlow}
    //     id={id}
    //   />
    // );
    return (
      <TextDisplay
        text={applyTextRename(String(textValue), textRenames)}
        topY={Number(topYValue)}
        leftX={Number(leftXValue)}
        textStyle={
          textStyle && textStyle.textColor
            ? { textColor: String(textColorValue) }
            : undefined
        }
        shouldGlow={shouldGlow}
        id={id}
      />
    );
  }
}
