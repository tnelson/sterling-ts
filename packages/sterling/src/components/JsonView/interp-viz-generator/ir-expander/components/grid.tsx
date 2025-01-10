import React, { useState, useRef, useEffect } from 'react';
import { DatumParsed, evalRequested } from '@/sterling-connection';
import Grid, { CellInput, DataRelation } from '../../components/Grid';
import { useSterlingDispatch, useSterlingSelector } from 'sterling/src/state/hooks';
import { selectEvaluatorExpressions, selectNextExpressionId } from 'sterling/src/state/selectors';
import { useLocalNextExpressionId } from '../../LocalNextExpressionIdProvider';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import { isConditional, isForgeExpression, usesVar } from '../util';

interface GridComponentProps {
  json: any;
  datum: DatumParsed<any>;
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
  const { json, dynamics, vizRow, vizCol, datum, parentRef, cellGroup, offsetX, offsetY, minExprId } = props;
  console.log('json', json);
  const { id, properties, shouldGlow } = json;
  const { rows, columns, height, width, absolutePosition, topY, leftX, gridStyle, cellDataRelation, cellText, cellVisualization } = properties;

  const xOffset = offsetX || 0;
  const yOffset = offsetY || 0;

  // [TODO] we're currently assuming that the cellDataRelation won't be a
  // conditional. We probably don't want to make that assumption so we need
  // to fix that. 

