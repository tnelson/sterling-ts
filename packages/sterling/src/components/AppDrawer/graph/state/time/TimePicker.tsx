import { DatumParsed } from '@/sterling-connection';
import { ButtonGroup, Center, IconButton } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiUndo
} from 'react-icons/bi';
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

  const canLoopBack = loopBack !== undefined && timeIndex === traceLength - 1;

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
    <div className='p-2 flex items-center'>
      <ButtonGroup width='full' isAttached size='sm'>
        <IconButton
          aria-label='First State'
          icon={<BiArrowToLeft />}
          disabled={timeIndex === 0}
          onClick={() => indexSet(0)}
        />
        <IconButton
          aria-label='Previous State'
          borderRadius={0}
          icon={<BiLeftArrowAlt />}
          disabled={timeIndex === 0}
          onClick={() => indexSet(timeIndex - 1)}
        />
        <Center width='full' px={2} fontSize='xs' bg='gray.100'>
          State {timeIndex + 1}/{traceLength}
        </Center>
        {canLoopBack ? (
          <IconButton
            aria-label='Loop Back'
            borderRadius={0}
            icon={<BiUndo />}
            onClick={() => indexSet(loopBack)}
          />
        ) : (
          <IconButton
            aria-label='First State'
            borderRadius={0}
            icon={<BiRightArrowAlt />}
            disabled={timeIndex === traceLength - 1}
            onClick={() => indexSet(timeIndex + 1)}
          />
        )}
        <IconButton
          aria-label='Previous State'
          icon={<BiArrowToRight />}
          disabled={timeIndex === traceLength - 1}
          onClick={() => indexSet(traceLength - 1)}
        />
      </ButtonGroup>
    </div>
  );
};

export { TimePicker };
