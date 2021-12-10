import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';

const NavBar = (props: FlexProps) => {
  const styles = useStyleConfig('NavBar');
  return <Flex __css={styles} {...props} />;
};

const NavBarTheme = {
  baseStyle: {
    h: '50px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'stretch',
    borderBottom: '1px',
    borderColor: 'gray.200',
    shadow: 'base',
    p: 2,
    bg: 'gray.50'
  }
};

export { NavBar, NavBarTheme };
