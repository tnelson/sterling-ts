import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlinePalette, MdWorkspacesOutline } from 'react-icons/md';

const GraphViewButtons = () => {
  return (
    <>
      <SideBarButton text='Theme' rightIcon={<MdOutlinePalette />} />
      <SideBarButton text='Layout' rightIcon={<MdWorkspacesOutline />} />
      <SideBarButton text='Settings' rightIcon={<IoSettingsOutline />} />
    </>
  );
};

export { GraphViewButtons };
