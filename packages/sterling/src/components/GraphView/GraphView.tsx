import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveDatum, selectGraphProps } from '../../state/selectors';
import { GraphViewDatum } from './GraphViewDatum';
import { GraphViewHeader } from './GraphViewHeader';

const GraphView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  const props = datum
    ? useSterlingSelector((state) => selectGraphProps(state, datum))
    : [];

  return (
    <Pane className='grid grid-flow-col divide-x divide-dashed'>
      {datum &&
        props.map((props, index) => {
          return (
            <div key={index} className='relative'>
              <Pane>
                <PaneHeader className='border-b'>
                  <GraphViewHeader datum={datum} />
                </PaneHeader>
                <PaneBody>
                  <GraphViewDatum datum={datum} graphProps={props} />
                </PaneBody>
              </Pane>
            </div>
          );
        })}
    </Pane>
  );
};

export { GraphView };
