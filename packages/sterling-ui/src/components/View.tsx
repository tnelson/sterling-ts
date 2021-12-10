import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const View = (props: BoxProps) => {
  const styles = useStyleConfig('View');
  return <Box __css={styles} {...props} />;
};

const ViewTheme = {
  baseStyle: {
    position: 'fixed',
    top: '50px',
    right: 0,
    bottom: '20px',
    left: '27px',
    display: 'flex'
  }
};

export { View, ViewTheme };
