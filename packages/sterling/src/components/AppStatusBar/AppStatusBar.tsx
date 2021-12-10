import { StatusBar } from '@/sterling-ui';
import { Divider, Spacer } from '@chakra-ui/react';
import { ConnectionStatus } from './ConnectionStatus';

const AppStatusBar = () => {
  return (
    <StatusBar>
      <Spacer />
      <Divider orientation='vertical' mx={2} />
      <ConnectionStatus />
    </StatusBar>
  );
};

export { AppStatusBar };
