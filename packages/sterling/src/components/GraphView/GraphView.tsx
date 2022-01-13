import { GraphGroup, GraphSVGDiv } from '@/graph-svg';
import { View } from '@/sterling-ui';
import { Matrix } from 'transformation-matrix';
import { graphSpread, graphZoomed } from '../../state/graphView/graphViewSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectActiveGraphData } from '../../state/store';

const GraphView = () => {
  const dispatch = useSterlingDispatch();
  const graphData = useSterlingSelector(selectActiveGraphData);
  return (
    <View className='grid grid-flow-col divide-x divide-dashed'>
      {/*<div className='w-full h-full grid grid-flow-col divide-x divide-dashed'>*/}
      {graphData.map((graphData, index) => {
        const { datumId, graphProps, graphMatrices } = graphData;
        const {
          id,
          graph,
          nodeShapes,
          nodeStyles,
          nodeLabels,
          edgeCurves,
          edgeLabels,
          edgeStyles
        } = graphProps;
        const { spreadMatrix, zoomMatrix } = graphMatrices;
        const onSpreadMatrix = (matrix: Matrix) => {
          dispatch(graphSpread({ id: datumId, matrix }));
        };
        const onZoomMatrix = (matrix: Matrix) => {
          dispatch(graphZoomed({ id: datumId, matrix }));
        };
        return (
          <GraphSVGDiv
            key={index}
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            spreadMatrix={spreadMatrix}
            onSpreadMatrix={onSpreadMatrix}
            zoomMatrix={zoomMatrix}
            onZoomMatrix={onZoomMatrix}
          >
            <GraphGroup
              id={id}
              graph={graph}
              nodeShapes={nodeShapes}
              nodeLabels={nodeLabels}
              nodeStyles={nodeStyles}
              edgeCurves={edgeCurves}
              edgeLabels={edgeLabels}
              edgeStyles={edgeStyles}
            />
          </GraphSVGDiv>
        );
      })}
      {/*</div>*/}
    </View>
  );
};

export { GraphView };
