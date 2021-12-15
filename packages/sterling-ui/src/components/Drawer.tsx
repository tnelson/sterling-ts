import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const Drawer = (props: BoxProps & { variant?: string }) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig('Drawer', { variant });
  return <Box __css={styles} {...rest} />;
};

const DrawerTheme = {
  baseStyle: {
    position: 'fixed',
    top: '50px',
    bottom: '20px',
    width: '250px',
    display: 'flex',
    transition: 'left 200ms cubic-bezier(0.85, 0, 0.15, 1)'
  },
  variants: {
    open: {
      left: '30px'
    },
    closed: {
      left: '-220px'
    }
  }
};

export { Drawer, DrawerTheme };
