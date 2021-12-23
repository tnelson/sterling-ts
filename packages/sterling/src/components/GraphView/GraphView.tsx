import { GraphGroup, GraphSVGDiv } from '@/graph-svg';
import { View } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveGraphStates } from '../../state/store';

const GraphView = () => {
  const graphStates = useSterlingSelector(selectActiveGraphStates);
  return (
    <View>
      {graphStates.map((graphState) => {
        const {
          id,
          graph,
          nodeShapes,
          nodeStyles,
          nodeLabels,
          edgeCurves,
          edgeLabels,
          edgeStyles
        } = graphState;
        return (
          <GraphSVGDiv
            key={id}
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
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
    </View>
  );
};

export { GraphView };