  const dispatch = useSterlingDispatch();

  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);

  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  let nextExpressionId = Math.max(expressionId, globalNextExpressionId, minExprId || 0);

  // [TODO] abstract this into a function so we don't have to retype
  // the same logic for each (potentially conditional) prop
  const [rowsConditionResult, setRowsConditionResult] = useState<undefined | string>(undefined);
  const rowsConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [columnsConditionResult, setColumnsConditionResult] = useState<undefined | string>(undefined);
  const columnsConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [heightConditionResult, setHeightConditionResult] = useState<undefined | string>(undefined);
  const heightConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [widthConditionResult, setWidthConditionResult] = useState<undefined | string>(undefined);
  const widthConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [absolutePositionConditionResult, setAbsolutePositionConditionResult] = useState<undefined | string>(undefined);
  const absolutePositionConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [topYConditionResult, setTopYConditionResult] = useState<undefined | string>(undefined);
  const topYConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [leftXConditionResult, setLeftXConditionResult] = useState<undefined | string>(undefined);
  const leftXConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [dashedStrokeConditionResult, setDashedStrokeConditionResult] = useState<undefined | string>(undefined);
  const dashedStrokeConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [strokeWidthConditionResult, setStrokeWidthConditionResult] = useState<undefined | string>(undefined);
  const strokeWidthConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [strokeColorConditionResult, setStrokeColorConditionResult] = useState<undefined | string>(undefined);
  const strokeColorConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [cellDataRelationConditionResult, setCellDataRelationConditionResult] = useState<undefined | string>(undefined);
  const cellDataRelationConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [cellTextConditionResult, setCellTextConditionResult] = useState<undefined | string>(undefined);
  const cellTextConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  const [cellVisualizationConditionResult, setCellVisualizationConditionResult] = useState<undefined | string>(undefined);
  const cellVisualizationConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);
  // for a potential relation value in the cellDataRelation field
  const [relationConditionResult, setRelationConditionResult] = useState<undefined | string>(undefined);
  const relationConditionResultSetter = useRef<null | ((expressions: Expression[]) => void)>(null);

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
    if (isConditional(rows)) {
      makeEvaluatorRequest(rows.condition.substring(1), datum, nextExpressionId, setRowsConditionResult, rowsConditionResultSetter);
    } else {
      setRowsConditionResult(rows);
    }

    if (isConditional(columns)) {
      makeEvaluatorRequest(columns.condition.substring(1), datum, nextExpressionId, setColumnsConditionResult, columnsConditionResultSetter);
    } else {
      setColumnsConditionResult(columns);
    }

    if (isConditional(height)) {
      makeEvaluatorRequest(height.condition.substring(1), datum, nextExpressionId, setHeightConditionResult, heightConditionResultSetter);
    } else {
      setHeightConditionResult(height);
    }

    if (isConditional(width)) {
      makeEvaluatorRequest(width.condition.substring(1), datum, nextExpressionId, setWidthConditionResult, widthConditionResultSetter);
    } else {
      setWidthConditionResult(width);
    }

    if (isConditional(absolutePosition)) {
      makeEvaluatorRequest(absolutePosition.condition.substring(1), datum, nextExpressionId, setAbsolutePositionConditionResult, absolutePositionConditionResultSetter);
    } else {
      setAbsolutePositionConditionResult(absolutePosition);
    }

    if (isConditional(topY)) {
      makeEvaluatorRequest(topY.condition.substring(1), datum, nextExpressionId, setTopYConditionResult, topYConditionResultSetter);
    } else {
      setTopYConditionResult(topY);
    }

    if (isConditional(leftX)) {
      makeEvaluatorRequest(leftX.condition.substring(1), datum, nextExpressionId, setLeftXConditionResult, leftXConditionResultSetter);
    } else {
      setLeftXConditionResult(leftX);
    }
    
    const dashedStroke = gridStyle && gridStyle.dashedStroke ? gridStyle.dashedStroke : undefined;
    if (isConditional(dashedStroke)) {
      makeEvaluatorRequest(dashedStroke.condition.substring(1), datum, nextExpressionId, setDashedStrokeConditionResult, dashedStrokeConditionResultSetter);
    } else {
      setDashedStrokeConditionResult(dashedStroke);
    }

    const strokeWidth = gridStyle && gridStyle.strokeWidth ? gridStyle.strokeWidth : undefined;
    if (isConditional(strokeWidth)) {
      makeEvaluatorRequest(strokeWidth.condition.substring(1), datum, nextExpressionId, setStrokeWidthConditionResult, strokeWidthConditionResultSetter);
    } else {
      setStrokeWidthConditionResult(strokeWidth);
    }

    const strokeColor = gridStyle && gridStyle.strokeColor ? gridStyle.strokeColor : undefined;
    if (isConditional(strokeColor)) {
      makeEvaluatorRequest(strokeColor.condition.substring(1), datum, nextExpressionId, setStrokeColorConditionResult, strokeColorConditionResultSetter);
    } else {
      setStrokeColorConditionResult(strokeColor);
    }

    if (isConditional(cellDataRelation)) {
      makeEvaluatorRequest(cellDataRelation.condition.substring(1), datum, nextExpressionId, setCellDataRelationConditionResult, cellDataRelationConditionResultSetter);
    } else {
      setCellDataRelationConditionResult(cellDataRelation);
    }

    if (isConditional(cellText) && !usesVar(cellText.condition, 'row') && !usesVar(cellText.condition, 'col')) {
      makeEvaluatorRequest(cellText.condition.substring(1), datum, nextExpressionId, setCellTextConditionResult, cellTextConditionResultSetter);
    } else {
      setCellTextConditionResult(cellText);
    }

    if (isConditional(cellVisualization) && !usesVar(cellVisualization.condition, 'row') && !usesVar(cellVisualization.condition, 'col')) {
      makeEvaluatorRequest(cellVisualization.condition.substring(1), datum, nextExpressionId, setCellVisualizationConditionResult, cellVisualizationConditionResultSetter);
    } else {
      setCellVisualizationConditionResult(cellVisualization);
    }

    // [TODO] this is SUPER JANKY. fix this soon! 
    if (cellDataRelation !== undefined && cellDataRelation.type === 'get-next-from-trace' && cellDataRelation.relation !== undefined) {
      setRelationConditionResult(cellDataRelation.relation);
    }
  }, []);

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator
  useEffect(() => {
    if (rowsConditionResultSetter.current !== null) {
      rowsConditionResultSetter.current(expressions);
    }
    if (columnsConditionResultSetter.current !== null) {
      columnsConditionResultSetter.current(expressions);
    }
    if (heightConditionResultSetter.current !== null) {
      heightConditionResultSetter.current(expressions);
    }
    if (widthConditionResultSetter.current !== null) {
      widthConditionResultSetter.current(expressions);
    }
    if (absolutePositionConditionResultSetter.current !== null) {
      absolutePositionConditionResultSetter.current(expressions);
    }
    if (topYConditionResultSetter.current !== null) {
      topYConditionResultSetter.current(expressions);
    }
    if (leftXConditionResultSetter.current !== null) {
      leftXConditionResultSetter.current(expressions);
    }
    if (dashedStrokeConditionResultSetter.current !== null) {
      dashedStrokeConditionResultSetter.current(expressions);
    }
    if (strokeWidthConditionResultSetter.current !== null) {
      strokeWidthConditionResultSetter.current(expressions);
    }
    if (strokeColorConditionResultSetter.current !== null) {
      strokeColorConditionResultSetter.current(expressions);
    }
    if (cellDataRelationConditionResultSetter.current !== null) {
      cellDataRelationConditionResultSetter.current(expressions);
    }
    if (cellTextConditionResultSetter.current !== null) {
      cellTextConditionResultSetter.current(expressions);
    }
    if (cellVisualizationConditionResultSetter.current !== null) {
      cellVisualizationConditionResultSetter.current(expressions);
    }
    if (relationConditionResultSetter.current !== null) {
      relationConditionResultSetter.current(expressions);
    }
  }, [expressions]);

  // evaluate props as forge expressions when specified by the user
  useEffect(() => {
    if (rowsConditionResult !== undefined && isForgeExpression(rowsConditionResult)) {
      makeEvaluatorRequest(
        rowsConditionResult.substring(1),
        datum,
        nextExpressionId,
        setRowsConditionResult,
        rowsConditionResultSetter
      );
    }
    if (columnsConditionResult !== undefined && isForgeExpression(columnsConditionResult)) {
      makeEvaluatorRequest(
        columnsConditionResult.substring(1),
        datum,
        nextExpressionId,
        setColumnsConditionResult,
        columnsConditionResultSetter
      );
    }
    if (heightConditionResult !== undefined && isForgeExpression(heightConditionResult)) {
      makeEvaluatorRequest(
        heightConditionResult.substring(1),
        datum,
        nextExpressionId,
        setHeightConditionResult,
        heightConditionResultSetter
      );
    }
    if (widthConditionResult !== undefined && isForgeExpression(widthConditionResult)) {
      makeEvaluatorRequest(
        widthConditionResult.substring(1),
        datum,
        nextExpressionId,
        setWidthConditionResult,
        widthConditionResultSetter
      );
    }
    if (absolutePositionConditionResult !== undefined && isForgeExpression(absolutePositionConditionResult)) {
      makeEvaluatorRequest(
        absolutePositionConditionResult.substring(1),
        datum,
        nextExpressionId,
        setAbsolutePositionConditionResult,
        absolutePositionConditionResultSetter
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
    if (dashedStrokeConditionResult !== undefined && isForgeExpression(dashedStrokeConditionResult)) {
      makeEvaluatorRequest(
        dashedStrokeConditionResult.substring(1),
        datum,
        nextExpressionId,
        setDashedStrokeConditionResult,
        dashedStrokeConditionResultSetter
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
    if (cellDataRelationConditionResult !== undefined && isForgeExpression(cellDataRelationConditionResult)) {
      makeEvaluatorRequest(
        cellDataRelationConditionResult.substring(1),
        datum,
        nextExpressionId,
        setCellDataRelationConditionResult,
        cellDataRelationConditionResultSetter
      );
    }
    if (cellTextConditionResult !== undefined && isForgeExpression(cellTextConditionResult) && !usesVar(cellTextConditionResult, 'row') && !usesVar(cellTextConditionResult, 'col')) {
      makeEvaluatorRequest(
        cellTextConditionResult.substring(1),
        datum,
        nextExpressionId,
        setCellTextConditionResult,
        cellTextConditionResultSetter
      );
    }
    if (cellVisualizationConditionResult !== undefined && isForgeExpression(cellVisualizationConditionResult) && !usesVar(cellVisualizationConditionResult, 'row') && !usesVar(cellVisualizationConditionResult, 'col')) {
      makeEvaluatorRequest(
        cellVisualizationConditionResult.substring(1),
        datum,
        nextExpressionId,
        setCellVisualizationConditionResult,
        cellVisualizationConditionResultSetter
      );
    }

    // [TODO] this is SUPER JANKY. fix this soon!
    if (relationConditionResult !== undefined && isForgeExpression(relationConditionResult)) {
      makeEvaluatorRequest(
        relationConditionResult.substring(1),
        datum,
        nextExpressionId,
        setRelationConditionResult,
        relationConditionResultSetter
      );
    }
  }, [rowsConditionResult, columnsConditionResult, heightConditionResult, widthConditionResult, absolutePositionConditionResult, topYConditionResult, leftXConditionResult, dashedStrokeConditionResult, strokeWidthConditionResult, strokeColorConditionResult, cellDataRelationConditionResult, cellTextConditionResult, cellVisualizationConditionResult, relationConditionResult]);

  if (rowsConditionResult === undefined || columnsConditionResult === undefined || heightConditionResult === undefined || widthConditionResult === undefined || absolutePositionConditionResult === undefined) {
    return <></>; // not ready to render the component yet
  }
  if (rowsConditionResult === "" || columnsConditionResult === "" || heightConditionResult === "" || widthConditionResult === "" || absolutePositionConditionResult === "" || cellTextConditionResult === "") {
    return <></>; // not ready to render the component yet
  }
  if (isForgeExpression(rowsConditionResult) || isForgeExpression(columnsConditionResult) || isForgeExpression(heightConditionResult) || isForgeExpression(widthConditionResult) || isForgeExpression(absolutePositionConditionResult) || isForgeExpression(relationConditionResult)) {
    return <></>; // not ready to render the component yet
  }
  if (absolutePositionConditionResult === 'true' && (topYConditionResult === undefined || leftXConditionResult === undefined)) {
    return <></>; // not ready to render the component yet
  }
  if (cellDataRelation !== undefined && cellDataRelation.type === 'get-next-from-trace' && relationConditionResult === undefined || relationConditionResult === "") {
    return <></>; // not ready to render the component yet
  }
  if (cellText && (cellTextConditionResult === undefined || (isForgeExpression(cellTextConditionResult) && !usesVar(cellTextConditionResult, 'row') && !usesVar(cellTextConditionResult, 'col')))) {
    return <></>; // not ready to render the component yet
  }

  const evaluatedCellDataRelation = cellDataRelation;
  if (relationConditionResult !== undefined && !isForgeExpression(relationConditionResult) && cellDataRelation.type === 'get-next-from-trace') {
    evaluatedCellDataRelation.relation = relationConditionResult;
  }

  return (
    <Grid
      datum={datum}
      rows={Number(rowsConditionResult)}
      columns={Number(columnsConditionResult)}
      height={Number(heightConditionResult)}
      width={Number(widthConditionResult)}
      absolutePosition={absolutePositionConditionResult === 'true'}
      topY={topYConditionResult !== undefined ? Number(topYConditionResult) : undefined}
      leftX={leftXConditionResult !== undefined ? Number(leftXConditionResult) : undefined}
      gridStyle={{
        dashedStroke: dashedStrokeConditionResult === 'true',
        strokeWidth: strokeWidthConditionResult !== undefined ? Number(strokeWidthConditionResult) : undefined,
        strokeColor: strokeColorConditionResult
      }}
      // cellDataRelation={cellDataRelation}
      cellDataRelation={evaluatedCellDataRelation}
      cellText={cellTextConditionResult}
      cellVisualization={cellVisualizationConditionResult}
      parentRef={parentRef}
      cellGroup={cellGroup}
      offsetX={xOffset}
      offsetY={yOffset}
      minExprId={nextExpressionId}
      shouldGlow={shouldGlow}
      id={id}
    />
  )
}