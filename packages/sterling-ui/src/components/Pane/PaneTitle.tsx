import { Center, CenterProps, useStyleConfig } from '@chakra-ui/react';

const PaneTitle = (props: CenterProps) => {
  const styles = useStyleConfig('PaneTitle');
  return <Center __css={styles} {...props} />;
};

const PaneTitleTheme = {
  baseStyle: {
    fontSize: 'xs',
    fontWeight: 'semibold',
    color: 'gray.800'
  }
};

export { PaneTitle, PaneTitleTheme };
