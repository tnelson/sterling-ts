import { StatusBar } from '@/sterling-ui';
import { Divider, Spacer } from '@chakra-ui/react';
import { dumpClicked } from '../../state/data/dataSlice';
import { useSterlingDispatch } from '../../state/hooks';
import { ConnectionStatus } from './ConnectionStatus';

const AppStatusBar = () => {
  const dispatch = useSterlingDispatch();
  return (
    <StatusBar>
      <Spacer />
      <Divider orientation='vertical' mx={2} />
      <div
        className='cursor-pointer hover:text-gray-500'
        onClick={() => {
          dispatch(dumpClicked());
        }}
      >
        Console Dump
      </div>
      <Divider orientation='vertical' mx={2} />
      <ConnectionStatus />
    </StatusBar>
  );
};

export { AppStatusBar };
