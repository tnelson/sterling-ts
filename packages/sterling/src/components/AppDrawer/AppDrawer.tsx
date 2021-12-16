import { Drawer } from '@/sterling-ui';
import { Box, BoxProps } from '@chakra-ui/react';

const AppDrawer = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Drawer {...rest}>
      <Box width='full'>Some content!</Box>
      {children}
    </Drawer>
  );
};

export { AppDrawer };
