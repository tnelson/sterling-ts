import { GraphGroup, GraphSVGDiv } from '@/graph-svg';
import { useCallback } from 'react';
import { Matrix } from 'transformation-matrix';
import { graphSpread, graphZoomed } from '../../state/graphView/graphViewSlice';
import { useSterlingDispatch } from '../../state/hooks';
import { ActiveGraphData } from '../../state/store';

interface GraphViewDatumProps {
  graphData: ActiveGraphData;
}

const GraphViewDatum = (props: GraphViewDatumProps) => {
  const { graphData } = props;
  const { datumId, graphProps, graphMatrices } = graphData;
  const { spreadMatrix, zoomMatrix } = graphMatrices;
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

  const dispatch = useSterlingDispatch();

  /**
   * Create callbacks for global graph interactions, ie. panning/zooming the
   * entire graph.
   */
  const onSpreadMatrix = useCallback(
    (matrix: Matrix) => {
      dispatch(graphSpread({ id: datumId, matrix }));
    },
    [datumId]
  );
  const onZoomMatrix = useCallback(
    (matrix: Matrix) => {
      dispatch(graphZoomed({ id: datumId, matrix }));
    },
    [datumId]
  );

  return (
    <GraphSVGDiv
      className='absolute inset-0'
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
};

export { GraphViewDatum };
