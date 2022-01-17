import { GraphGroup, GraphProps, GraphSVGDiv } from '@/graph-svg';
import { DatumParsed } from '@/sterling-connection';
import { throttle } from 'lodash';
import { useCallback } from 'react';
import { Matrix } from 'transformation-matrix';
import { GraphData } from '../../statenew/graphs/graphs';
import { graphSpread, graphZoomed } from '../../statenew/graphs/graphsSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../statenew/hooks';
import { selectSpreadMatrix, selectZoomMatrix } from '../../statenew/selectors';

interface GraphViewDatumProps {
  datum: DatumParsed<any>;
  graphProps: GraphProps;
}

const GraphViewDatum = (props: GraphViewDatumProps) => {
  const { datum, graphProps } = props;
  const datumId = datum.id;
  const spreadMatrix = useSterlingSelector((state) =>
    selectSpreadMatrix(state, datumId)
  );
  const zoomMatrix = useSterlingSelector((state) =>
    selectZoomMatrix(state, datumId)
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
        dispatch(graphSpread({ datumId, matrix }));
      },
      16,
      { trailing: false }
    ),
    [datumId]
  );
  const onZoomMatrix = useCallback(
    throttle(
      (matrix: Matrix) => {
        dispatch(graphZoomed({ datumId, matrix }));
      },
      16,
      { trailing: false }
    ),
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
