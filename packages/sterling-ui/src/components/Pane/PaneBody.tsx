import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const PaneBody = (props: BoxProps) => {
  const styles = useStyleConfig('PaneBody');
  return <Box __css={styles} {...props} />;
};

const PaneBodyTheme = {
  baseStyle: {
    position: 'absolute',
    top: '35px',
    right: 0,
    bottom: 0,
    left: 0
  }
};

export { PaneBody, PaneBodyTheme };
