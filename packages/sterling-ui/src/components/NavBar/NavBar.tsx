import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';
import sizes from '../../sizes';

const NavBar = (props: FlexProps) => {
  const styles = useStyleConfig('NavBar');
  return <Flex __css={styles} {...props} />;
};

const NavBarTheme = {
  baseStyle: {
    h: `${sizes.navBarSize}px`,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'stretch',
    // borderBottom: '1px',
    // borderColor: 'gray.300',
    p: 2,
    bg: 'gray.600'
  }
};

export { NavBar, NavBarTheme };
