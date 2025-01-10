import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { AlloyAtom } from 'sterling/src/components/ScriptView/alloy-proxy';
import { useSterlingDispatch, useSterlingSelector } from 'sterling/src/state/hooks';
import { selectEvaluatorExpressions, selectNextExpressionId } from 'sterling/src/state/selectors';
import { useLocalNextExpressionId } from '../LocalNextExpressionIdProvider';
import { DatumParsed, evalRequested } from '@/sterling-connection';
import { Expression } from 'sterling/src/state/evaluator/evaluator';
import { isConditional, isForgeExpression, usesVar } from '../ir-expander/util';
import { SingleComponent } from '../ir-expander/ir-expander';
import { ConditionalComponent } from '../ir-expander/conditional/conditional';
import { TextComponent } from '../ir-expander/components/text';
import { GridComponent } from '../ir-expander/components/grid';

export type GridIndex = { row: number; col: number; type: 'grid-index' };
// export type InstanceAtom = { name: string; type: 'sig-element' };

// [TODO] ask Tim -- how to define the CellInput type here?
// is the type to represents sigs just `AlloyAtom` (from the alloy proxy)?
// export type CellInput = GridIndex | AlloyAtom;
export type CellInput = GridIndex | any; // InstanceAtom;

export type GetNextFromTrace = {
  type: 'get-next-from-trace';
  // domain: Array<any>;
  relation: string;
};
export type GetValueFromGridCell = {
  type: 'get-value-from-grid-cell';
  // grid: Array<Array<any | null>>;
};
export type DataRelation = GetNextFromTrace | GetValueFromGridCell;

function getOrderedTrace(traceData: string): Array<string> {
  console.log('traceData', traceData);
  // return ["Board0", "Board1", "Board2", "Board3", "Board4", "Board5", "Board6"];
  // Parse the string into pairs
  const pairs = traceData.slice(1, -1)
    .match(/\(([^)]+)\)/g) // Extract all tuples
    ?.map(tuple => tuple.slice(1, -1).split(" ")) || []; // Split each tuple into two parts

  // Create a map to store adjacency relationships
  const adjacencyMap = new Map<string, string>();
  const inDegree = new Map<string, number>();

  // Populate adjacency map and in-degree map
  pairs.forEach(([from, to]) => {
    adjacencyMap.set(from, to);
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
    if (!inDegree.has(from)) {
        inDegree.set(from, 0);
    }
  });

  // Find the starting node (in-degree of 0)
  let start = "";
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) {
        start = node;
        break;
    }
  }

  // Construct the linear order
  const result: string[] = [];
  let current = start;
  while (current) {
    result.push(current);
    current = adjacencyMap.get(current) || "";
  }

  return result;
}

interface GridStyle {
  dashedStroke?: boolean;
  strokeWidth?: number;
  strokeColor?: string;
}

export interface GridProps {
  datum: DatumParsed<any>;
  rows: number;
  columns: number;
  height: number;
  width: number;
  absolutePosition: boolean;
  topY?: number; // required if absolutePosition is true
  leftX?: number; // required if absolutePosition is true
  gridStyle?: GridStyle;

  // cellDataRelation: DataRelation;
  // [TODO] add props for all the nested/triggered viz funcs here
  // cellText?: (curr: CellInput) => string;
  cellText?: string | any;
  cellVisualization?: any;
  cellDataRelation?: DataRelation;
  parentRef?: React.MutableRefObject<SVGSVGElement | null>;
  cellGroup?: d3.Selection<SVGGElement, unknown, null, undefined>;
  offsetX?: number;
  offsetY?: number;
  minExprId?: number;
  shouldGlow: boolean;
  id: string;
}

