import { Button, ButtonProps, Text, useStyleConfig } from '@chakra-ui/react';

interface SideBarButtonProps {
  text: string;
}

const SideBarButton = (props: ButtonProps & SideBarButtonProps) => {
  const { text, ...rest } = props;
  const styles = useStyleConfig('SideBarButton');
  return (
    <Button as='div' __css={styles} iconSpacing='0.35rem' {...rest}>
      <Text
        as='div'
        display='flex'
        alignItems='center'
        justifyContent='center'
        userSelect='none'
        cursor='pointer'
      >
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
    justifyContent: 'center',
    py: 3,
    fontSize: 'xs',
    fontWeight: 'normal',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    writingMode: 'vertical-lr',
    textOrientation: 'sideways',
    iconSpacing: '0.35rem',
    span: {
      marginRight: '.12rem'
    },
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
