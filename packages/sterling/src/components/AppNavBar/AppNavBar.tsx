import { Logo, NavBar } from '@/sterling-ui';
import { Divider, Spacer } from '@chakra-ui/react';
import { AppMiniMap } from '../AppMiniMap/AppMiniMap';
import { ViewButtons } from './ViewButtons';

const AppNavBar = () => {
  return (
    <NavBar>
      <Logo />
      <Divider orientation='vertical' mx={2} />
      <ViewButtons />
      <Divider orientation='vertical' mx={2} />
      <AppMiniMap />
      <Spacer />
    </NavBar>
  );
};

export { AppNavBar };
