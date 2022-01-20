import { DatumParsed } from '@/sterling-connection';
import { useCallback } from 'react';
import { timeIndexSet } from '../../../../../state/graphs/graphsSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import {
  selectLoopbackIndex,
  selectTimeIndex,
  selectTraceLength
} from '../../../../../state/selectors';
import { Minimap } from '../../../../Minimap/Minimap';

const TimePicker = ({ datum }: { datum: DatumParsed<any> }) => {
  const dispatch = useSterlingDispatch();

  const timeIndex = useSterlingSelector((state) =>
    selectTimeIndex(state, datum.id)
  );
  const traceLength = useSterlingSelector((state) =>
    selectTraceLength(state, datum.id)
  );
  const loopBack = useSterlingSelector((state) =>
    selectLoopbackIndex(state, datum.id)
  );

  const indexSet = useCallback(
    (index: number) => {
      dispatch(
        timeIndexSet({
          datum,
          index
        })
      );
    },
    [datum]
  );

  return (
    <div className='mx-1 my-2'>
      <Minimap
        collapsed={false}
        current={timeIndex}
        length={traceLength}
        loopBack={loopBack}
        label={(index) => `State ${index + 1}/${traceLength}`}
        onChange={indexSet}
      />
    </div>
  );
};

export { TimePicker };
