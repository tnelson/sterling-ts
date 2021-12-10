import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';

const TableViewButtons = () => {
  return (
    <>
      <SideBarButton text='Settings' rightIcon={<IoSettingsOutline />} />
    </>
  );
};

export { TableViewButtons };
