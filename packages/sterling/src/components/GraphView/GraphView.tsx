import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveGraphData } from '../../state/store';
import { GraphViewDatum } from './GraphViewDatum';
import { GraphViewHeader } from './GraphViewHeader';

const GraphView = () => {
  const graphData = useSterlingSelector(selectActiveGraphData);
  return (
    <Pane className='grid grid-flow-col divide-x divide-dashed'>
      {graphData.map((graphData, index) => {
        return (
          <div key={index} className='relative'>
            <Pane>
              <PaneHeader className='border-b'>
                <GraphViewHeader graphData={graphData} />
              </PaneHeader>
              <PaneBody>
                <GraphViewDatum graphData={graphData} />
              </PaneBody>
            </Pane>
          </div>
        );
      })}
    </Pane>
  );
};

export { GraphView };
