import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const PaneHeader = (props: BoxProps) => {
  const styles = useStyleConfig('PaneHeader');
  return <Box __css={styles} {...props} />;
};

const PaneHeaderTheme = {
  baseStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35px',
    bg: 'gray.100',
    display: 'flex',
    alignItems: 'center'
  }
};

export { PaneHeader, PaneHeaderTheme };
