import { GraphGroup } from '@/graph-svg';
import { MinimapProps } from './Minimap';
import {
  edgeCurves,
  edgeStyles,
  generateMinimapGraph,
  graphHeight,
  graphWidth,
  nodeLabels,
  nodeShapes,
  nodeStyles
} from './graph';

const MinimapGraph = (props: MinimapProps) => {
  const width = graphWidth(props);
  const height = graphHeight(props);
  const graph = generateMinimapGraph(props);
  const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;
  return (
    <div className='grid place-items-center overflow-y-auto'>
      <svg
        style={{ minWidth: width }}
        width={width}
        height={height}
        viewBox={viewBox}
      >
        <GraphGroup
          id='minimap'
          graph={graph}
          nodeShapes={nodeShapes(graph)}
          nodeStyles={nodeStyles(graph, props.current)}
          nodeLabels={nodeLabels(graph, props.current)}
          edgeCurves={edgeCurves(graph)}
          edgeStyles={edgeStyles(graph)}
          onClickNode={(nodeId: string) => {
            if (props.onChange) props.onChange(+nodeId);
          }}
        />
      </svg>
    </div>
  );
};

export { MinimapGraph };
