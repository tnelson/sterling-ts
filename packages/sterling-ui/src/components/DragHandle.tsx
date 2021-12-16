import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const DragHandle = (props: BoxProps) => {
  const styles = useStyleConfig('DragHandle');
  return <Box __css={styles} {...props} />;
};

const DragHandleTheme = {
  baseStyle: {
    w: '8px',
    h: 'full',
    ml: '-8px',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    borderLeft: '5px solid transparent',
    borderRight: '1px',
    borderRightColor: 'gray.300',
    cursor: 'col-resize',
    transition: 'all ease 0.25s',
    _hover: {
      borderRightColor: 'gray.500'
    }
  }
};

export { DragHandle, DragHandleTheme };
