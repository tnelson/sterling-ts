import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react';

const NavButton = (props: ButtonProps) => {
  const styles = useStyleConfig('NavButton');
  return <Button __css={styles} {...props} />;
};

const NavButtonTheme = {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'sm',
    px: 4,
    lineHeight: 1.2,
    fontSize: 'sm',
    fontWeight: 'semibold',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _hover: {
      bg: 'gray.100',
      _disabled: {
        bg: 'initial'
      }
    },
    _active: {
      bg: 'gray.200'
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
};

export { NavButton, NavButtonTheme };
