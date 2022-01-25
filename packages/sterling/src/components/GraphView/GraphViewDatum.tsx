import { GraphGroup, GraphProps, GraphSVGDiv } from '@/graph-svg';
import { DatumParsed } from '@/sterling-connection';
import { throttle } from 'lodash';
import { useCallback } from 'react';
import { Matrix } from 'transformation-matrix';
import { graphSpread, graphZoomed } from '../../state/graphs/graphsSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectSpreadMatrix, selectZoomMatrix } from '../../state/selectors';

interface GraphViewDatumProps {
  datum: DatumParsed<any>;
  graphProps: GraphProps;
}

const GraphViewDatum = (props: GraphViewDatumProps) => {
  const { datum, graphProps } = props;
  const spreadMatrix = useSterlingSelector((state) =>
    selectSpreadMatrix(state, datum)
  );
  const zoomMatrix = useSterlingSelector((state) =>
    selectZoomMatrix(state, datum)
  );
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
    throttle(
      (matrix: Matrix) => {
        dispatch(graphSpread({ datum, matrix }));
      },
      16,
      { trailing: false }
    ),
    [datum]
  );
  const onZoomMatrix = useCallback(
    throttle(
      (matrix: Matrix) => {
        dispatch(graphZoomed({ datum, matrix }));
      },
      16,
      { trailing: false }
    ),
    [datum]
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
