import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';

const ScriptViewButtons = () => {
  return (
    <>
      <SideBarButton text='Settings' rightIcon={<IoSettingsOutline />} />
    </>
  );
};

export { ScriptViewButtons };
