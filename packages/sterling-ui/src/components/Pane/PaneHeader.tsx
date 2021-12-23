import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const PaneHeader = (props: BoxProps) => {
  const styles = useStyleConfig('PaneHeader');
  return <Box __css={styles} {...props} />;
};

const PaneHeaderTheme = {
  baseStyle: {
    height: '30px',
    bg: 'gray.100',
    display: 'flex',
    alignItems: 'center'
  }
};

export { PaneHeader, PaneHeaderTheme };
