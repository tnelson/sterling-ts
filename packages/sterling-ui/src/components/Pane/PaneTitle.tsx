import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const PaneTitle = (props: BoxProps) => {
  const styles = useStyleConfig('PaneTitle');
  return <Box __css={styles} {...props} />;
};

const PaneTitleTheme = {
  baseStyle: {
    px: 2,
    fontSize: 'xs',
    fontWeight: 'semibold',
    color: 'gray.800'
  }
};

export { PaneTitle, PaneTitleTheme };
