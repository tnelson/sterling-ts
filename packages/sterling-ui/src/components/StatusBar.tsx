import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';
import sizes from '../sizes';

const StatusBar = (props: FlexProps) => {
  const styles = useStyleConfig('StatusBar');
  return <Flex __css={styles} {...props} />;
};

const StatusBarTheme = {
  baseStyle: {
    h: `${sizes.statusBarSize}px`,
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    px: 2,
    fontSize: 'xs',
    borderTop: '1px',
    borderColor: 'gray.300',
    bg: 'gray.100'
  }
};

export { StatusBar, StatusBarTheme };
