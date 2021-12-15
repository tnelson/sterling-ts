import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';

const SideBar = (props: FlexProps) => {
  const styles = useStyleConfig('SideBar');
  return <Flex __css={styles} {...props} />;
};

const SideBarTheme = {
  baseStyle: {
    w: '30px',
    position: 'fixed',
    top: '50px',
    left: 0,
    bottom: '20px',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'stretch',
    fontSize: 'xs',
    borderRight: '1px',
    borderColor: 'gray.300',
    bg: 'gray.100'
  }
};

export { SideBar, SideBarTheme };
