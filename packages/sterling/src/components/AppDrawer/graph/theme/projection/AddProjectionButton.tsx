import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface AddProjectionButtonProps {
  types: string[];
  onSelectType: (type: string) => void;
}

const AddProjectionButton = (props: AddProjectionButtonProps) => {
  const { types, onSelectType } = props;
  return (
    <Menu>
      <MenuButton as={Button} size='xs' leftIcon={<IoMdAddCircleOutline />}>
        Add Projection
      </MenuButton>
      <MenuList>
        {types.map((type) => {
          return (
            <MenuItem key={type} onClick={() => onSelectType(type)}>
              {type}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export { AddProjectionButton };
