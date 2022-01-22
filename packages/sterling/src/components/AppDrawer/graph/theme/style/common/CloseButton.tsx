import { Icon } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

const CloseButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Icon
      className='mx-2 cursor-pointer active:text-slate-500'
      onClick={onClick}
      as={MdClose}
    />
  );
};

export { CloseButton };
