import React, { useState, useRef, useEffect } from 'react';
import { DatumParsed, evalRequested } from '@/sterling-connection';
import Grid, { CellInput, DataRelation } from '../../components/Grid';
import {
  useSterlingDispatch,
  useSterlingSelector
} from 'sterling/src/state/hooks';
import {
  selectEvaluatorExpressions,
  selectNextExpressionId
} from 'sterling/src/state/selectors';
import { useLocalNextExpressionId } from '../../LocalNextExpressionIdProvider';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import {
  isConditional,
  isForgeBoolean,
  isForgeExpression,
  parseBoolean,
  usesVar
} from '../util';

interface GridComponentProps {
  json: any;
  datum: DatumParsed<any>;
  textRenames: [string, string][];
  dynamics: { [key: string]: any };
  vizRow?: number;
  vizCol?: number;
  parentRef?: React.MutableRefObject<SVGSVGElement | null>;
  cellGroup?: d3.Selection<SVGGElement, unknown, null, undefined>;
  offsetX?: number;
  offsetY?: number;
  minExprId?: number;
}

export function GridComponent(props: GridComponentProps) {
  console.log('inside GridComponent');
  // [TODO] update this to use dynamics, vizRow, and vizCol where necessary
  const {
    json,
    dynamics,
    textRenames,
    vizRow,
    vizCol,
    datum,
    parentRef,
    cellGroup,
    offsetX,
    offsetY,
    minExprId
  } = props;
  console.log('json', json);
  const { id, properties, shouldGlow } = json;
  const {
    rows,
    columns,
    height,
    width,
    absolutePosition,
    topY,
    leftX,
    gridStyle,
    cellDataRelation,
    cellText,
    cellVisualization
  } = properties;

  const xOffset = offsetX || 0;
  const yOffset = offsetY || 0;

  // [TODO] we're currently assuming that the cellDataRelation won't be a
  // conditional. We probably don't want to make that assumption so we need
  // to fix that.

  const dispatch = useSterlingDispatch();

  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);

  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  let nextExpressionId = Math.max(
    expressionId,
    globalNextExpressionId,
    minExprId || 0
  );

  // [TODO] abstract this into a function so we don't have to retype
  // the same logic for each (potentially conditional) prop
  const [rowsConditionResult, setRowsConditionResult] = useState<
    undefined | string
  >(undefined);
  const rowsConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isRowsConditionalRequestMade, setIsRowsConditionalRequestMade] =
    useState<boolean>(false);
  const [isRowsConditionSet, setIsRowsConditionSet] = useState<boolean>(false);
  const [rowsValue, setRowsValue] = useState(rows);

  const [columnsConditionResult, setColumnsConditionResult] = useState<
    undefined | string
  >(undefined);
  const columnsConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isColumnsConditionalRequestMade, setIsColumnsConditionalRequestMade] =
    useState<boolean>(false);
  const [isColumnsConditionSet, setIsColumnsConditionSet] =
    useState<boolean>(false);
  const [columnsValue, setColumnsValue] = useState(columns);

  const [heightConditionResult, setHeightConditionResult] = useState<
    undefined | string
  >(undefined);
  const heightConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isHeightConditionalRequestMade, setIsHeightConditionalRequestMade] =
    useState<boolean>(false);
  const [isHeightConditionSet, setIsHeightConditionSet] =
    useState<boolean>(false);
  const [heightValue, setHeightValue] = useState(height);

  const [widthConditionResult, setWidthConditionResult] = useState<
    undefined | string
  >(undefined);
  const widthConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isWidthConditionalRequestMade, setIsWidthConditionalRequestMade] =
    useState<boolean>(false);
  const [isWidthConditionSet, setIsWidthConditionSet] =
    useState<boolean>(false);
  const [widthValue, setWidthValue] = useState(width);

  const [absolutePositionConditionResult, setAbsolutePositionConditionResult] =
    useState<undefined | string>(undefined);
  const absolutePositionConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isAbsolutePositionConditionalRequestMade,
    setIsAbsolutePositionConditionalRequestMade
  ] = useState<boolean>(false);
  const [isAbsolutePositionConditionSet, setIsAbsolutePositionConditionSet] =
    useState<boolean>(false);
  const [absolutePositionValue, setAbsolutePositionValue] =
    useState(absolutePosition);

  const [topYConditionResult, setTopYConditionResult] = useState<
    undefined | string
  >(undefined);
  const topYConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isTopYConditionalRequestMade, setIsTopYConditionalRequestMade] =
    useState<boolean>(false);
  const [isTopYConditionSet, setIsTopYConditionSet] = useState<boolean>(false);
  const [topYValue, setTopYValue] = useState(topY);

  const [leftXConditionResult, setLeftXConditionResult] = useState<
    undefined | string
  >(undefined);
  const leftXConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [isLeftXConditionalRequestMade, setIsLeftXConditionalRequestMade] =
    useState<boolean>(false);
  const [isLeftXConditionSet, setIsLeftXConditionSet] =
    useState<boolean>(false);
  const [leftXValue, setLeftXValue] = useState(leftX);

  const [dashedStrokeConditionResult, setDashedStrokeConditionResult] =
    useState<undefined | string>(undefined);
  const dashedStrokeConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isDashedStrokeConditionalRequestMade,
    setIsDashedStrokeConditionalRequestMade
  ] = useState<boolean>(false);
  const [isDashedStrokeConditionSet, setIsDashedStrokeConditionSet] =
    useState<boolean>(false);
  const [dashedStrokeValue, setDashedStrokeValue] = useState(
    gridStyle && gridStyle.dashedStroke ? gridStyle.dashedStroke : undefined
  );

  const [strokeWidthConditionResult, setStrokeWidthConditionResult] = useState<
    undefined | string
  >(undefined);
  const strokeWidthConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isStrokeWidthConditionalRequestMade,
    setIsStrokeWidthConditionalRequestMade
  ] = useState<boolean>(false);
  const [isStrokeWidthConditionSet, setIsStrokeWidthConditionSet] =
    useState<boolean>(false);
  const [strokeWidthValue, setStrokeWidthValue] = useState(
    gridStyle && gridStyle.strokeWidth ? gridStyle.strokeWidth : undefined
  );

  const [strokeColorConditionResult, setStrokeColorConditionResult] = useState<
    undefined | string
  >(undefined);
  const strokeColorConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isStrokeColorConditionalRequestMade,
    setIsStrokeColorConditionalRequestMade
  ] = useState<boolean>(false);
  const [isStrokeColorConditionSet, setIsStrokeColorConditionSet] =
    useState<boolean>(false);
  const [strokeColorValue, setStrokeColorValue] = useState(
    gridStyle && gridStyle.strokeColor ? gridStyle.strokeColor : undefined
  );

  const [cellDataRelationConditionResult, setCellDataRelationConditionResult] =
    useState<undefined | string>(undefined);
  const cellDataRelationConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isCellDataRelationConditionalRequestMade,
    setIsCellDataRelationConditionalRequestMade
  ] = useState<boolean>(false);
  const [isCellDataRelationConditionSet, setIsCellDataRelationConditionSet] =
    useState<boolean>(false);
  const [cellDataRelationValue, setCellDataRelationValue] =
    useState(cellDataRelation);

  const [cellTextConditionResult, setCellTextConditionResult] = useState<
    undefined | string
  >(undefined);
  const cellTextConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isCellTextConditionalRequestMade,
    setIsCellTextConditionalRequestMade
  ] = useState<boolean>(false);
  const [isCellTextConditionSet, setIsCellTextConditionSet] =
    useState<boolean>(false);
  const [cellTextValue, setCellTextValue] = useState(cellText);

  const [
    cellVisualizationConditionResult,
    setCellVisualizationConditionResult
  ] = useState<undefined | string>(undefined);
  const cellVisualizationConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);
  const [
    isCellVisualizationConditionalRequestMade,
    setIsCellVisualizationConditionalRequestMade
  ] = useState<boolean>(false);
  const [isCellVisualizationConditionSet, setIsCellVisualizationConditionSet] =
    useState<boolean>(false);
  const [cellVisualizationValue, setCellVisualizationValue] =
    useState(cellVisualization);

  // for a potential relation value in the cellDataRelation field
  const [relationConditionResult, setRelationConditionResult] = useState<
    undefined | string
  >(undefined);
  const relationConditionResultSetter = useRef<
    null | ((expressions: Expression[]) => void)
  >(null);

  // [TODO] this function isn't specific to this component; we should
  // move it to its own file so all components can use it to make eval requests
  // for conditional props
  function makeEvaluatorRequest(
    query: string,
    datum: DatumParsed<any>,
    expressionId: number,
    setConditionResult: React.Dispatch<
      React.SetStateAction<string | undefined>
    >,
    setResult: React.MutableRefObject<
      ((expressions: Expression[]) => void) | null
    >
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

  const handleConditional = (
    value: any,
    isRequestMade: boolean,
    setIsRequestMade: (value: React.SetStateAction<boolean>) => void,
    setResult: React.Dispatch<React.SetStateAction<string | undefined>>,
    resultSetter: React.MutableRefObject<
      ((expressions: Expression[]) => void) | null
    >
  ) => {
    if (isConditional(value)) {
      if (!isRequestMade) {
        console.log('evaluating conditional:', value);
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
    // if (isConditional(rows)) {
    //   makeEvaluatorRequest(rows.condition.substring(1), datum, nextExpressionId, setRowsConditionResult, rowsConditionResultSetter);
    // } else {
    //   setRowsConditionResult(rows);
    // }
    handleConditional(
      rowsValue,
      isRowsConditionalRequestMade,
      setIsRowsConditionalRequestMade,
      setRowsConditionResult,
      rowsConditionResultSetter
    );

    // if (isConditional(columns)) {
    //   makeEvaluatorRequest(columns.condition.substring(1), datum, nextExpressionId, setColumnsConditionResult, columnsConditionResultSetter);
    // } else {
    //   setColumnsConditionResult(columns);
    // }
    handleConditional(
      columnsValue,
      isColumnsConditionalRequestMade,
      setIsColumnsConditionalRequestMade,
      setColumnsConditionResult,
      columnsConditionResultSetter
    );

    // if (isConditional(height)) {
    //   makeEvaluatorRequest(height.condition.substring(1), datum, nextExpressionId, setHeightConditionResult, heightConditionResultSetter);
    // } else {
    //   setHeightConditionResult(height);
    // }
    handleConditional(
      heightValue,
      isHeightConditionalRequestMade,
      setIsHeightConditionalRequestMade,
      setHeightConditionResult,
      heightConditionResultSetter
    );

    // if (isConditional(width)) {
    //   makeEvaluatorRequest(width.condition.substring(1), datum, nextExpressionId, setWidthConditionResult, widthConditionResultSetter);
    // } else {
    //   setWidthConditionResult(width);
    // }
    handleConditional(
      widthValue,
      isWidthConditionalRequestMade,
      setIsWidthConditionalRequestMade,
      setWidthConditionResult,
      widthConditionResultSetter
    );

    // if (isConditional(absolutePosition)) {
    //   makeEvaluatorRequest(absolutePosition.condition.substring(1), datum, nextExpressionId, setAbsolutePositionConditionResult, absolutePositionConditionResultSetter);
    // } else {
    //   setAbsolutePositionConditionResult(absolutePosition);
    // }
    handleConditional(
      absolutePositionValue,
      isAbsolutePositionConditionalRequestMade,
      setIsAbsolutePositionConditionalRequestMade,
      setAbsolutePositionConditionResult,
      absolutePositionConditionResultSetter
    );

    // if (isConditional(topY)) {
    //   makeEvaluatorRequest(topY.condition.substring(1), datum, nextExpressionId, setTopYConditionResult, topYConditionResultSetter);
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

    // if (isConditional(leftX)) {
    //   makeEvaluatorRequest(leftX.condition.substring(1), datum, nextExpressionId, setLeftXConditionResult, leftXConditionResultSetter);
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

    // const dashedStroke = gridStyle && gridStyle.dashedStroke ? gridStyle.dashedStroke : undefined;
    // if (isConditional(dashedStroke)) {
    //   makeEvaluatorRequest(dashedStroke.condition.substring(1), datum, nextExpressionId, setDashedStrokeConditionResult, dashedStrokeConditionResultSetter);
    // } else {
    //   setDashedStrokeConditionResult(dashedStroke);
    // }
    handleConditional(
      dashedStrokeValue,
      isDashedStrokeConditionalRequestMade,
      setIsDashedStrokeConditionalRequestMade,
      setDashedStrokeConditionResult,
      dashedStrokeConditionResultSetter
    );

    // const strokeWidth = gridStyle && gridStyle.strokeWidth ? gridStyle.strokeWidth : undefined;
    // if (isConditional(strokeWidth)) {
    //   makeEvaluatorRequest(strokeWidth.condition.substring(1), datum, nextExpressionId, setStrokeWidthConditionResult, strokeWidthConditionResultSetter);
    // } else {
    //   setStrokeWidthConditionResult(strokeWidth);
    // }
    handleConditional(
      strokeWidthValue,
      isStrokeWidthConditionalRequestMade,
      setIsStrokeWidthConditionalRequestMade,
      setStrokeWidthConditionResult,
      strokeWidthConditionResultSetter
    );

    // const strokeColor = gridStyle && gridStyle.strokeColor ? gridStyle.strokeColor : undefined;
    // if (isConditional(strokeColor)) {
    //   makeEvaluatorRequest(strokeColor.condition.substring(1), datum, nextExpressionId, setStrokeColorConditionResult, strokeColorConditionResultSetter);
    // } else {
    //   setStrokeColorConditionResult(strokeColor);
    // }
    handleConditional(
      strokeColorValue,
      isStrokeColorConditionalRequestMade,
      setIsStrokeColorConditionalRequestMade,
      setStrokeColorConditionResult,
      strokeColorConditionResultSetter
    );

    // if (isConditional(cellDataRelation)) {
    //   makeEvaluatorRequest(cellDataRelation.condition.substring(1), datum, nextExpressionId, setCellDataRelationConditionResult, cellDataRelationConditionResultSetter);
    // } else {
    //   setCellDataRelationConditionResult(cellDataRelation);
    // }
    handleConditional(
      cellDataRelationValue,
      isCellDataRelationConditionalRequestMade,
      setIsCellDataRelationConditionalRequestMade,
      setCellDataRelationConditionResult,
      cellDataRelationConditionResultSetter
    );

    // if (isConditional(cellText) && !usesVar(cellText.condition, 'row') && !usesVar(cellText.condition, 'col')) {
    //   makeEvaluatorRequest(cellText.condition.substring(1), datum, nextExpressionId, setCellTextConditionResult, cellTextConditionResultSetter);
    // } else {
    //   setCellTextConditionResult(cellText);
    // }
    handleConditional(
      cellTextValue,
      isCellTextConditionalRequestMade,
      setIsCellTextConditionalRequestMade,
      setCellTextConditionResult,
      cellTextConditionResultSetter
    );

    // if (isConditional(cellVisualization) && !usesVar(cellVisualization.condition, 'row') && !usesVar(cellVisualization.condition, 'col')) {
    //   makeEvaluatorRequest(cellVisualization.condition.substring(1), datum, nextExpressionId, setCellVisualizationConditionResult, cellVisualizationConditionResultSetter);
    // } else {
    //   setCellVisualizationConditionResult(cellVisualization);
    // }
    handleConditional(
      cellVisualizationValue,
      isCellVisualizationConditionalRequestMade,
      setIsCellVisualizationConditionalRequestMade,
      setCellVisualizationConditionResult,
      cellVisualizationConditionResultSetter
    );

    // [TODO] this is SUPER JANKY. fix this soon!
    if (
      cellDataRelation !== undefined &&
      cellDataRelation.type === 'get-next-from-trace' &&
      cellDataRelation.relation !== undefined
    ) {
      setRelationConditionResult(cellDataRelation.relation);
    }
  }, [
    isRowsConditionalRequestMade,
    isColumnsConditionalRequestMade,
    isHeightConditionalRequestMade,
    isWidthConditionalRequestMade,
    isAbsolutePositionConditionalRequestMade,
    isTopYConditionalRequestMade,
    isLeftXConditionalRequestMade,
    isDashedStrokeConditionalRequestMade,
    isStrokeWidthConditionalRequestMade,
    isStrokeColorConditionalRequestMade,
    isCellDataRelationConditionalRequestMade,
    isCellTextConditionalRequestMade,
    isCellVisualizationConditionalRequestMade
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
      console.log('going to update value:', value);
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
    // if (rowsConditionResultSetter.current !== null) {
    //   rowsConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      rowsValue,
      isRowsConditionSet,
      rowsConditionResult,
      rowsConditionResultSetter,
      setRowsConditionResult,
      setIsRowsConditionalRequestMade,
      setRowsValue,
      setIsRowsConditionSet
    );

    // if (columnsConditionResultSetter.current !== null) {
    //   columnsConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      columnsValue,
      isColumnsConditionSet,
      columnsConditionResult,
      columnsConditionResultSetter,
      setColumnsConditionResult,
      setIsColumnsConditionalRequestMade,
      setColumnsValue,
      setIsColumnsConditionSet
    );

    // if (heightConditionResultSetter.current !== null) {
    //   heightConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      heightValue,
      isHeightConditionSet,
      heightConditionResult,
      heightConditionResultSetter,
      setHeightConditionResult,
      setIsHeightConditionalRequestMade,
      setHeightValue,
      setIsHeightConditionSet
    );

    // if (widthConditionResultSetter.current !== null) {
    //   widthConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      widthValue,
      isWidthConditionSet,
      widthConditionResult,
      widthConditionResultSetter,
      setWidthConditionResult,
      setIsWidthConditionalRequestMade,
      setWidthValue,
      setIsWidthConditionSet
    );

    // if (absolutePositionConditionResultSetter.current !== null) {
    //   absolutePositionConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      absolutePositionValue,
      isAbsolutePositionConditionSet,
      absolutePositionConditionResult,
      absolutePositionConditionResultSetter,
      setAbsolutePositionConditionResult,
      setIsAbsolutePositionConditionalRequestMade,
      setAbsolutePositionValue,
      setIsAbsolutePositionConditionSet
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

    // if (dashedStrokeConditionResultSetter.current !== null) {
    //   dashedStrokeConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      dashedStrokeValue,
      isDashedStrokeConditionSet,
      dashedStrokeConditionResult,
      dashedStrokeConditionResultSetter,
      setDashedStrokeConditionResult,
      setIsDashedStrokeConditionalRequestMade,
      setDashedStrokeValue,
      setIsDashedStrokeConditionSet
    );

    // if (strokeWidthConditionResultSetter.current !== null) {
    //   strokeWidthConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      strokeWidthValue,
      isStrokeWidthConditionSet,
      strokeWidthConditionResult,
      strokeWidthConditionResultSetter,
      setStrokeWidthConditionResult,
      setIsStrokeWidthConditionalRequestMade,
      setStrokeWidthValue,
      setIsStrokeWidthConditionSet
    );

    // if (strokeColorConditionResultSetter.current !== null) {
    //   strokeColorConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      strokeColorValue,
      isStrokeColorConditionSet,
      strokeColorConditionResult,
      strokeColorConditionResultSetter,
      setStrokeColorConditionResult,
      setIsStrokeColorConditionalRequestMade,
      setStrokeColorValue,
      setIsStrokeColorConditionSet
    );

    // if (cellDataRelationConditionResultSetter.current !== null) {
    //   cellDataRelationConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      cellDataRelationValue,
      isCellDataRelationConditionSet,
      cellDataRelationConditionResult,
      cellDataRelationConditionResultSetter,
      setCellDataRelationConditionResult,
      setIsCellDataRelationConditionalRequestMade,
      setCellDataRelationValue,
      setIsCellDataRelationConditionSet
    );

    // if (cellTextConditionResultSetter.current !== null) {
    //   cellTextConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      cellTextValue,
      isCellTextConditionSet,
      cellTextConditionResult,
      cellTextConditionResultSetter,
      setCellTextConditionResult,
      setIsCellTextConditionalRequestMade,
      setCellTextValue,
      setIsCellTextConditionSet
    );

    // if (cellVisualizationConditionResultSetter.current !== null) {
    //   cellVisualizationConditionResultSetter.current(expressions);
    // }
    handleForgeValueUpdate(
      cellVisualizationValue,
      isCellVisualizationConditionSet,
      cellVisualizationConditionResult,
      cellVisualizationConditionResultSetter,
      setCellVisualizationConditionResult,
      setIsCellVisualizationConditionalRequestMade,
      setCellVisualizationValue,
      setIsCellVisualizationConditionSet
    );

    if (relationConditionResultSetter.current !== null) {
      relationConditionResultSetter.current(expressions);
    }
  }, [expressions]);

  const evaluateForgeProps = (
    value: any,
    setValue: React.Dispatch<any>,
    resultSetter: React.MutableRefObject<
      ((expressions: Expression[]) => void) | null
    >
  ) => {
    if (value !== undefined && isForgeExpression(value)) {
      makeEvaluatorRequest(
        value.substring(1),
        datum,
        nextExpressionId,
        setValue,
        resultSetter
      );
    }
  };

  // evaluate props as forge expressions when specified by the user
  useEffect(() => {
    // if (rowsConditionResult !== undefined && isForgeExpression(rowsConditionResult)) {
    //   makeEvaluatorRequest(
    //     rowsConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setRowsConditionResult,
    //     rowsConditionResultSetter
    //   );
    // }
    evaluateForgeProps(rowsValue, setRowsValue, rowsConditionResultSetter);

    // if (columnsConditionResult !== undefined && isForgeExpression(columnsConditionResult)) {
    //   makeEvaluatorRequest(
    //     columnsConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setColumnsConditionResult,
    //     columnsConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      columnsValue,
      setColumnsValue,
      columnsConditionResultSetter
    );

    // if (heightConditionResult !== undefined && isForgeExpression(heightConditionResult)) {
    //   makeEvaluatorRequest(
    //     heightConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setHeightConditionResult,
    //     heightConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      heightValue,
      setHeightValue,
      heightConditionResultSetter
    );

    // if (widthConditionResult !== undefined && isForgeExpression(widthConditionResult)) {
    //   makeEvaluatorRequest(
    //     widthConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setWidthConditionResult,
    //     widthConditionResultSetter
    //   );
    // }
    evaluateForgeProps(widthValue, setWidthValue, widthConditionResultSetter);

    // if (absolutePositionConditionResult !== undefined && isForgeExpression(absolutePositionConditionResult)) {
    //   makeEvaluatorRequest(
    //     absolutePositionConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setAbsolutePositionConditionResult,
    //     absolutePositionConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      absolutePositionValue,
      setAbsolutePositionValue,
      absolutePositionConditionResultSetter
    );

    // if (topYConditionResult !== undefined && isForgeExpression(topYConditionResult)) {
    //   makeEvaluatorRequest(
    //     topYConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setTopYConditionResult,
    //     topYConditionResultSetter
    //   );
    // }
    evaluateForgeProps(topYValue, setTopYValue, topYConditionResultSetter);

    // if (leftXConditionResult !== undefined && isForgeExpression(leftXConditionResult)) {
    //   makeEvaluatorRequest(
    //     leftXConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setLeftXConditionResult,
    //     leftXConditionResultSetter
    //   );
    // }
    evaluateForgeProps(leftXValue, setLeftXValue, leftXConditionResultSetter);

    // if (dashedStrokeConditionResult !== undefined && isForgeExpression(dashedStrokeConditionResult)) {
    //   makeEvaluatorRequest(
    //     dashedStrokeConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setDashedStrokeConditionResult,
    //     dashedStrokeConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      dashedStrokeValue,
      setDashedStrokeValue,
      dashedStrokeConditionResultSetter
    );

    // if (strokeWidthConditionResult !== undefined && isForgeExpression(strokeWidthConditionResult)) {
    //   makeEvaluatorRequest(
    //     strokeWidthConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setStrokeWidthConditionResult,
    //     strokeWidthConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      strokeWidthValue,
      setStrokeWidthValue,
      strokeWidthConditionResultSetter
    );

    // if (strokeColorConditionResult !== undefined && isForgeExpression(strokeColorConditionResult)) {
    //   makeEvaluatorRequest(
    //     strokeColorConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setStrokeColorConditionResult,
    //     strokeColorConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      strokeColorValue,
      setStrokeColorValue,
      strokeColorConditionResultSetter
    );

    // if (cellDataRelationConditionResult !== undefined && isForgeExpression(cellDataRelationConditionResult)) {
    //   makeEvaluatorRequest(
    //     cellDataRelationConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setCellDataRelationConditionResult,
    //     cellDataRelationConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      cellDataRelationValue,
      setCellDataRelationValue,
      cellDataRelationConditionResultSetter
    );

    // if (cellTextConditionResult !== undefined && isForgeExpression(cellTextConditionResult) && !usesVar(cellTextConditionResult, 'row') && !usesVar(cellTextConditionResult, 'col')) {
    //   makeEvaluatorRequest(
    //     cellTextConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setCellTextConditionResult,
    //     cellTextConditionResultSetter
    //   );
    // }
    if (cellTextConditionResult !== undefined && isForgeExpression(cellTextConditionResult) && !usesVar(cellTextConditionResult, 'row') && !usesVar(cellTextConditionResult, 'col')) {
      evaluateForgeProps(
        cellTextValue,
        setCellTextValue,
        cellTextConditionResultSetter
      );
    }
    // evaluateForgeProps(
    //   cellTextValue,
    //   setCellTextValue,
    //   cellTextConditionResultSetter
    // );

    // if (cellVisualizationConditionResult !== undefined && isForgeExpression(cellVisualizationConditionResult) && !usesVar(cellVisualizationConditionResult, 'row') && !usesVar(cellVisualizationConditionResult, 'col')) {
    //   makeEvaluatorRequest(
    //     cellVisualizationConditionResult.substring(1),
    //     datum,
    //     nextExpressionId,
    //     setCellVisualizationConditionResult,
    //     cellVisualizationConditionResultSetter
    //   );
    // }
    evaluateForgeProps(
      cellVisualizationValue,
      setCellVisualizationValue,
      cellVisualizationConditionResultSetter
    );

    // [TODO] this is SUPER JANKY. fix this soon!
    if (
      relationConditionResult !== undefined &&
      isForgeExpression(relationConditionResult)
    ) {
      makeEvaluatorRequest(
        relationConditionResult.substring(1),
        datum,
        nextExpressionId,
        setRelationConditionResult,
        relationConditionResultSetter
      );
    }
  }, [
    rowsConditionResult,
    columnsConditionResult,
    heightConditionResult,
    widthConditionResult,
    absolutePositionConditionResult,
    topYConditionResult,
    leftXConditionResult,
    dashedStrokeConditionResult,
    strokeWidthConditionResult,
    strokeColorConditionResult,
    cellDataRelationConditionResult,
    cellTextConditionResult,
    cellVisualizationConditionResult,
    relationConditionResult,
    rowsValue,
    columnsValue,
    heightValue,
    widthValue,
    absolutePositionValue,
    topYValue,
    leftXValue,
    dashedStrokeValue,
    strokeWidthValue,
    strokeColorValue,
    cellDataRelationValue,
    cellTextValue,
    cellVisualizationValue
  ]);

  // if (rowsConditionResult === undefined || columnsConditionResult === undefined || heightConditionResult === undefined || widthConditionResult === undefined || absolutePositionConditionResult === undefined) {
  //   return <></>; // not ready to render the component yet
  // }
  // if (rowsConditionResult === "" || columnsConditionResult === "" || heightConditionResult === "" || widthConditionResult === "" || absolutePositionConditionResult === "" || cellTextConditionResult === "") {
  //   console.log('stop 1');
  //   return <></>; // not ready to render the component yet
  // }
  if (rowsValue === '' || columnsValue === '' || heightValue === '' || widthValue === '' || absolutePositionValue === '' || dashedStrokeValue === '' || strokeWidthValue === '' || strokeColorValue === '' || cellDataRelationValue === '' || cellTextValue === '' || cellVisualizationValue === '') {
    console.log('stop 1');
    return <></>; // not ready to render the component yet
  }
  // if (isForgeExpression(rowsConditionResult) || isForgeExpression(columnsConditionResult) || isForgeExpression(heightConditionResult) || isForgeExpression(widthConditionResult) || isForgeExpression(absolutePositionConditionResult) || isForgeExpression(relationConditionResult)) {
  //   console.log('stop 2');
  //   return <></>; // not ready to render the component yet
  // }
  if (
    absolutePositionConditionResult === 'true' &&
    (topYConditionResult === undefined || leftXConditionResult === undefined)
  ) {
    console.log('stop 3');
    return <></>; // not ready to render the component yet
  }
  if (
    (cellDataRelation !== undefined &&
      cellDataRelation.type === 'get-next-from-trace' &&
      relationConditionResult === undefined) ||
    relationConditionResult === ''
  ) {
    console.log('stop 4');
    console.log('cellDataRelation:', cellDataRelation);
    console.log('relationConditionResult:', relationConditionResult);
    return <></>; // not ready to render the component yet
  }
  // if (cellText && (cellTextConditionResult === undefined || (isForgeExpression(cellTextConditionResult) && !usesVar(cellTextConditionResult, 'row') && !usesVar(cellTextConditionResult, 'col')))) {
  //   console.log('stop 5');
  //   return <></>; // not ready to render the component yet
  // }
  if (
    cellText &&
    (cellTextValue === undefined ||
      (isForgeExpression(cellTextValue) &&
        !usesVar(cellTextValue, 'row') &&
        !usesVar(cellTextValue, 'col')))
  ) {
    console.log('stop 5');
    return <></>; // not ready to render the component yet
  }

  if (
    rowsValue === undefined ||
    isForgeExpression(rowsValue) ||
    columnsValue === undefined ||
    isForgeExpression(columnsValue) ||
    heightValue === undefined ||
    isForgeExpression(heightValue) ||
    widthValue === undefined ||
    isForgeExpression(widthValue) ||
    absolutePositionValue === undefined ||
    isForgeExpression(absolutePositionValue) ||
    (absolutePositionValue === 'true' &&
      (topYValue === undefined ||
        isForgeExpression(topYValue) ||
        leftXValue === undefined ||
        isForgeExpression(leftXValue))) ||
    isForgeExpression(dashedStrokeValue) ||
    isForgeExpression(strokeWidthValue) ||
    isForgeExpression(strokeColorValue) ||
    isForgeExpression(cellDataRelationValue) ||
    (isForgeExpression(cellTextValue) &&
      !usesVar(cellTextValue, 'row') &&
      !usesVar(cellTextValue, 'col')) ||
    (cellVisualization &&
      isForgeExpression(cellVisualizationValue) &&
      !usesVar(cellVisualizationValue, 'row') &&
      !usesVar(cellVisualizationValue, 'col'))
  ) {
    console.log('stop 6');
    console.log('rowsValue:', rowsValue);
    console.log('columnsValue:', columnsValue);
    console.log('heightValue:', heightValue);
    console.log('widthValue:', widthValue);
    console.log('absolutePositionValue:', absolutePositionValue);
    console.log('topYValue:', topYValue);
    console.log('leftXValue:', leftXValue);
    console.log('dashedStrokeValue:', dashedStrokeValue);
    console.log('strokeWidthValue:', strokeWidthValue);
    console.log('strokeColorValue:', strokeColorValue);
    console.log('cellDataRelationValue:', cellDataRelationValue);
    console.log('cellTextValue:', cellTextValue);
    console.log('cellVisualizationValue:', cellVisualizationValue);
    return <></>; // not ready to render the component yet
  }

  // if (isConditional(rowsValue) || isConditional(columnsValue) || isConditional(heightValue) || isConditional(widthValue) || isConditional(absolutePositionValue) || isConditional(topYValue) || isConditional(leftXValue) || isConditional(dashedStrokeValue) || isConditional(strokeWidthValue) || isConditional(strokeColorValue) || isConditional(cellDataRelationValue) || isConditional(cellTextValue) || isConditional(cellVisualizationValue)) {
  if (isConditional(rowsValue) || isConditional(columnsValue) || isConditional(heightValue) || isConditional(widthValue) || isConditional(absolutePositionValue) || isConditional(topYValue) || isConditional(leftXValue) || isConditional(dashedStrokeValue) || isConditional(strokeWidthValue) || isConditional(strokeColorValue) || isConditional(cellDataRelationValue)) {
    console.log('stop 7');
    return <></>; // not ready to render the component yet
  }

  const evaluatedCellDataRelation = cellDataRelation;
  if (
    relationConditionResult !== undefined &&
    !isForgeExpression(relationConditionResult) &&
    cellDataRelation.type === 'get-next-from-trace'
  ) {
    evaluatedCellDataRelation.relation = relationConditionResult;
  }

  console.log('going to call grid');
  console.log('cellTextValue:', cellTextValue);
  console.log('rowsValue:', rowsValue);

  // return (
  //   <Grid
  //     datum={datum}
  //     rows={Number(rowsConditionResult)}
  //     columns={Number(columnsConditionResult)}
  //     height={Number(heightConditionResult)}
  //     width={Number(widthConditionResult)}
  //     absolutePosition={absolutePositionConditionResult === 'true'}
  //     topY={topYConditionResult !== undefined ? Number(topYConditionResult) : undefined}
  //     leftX={leftXConditionResult !== undefined ? Number(leftXConditionResult) : undefined}
  //     gridStyle={{
  //       dashedStroke: dashedStrokeConditionResult === 'true',
  //       strokeWidth: strokeWidthConditionResult !== undefined ? Number(strokeWidthConditionResult) : undefined,
  //       strokeColor: strokeColorConditionResult
  //     }}
  //     // cellDataRelation={cellDataRelation}
  //     cellDataRelation={evaluatedCellDataRelation}
  //     cellText={cellTextConditionResult}
  //     cellVisualization={cellVisualizationConditionResult}
  //     parentRef={parentRef}
  //     cellGroup={cellGroup}
  //     offsetX={xOffset}
  //     offsetY={yOffset}
  //     minExprId={nextExpressionId}
  //     shouldGlow={shouldGlow}
  //     id={id}
  //   />
  // )
  return (
    <Grid
      datum={datum}
      textRenames={textRenames}
      rows={Number(rowsValue)}
      columns={Number(columnsValue)}
      height={Number(heightValue)}
      width={Number(widthValue)}
      absolutePosition={absolutePositionValue === 'true'}
      topY={topYValue !== undefined ? Number(topYValue) : undefined}
      leftX={leftXValue !== undefined ? Number(leftXValue) : undefined}
      gridStyle={{
        dashedStroke: dashedStrokeValue === 'true',
        strokeWidth:
          strokeWidthValue !== undefined ? Number(strokeWidthValue) : undefined,
        strokeColor: strokeColorValue
      }}
      // cellDataRelation={cellDataRelation}
      cellDataRelation={evaluatedCellDataRelation}
      cellText={cellTextValue}
      cellVisualization={cellVisualizationValue}
      parentRef={parentRef}
      cellGroup={cellGroup}
      offsetX={xOffset}
      offsetY={yOffset}
      minExprId={nextExpressionId}
      shouldGlow={shouldGlow}
      id={id}
    />
  );
}
