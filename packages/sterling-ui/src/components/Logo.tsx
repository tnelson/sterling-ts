import { Center, CenterProps, useStyleConfig } from '@chakra-ui/react';

const Logo = (props: CenterProps) => {
  const styles = useStyleConfig('Logo');
  return (
    <Center __css={styles} {...props}>
      Sterling
    </Center>
  );
};

const LogoTheme = {
  baseStyle: {
    p: 2,
    fontWeight: 'black',
    fontSize: 'lg'
  }
};

export { Logo, LogoTheme };