export default function Grid(props: GridProps) {
  console.log('inside Grid');
  const dashedStroke = props.gridStyle && props.gridStyle.dashedStroke ? props.gridStyle.dashedStroke : false;
  const strokeWidth = props.gridStyle && props.gridStyle.strokeWidth ? props.gridStyle.strokeWidth : 2;
  const strokeColor = props.gridStyle && props.gridStyle.strokeColor ? props.gridStyle.strokeColor : 'black';

  const { datum, rows, columns, height, width, absolutePosition, topY, leftX, gridStyle, cellText, cellVisualization, cellDataRelation, parentRef, cellGroup, offsetX, offsetY, minExprId, shouldGlow } = props;
  const xOffset = offsetX || 0;
  const yOffset = offsetY || 0;

  const svgRef = parentRef || useRef<SVGSVGElement | null>(null);
  // [NOTE] we're currently assuming that the cellDataRelation can't be a conditional,
  // but that isn't necessarily what we want. update this to support the cellDataRelation
  // potentially being a conditional value as well. 
  
  // let consideredEval = false;
  const [consideredEval, setConsideredEval] = useState(false);
  const toEvaluateCellText = cellText !== undefined && (isConditional(cellText) || usesVar(cellText, 'row') || usesVar(cellText, 'col'));
  const [cellTextForgeEvals, setState] = useState<(string | undefined)[]>(() => Array(toEvaluateCellText ? rows * columns : 0).fill(undefined));
  const updateState = (idx: number, value: string) => {
    setState((prev) => prev.map((val, i) => i === idx ? value : val));
  }
  const cellTextForgeEvalsResultSetters = useRef<(null | ((expressions: Expression[]) => void))[]>(Array(toEvaluateCellText ? rows * columns : 0).fill(null));

  const allValsPresent = cellTextForgeEvals.every((val) => val !== undefined);
  const isReadyToRender = consideredEval && ((!toEvaluateCellText) || cellTextForgeEvals.every((val) => (val !== undefined) && (val !== '') && (!isForgeExpression(val))));
  console.log('isReadyToRender', isReadyToRender);

  if (cellVisualization !== undefined && cellDataRelation === undefined) {
    throw new Error('cellVisualization requires cellDataRelation to be defined');
  }
  // const toEvaluateCellVisualization = cellVisualization !== undefined && cellDataRelation !== undefined && 
  //                                       (isConditional(cellVisualization) || 
  //                                       (cellDataRelation.type === 'get-next-from-trace' && usesVar(JSON.stringify(cellVisualization), 'x')) || 
  //                                       (cellDataRelation.type === 'get-value-from-grid-cell' && usesVar(JSON.stringify(cellVisualization), 'row') || usesVar(JSON.stringify(cellVisualization), 'col')));
  const toEvaluateCellVisualization = cellVisualization !== undefined && cellDataRelation !== undefined;
  const [cellVisualizations, setCellVisualizations] = useState<Array<JSX.Element | undefined>>(() => Array(toEvaluateCellVisualization ? rows * columns : 0).fill(undefined));
  const updateVisualizations = (idx: number, value: JSX.Element) => {
    setCellVisualizations((prev) => prev.map((val, i) => i === idx ? value : val));
  }
  const isCellVizReadyToRender = consideredEval && ((!toEvaluateCellVisualization) || cellVisualizations.every((val) => val !== undefined));
  console.log('to evaluate cell viz', toEvaluateCellVisualization);
  console.log('isCellVizReadyToRender', isCellVizReadyToRender);

  // if absolutePosition is true, topY and leftX must be provided
  if (absolutePosition && (topY === undefined || leftX === undefined)) {
    throw new Error('topY and leftX are required if absolutePosition is true');
  }

  const dispatch = useSterlingDispatch();
  const globalNextExpressionId = useSterlingSelector(selectNextExpressionId);
  const { expressionId, setExpressionId } = useLocalNextExpressionId();
  let nextExpressionId = Math.max(expressionId, globalNextExpressionId, minExprId || 0);

  function makeEvaluatorRequest(
    query: string,
    datum: DatumParsed<any>, 
    expressionId: number, 
    idx: number,
    setConditionResult: (idx: number, value: string) => void, 
    setResult: React.MutableRefObject<(((expressions: Expression[]) => void) | null)[]>
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

    if (setResult.current[idx] === null) {
      const resultSetter = (expressions: Expression[]) => {
        const result = expressions.find(
          (expression: Expression) => { console.log('found!', expression.result); return expression.id === `${expressionId}`}
        );
        if (result !== undefined) {
          setConditionResult(idx, result.result);
        }

        for (let i = 0; i < cellTextForgeEvals.length; i++) {
          console.log('cellTextForgeEvals[i]', cellTextForgeEvals[i]);
        }
      };

      setResult.current[idx] = resultSetter;
    }
  }

  const expressions = useSterlingSelector((state) => 
    selectEvaluatorExpressions(state, datum)
  );

  const orderedTrace = cellDataRelation !== undefined && cellDataRelation.type === 'get-next-from-trace' ? getOrderedTrace(cellDataRelation.relation) : [];
  console.log('orderedTrace:', orderedTrace);

  const cellHeight = height / rows;
  const cellWidth = width / columns;

  // make initial requests to evaluate conditional expressions for props 
  useEffect(() => {
    if (toEvaluateCellText && !isReadyToRender) {
      console.log('inside 1 useEffect')
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          // [TODO] need to make this replacement more robust (ex: what if there is ${row + 1})
          const cellTextQuery = cellText.replace('${row}', `${row}`).replace('${col}', `${col}`);
          console.log('cellTextQuery', cellTextQuery);
          if (isConditional(cellTextQuery)) {
            makeEvaluatorRequest(cellTextQuery.condition.substring(1), datum, nextExpressionId, row * columns + col, updateState, cellTextForgeEvalsResultSetters);
          } else {
            console.log('came into else 1');
            updateState(row * columns + col, cellTextQuery);
          }
        }
      }
    }

    if (toEvaluateCellVisualization && !isCellVizReadyToRender) {
      if (cellDataRelation.type !== undefined && cellDataRelation.type === 'get-next-from-trace') {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            // [TODO] replace with the correct value here by constructing the ordered trace 
            const cellVizJson = JSON.parse(JSON.stringify(cellVisualization).replaceAll('${x}', `${row * columns + col}`));
            // [TODO] fill this in once we fix support for conditionals over here 
          }
        }
      } else if (cellDataRelation.type === 'get-value-from-grid-cell') {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const cellVizJson = JSON.parse(JSON.stringify(cellVisualization).replaceAll('${row}', `${row}`).replaceAll('${col}', `${col}`));
            // [TODO] fill this in once we fix support for conditionals over here 
          }
        }
      }
    }
  }, []);

  // update stateful variable values when results are obtained after evaluation
  // using the Forge evaluator 
  useEffect(() => {
    // if (toEvaluateCellText && cellTextForgeEvalsResultSetter.current !== null) {
    //   cellTextForgeEvalsResultSetter.current(expressions);
    // }
    if (toEvaluateCellText && !isReadyToRender) {
      console.log('inside 2 useEffect')
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (cellTextForgeEvalsResultSetters.current[row * columns + col] !== null) {
            console.log('calling');
            cellTextForgeEvalsResultSetters.current[row * columns + col]!(expressions);
          }
        }
      }
    }

    if (toEvaluateCellVisualization && !isReadyToRender && cellDataRelation !== undefined) {
      // [TODO]
    }
  }, [expressions]);

  // evaluate props as forge expressions when specified by the user
  useEffect(() => {
    // consideredEval = true;
    setConsideredEval(true);
    if (toEvaluateCellText && !isReadyToRender) {
      console.log('inside 3 useEffect');
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          // [TODO] need to make this replacement more robust (ex: what if there is ${row + 1})
          const cellTextQuery = cellText.replace('${row}', `${row}`).replace('${col}', `${col}`);
          console.log('cellTextQuery', cellTextQuery);
          console.log('cellTextForgeEvals[row * columns + col]', cellTextForgeEvals[row * columns + col]);

          if (cellTextForgeEvals[row * columns + col] !== undefined && isForgeExpression(cellTextForgeEvals[row * columns + col])) {
            console.log('making request');
            makeEvaluatorRequest(
              cellTextQuery.substring(1),
              datum,
              nextExpressionId,
              row * columns + col,
              updateState,
              cellTextForgeEvalsResultSetters
            );
          } else if (cellTextForgeEvals !== undefined) {
            console.log('not making request');
            // updateState(row * columns + col, cellTextQuery);
          }
        }
      }
    }
  }, [allValsPresent, isReadyToRender]);

  useEffect(() => {
    if (!svgRef.current) return;
    if (isReadyToRender) {
      console.log("inside useEffect 4");
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // remove previous render

      const gridGroup = svg.append('g');
      // let gridGroup;
      // if (!cellGroup) {
      //   const svg = d3.select(svgRef.current);
      //   svg.selectAll('*').remove(); // remove previous render

      //   gridGroup = svg.append('g');
      // } else {
      //   gridGroup = cellGroup;
      // }

      for (let row = 0; row < rows; row++) {
        console.log('row:', row);
        for (let col = 0; col < columns; col++) {
          console.log('col:', col);
          console.log('cellText', toEvaluateCellText ? cellTextForgeEvals[row * columns + col] : cellText);
          const cellGroup = gridGroup
            .append('g')
            .attr(
              'transform',
              `translate(${col * cellWidth}, ${row * cellHeight})`
            );

          cellGroup
            .append('rect')
            .attr('width', cellWidth)
            .attr('height', cellHeight)
            .attr('stroke-width', strokeWidth)
            .attr('stroke', strokeColor)
            .attr('fill', 'transparent'); // [NOTE] we could let the user choose the fill color

          if (dashedStroke) cellGroup.attr('stroke-dasharray', '5,5');

          let dataInput: CellInput;
          // if (cellDataRelation.type === 'get-next-from-trace') {
          //   // dataInput = cellDataRelation.domain[row * columns + col];
          // } else {
          //   dataInput = { type: 'grid-index', row, col };
          // }

          if (cellText) {
            cellGroup
              .append('text')
              .attr('x', cellWidth / 2)
              .attr('y', cellHeight / 2)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .attr('font-size', Math.min(cellWidth, cellHeight) / 3) // [NOTE] we could let the user choose the font size
              .text(toEvaluateCellText ? cellTextForgeEvals[row * columns + col]! : cellText);
          }


          if (toEvaluateCellVisualization && !isCellVizReadyToRender && cellDataRelation !== undefined) {
            let cellVizJson;
            // [TODO] variable replacement here needs to be more nuanced than it is right now!
            if (cellDataRelation.type === 'get-next-from-trace') {
              // [TODO] URGENT!!! replace by the correct value here after getting the ordered trace from the relation
              cellVizJson = JSON.parse(JSON.stringify(cellVisualization).replaceAll('${x}', `${orderedTrace[row * columns + col]}`));
              // [TODO] URGENT!!! this next if block with replacements is super JANKY. 
              // move replacements into components themselves using args so that we can
              // do this in a cleaner way, and with less janky stuff like this. 
              // it should also help us prevent issues of shadowed variables and replacing
              // with invalid values from outer scopes prematurely. 
              if (cellVizJson.type === 'grid') {
                cellVizJson.properties.rows = `${cellVizJson.properties.rows}`.replaceAll('${row}', `${row}`).replaceAll('${col}', `${col}`);
                cellVizJson.properties.columns = `${cellVizJson.properties.columns}`.replaceAll('${row}', `${row}`).replaceAll('${col}', `${col}`);
              }
              console.log('created cellVizJson', cellVizJson);
            } else if (cellDataRelation.type === 'get-value-from-grid-cell') {
              cellVizJson = JSON.parse(JSON.stringify(cellVisualization).replaceAll('${row}', `${row}`).replaceAll('${col}', `${col}`));
            }
            let component: JSX.Element;
              switch (cellVizJson.type) {
                // [TODO] add support for things other than nested grids
                case 'grid':
                  console.log('about to make call for nested grid');
                  console.log('cellVizJson', cellVizJson);
                  // component = <GridComponent json={cellVizJson} datum={datum} dynamics={{}} vizRow={row} vizCol={col} parentRef={svgRef} cellGroup={gridGroup} />;
                  
                  // THE HANDLING OF THE minExprId is VERY JANKY. SPEAK TO TIM ABOUT THIS TO SEE
                  // IF WE CAN THINK OF A WAY TO FIX THIS! 
                  component = <GridComponent json={cellVizJson} datum={datum} dynamics={{}} vizRow={row} vizCol={col} offsetX={xOffset + (col * cellWidth)} offsetY={yOffset + (row * cellHeight)} minExprId={nextExpressionId + ((row * columns + col) * 1000)} />;
                  console.log('nested call done');
                  break;
                default:
                  component = <></>;
              }
            updateVisualizations(row * columns + col, component);
          }
        }
      }
    }
  }, [
    // rows,
    // columns,
    // height,
    // width,
    // absolutePosition,
    // topY,
    // leftX,
    // dashedStroke,
    // strokeWidth,
    isReadyToRender,
    allValsPresent
  ]);

  if (!isReadyToRender) {
    return <></>; // not ready to render yet! 
  }

  if (cellGroup) {
    return <></>; // already rendered within parent component's svg element
  }

  if (absolutePosition) {
    return (
      <div>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: topY! + yOffset,
            left: leftX! + xOffset,
            boxShadow: props.shouldGlow
          ? "inset 0 0 8px rgba(253, 224, 71, 0.8), inset 0 0 16px rgba(253, 224, 71, 0.6)"
          : "none"
          }}
          className={`${props.shouldGlow ? "bg-yellow-100 animate-pulse" : ""}`}
          id={props.id}
        />

        {cellVisualizations.map((viz) => viz)}
      </div>
    )
  }

  return (
    <div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: yOffset,
          left: xOffset,
          boxShadow: props.shouldGlow
          ? "inset 0 0 8px rgba(253, 224, 71, 0.8), inset 0 0 16px rgba(253, 224, 71, 0.6)"
          : "none"
        }}
        className={`${props.shouldGlow ? "bg-yellow-100 animate-pulse" : ""}`}
        id={props.id}
      />

      {cellVisualizations.map((viz) => viz)}
    </div>
  )
}
