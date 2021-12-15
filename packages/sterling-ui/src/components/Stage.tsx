import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const Stage = (props: BoxProps & { variant?: string }) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig('Stage', { variant });
  return <Box __css={styles} {...rest} />;
};

const StageTheme = {
  baseStyle: {
    position: 'fixed',
    top: '50px',
    right: 0,
    bottom: '20px',
    display: 'flex',
    transition: 'left 200ms cubic-bezier(0.85, 0, 0.15, 1)'
  },
  variants: {
    open: {
      left: '280px'
    },
    closed: {
      left: '30px'
    }
  },
  defaultProps: {
    variant: 'open'
  }
};

export { Stage, StageTheme };
