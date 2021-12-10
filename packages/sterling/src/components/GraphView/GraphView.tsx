import { View } from '@/sterling-ui';
import { GraphSVGDiv, ShapeDef } from '@graph-ts/graph-svg';
import { CSSProperties } from 'react';
import { useSterlingSelector } from '../../state/hooks';
import {
  selectSelectedGraphPaths,
  selectSelectedGraphs,
  selectSelectedGraphStyles
} from '../../state/store';

const defaultNodeShape: ShapeDef = {
  shape: 'rectangle',
  width: 120,
  height: 65
};
const defaultNodeStyle: CSSProperties = {
  fill: 'gold',
  stroke: '#333'
};

const GraphView = () => {
  const graphs = useSterlingSelector(selectSelectedGraphs);
  const paths = useSterlingSelector(selectSelectedGraphPaths);
  const styles = useSterlingSelector(selectSelectedGraphStyles);

  return (
    <View flexDir='row'>
      {graphs.map((graph, index) => {
        const style = styles[index];
        const edgePaths = paths[index];
        return (
          <GraphSVGDiv
            key={index}
            // @ts-ignore
            graph={graph}
            defaultShape={defaultNodeShape}
            defaultNodeStyle={defaultNodeStyle}
            nodeLabels={style.nodeLabels}
            edgeLabels={style.edgeLabels}
            edgeStyles={style.edgeStyles}
            edgePaths={edgePaths}
            interactions={true}
          />
        );
      })}
    </View>
  );
};

export { GraphView };
