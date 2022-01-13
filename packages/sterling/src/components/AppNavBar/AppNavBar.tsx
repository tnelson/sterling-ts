import { Logo, NavBar } from '@/sterling-ui';
import { Divider, Spacer } from '@chakra-ui/react';

const AppNavBar = () => {
  return (
    <NavBar className='shadow'>
      <Logo />
      <Divider orientation='vertical' mx={2} />
      <Spacer />
    </NavBar>
  );
};

export { AppNavBar };
