import { GraphProps } from '@/graph-svg';
import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useSterlingSelector } from '../../statenew/hooks';
import {
  selectActiveDatum,
  selectActiveGraphData
} from '../../statenew/selectors';
import { GraphViewDatum } from './GraphViewDatum';
import { GraphViewHeader } from './GraphViewHeader';

const GraphView = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const graphProps: GraphProps[] = useSterlingSelector(selectActiveGraphData);

  return (
    <Pane className='grid grid-flow-col divide-x divide-dashed'>
      {activeDatum &&
        graphProps.map((props, index) => {
          return (
            <div key={index} className='relative'>
              <Pane>
                <PaneHeader className='border-b'>
                  <GraphViewHeader datum={activeDatum} />
                </PaneHeader>
                <PaneBody>
                  <GraphViewDatum datum={activeDatum} graphProps={props} />
                </PaneBody>
              </Pane>
            </div>
          );
        })}
    </Pane>
  );
};

export { GraphView };
