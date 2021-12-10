import { Button, ButtonProps, Text, useStyleConfig } from '@chakra-ui/react';

interface SideBarButtonProps {
  text: string;
}

const SideBarButton = (props: ButtonProps & SideBarButtonProps) => {
  const { text, ...rest } = props;
  const styles = useStyleConfig('SideBarButton');
  return (
    <Button as='div' __css={styles} {...rest}>
      <Text transform='rotate(180deg)' userSelect='none' cursor='pointer'>
        {text}
      </Text>
    </Button>
  );
};

const SideBarButtonTheme = {
  baseStyle: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    py: 2,
    lineHeight: 1.2,
    fontSize: 'xs',
    fontWeight: 'medium',
    letterSpacing: 'tight',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    writingMode: 'vertical-lr',
    textOrientation: 'sideways',
    _hover: {
      bg: 'gray.200',
      _disabled: {
        bg: 'initial'
      }
    },
    _active: {
      bg: 'gray.300'
    }
  }
};

export { SideBarButton, SideBarButtonTheme };
