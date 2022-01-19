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
    fontSize: 'xs',
    fontWeight: 'semibold',
    color: 'gray.200',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _hover: {
      bg: 'gray.100',
      color: 'initial',
      _disabled: {
        bg: 'initial'
      }
    },
    _active: {
      bg: 'gray.200',
      color: 'initial'
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
};

export { NavButton, NavButtonTheme };
