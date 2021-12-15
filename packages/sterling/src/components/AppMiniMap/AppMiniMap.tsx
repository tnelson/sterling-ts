import { MiniMap } from '@/sterling-ui';
import { Box } from '@chakra-ui/react';
// import { selectedInstancesChanged } from '../../state/data/dataSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import {
  selectSelectedInstances,
  selectTraceLength,
  selectTraceLoopBack
} from '../../state/store';

const AppMiniMap = () => {
  const dispatch = useSterlingDispatch();
  const traceLength = useSterlingSelector(selectTraceLength);
  const traceLoopBack = useSterlingSelector(selectTraceLoopBack);
  const indices = useSterlingSelector(selectSelectedInstances);

  // const onSelectedIndicesChanged = (indices: number[]) => {
  //   dispatch(selectedInstancesChanged(indices));
  // };
  return (
    <Box width='full' my='-8px'>
      {/*<MiniMap*/}
      {/*  numStates={traceLength}*/}
      {/*  loopBack={traceLoopBack}*/}
      {/*  selectedIndices={indices}*/}
      {/*  onSelectedIndicesDidChange={onSelectedIndicesChanged}*/}
      {/*/>*/}
    </Box>
  );
};

export { AppMiniMap };
