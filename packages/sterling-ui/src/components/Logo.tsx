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
    p: 1,
    fontWeight: 'bold',
    fontSize: 'sm',
    letterSpacing: 'wide',
    color: 'gray.50',
    lineHeight: '0'
  }
};

export { Logo, LogoTheme };
