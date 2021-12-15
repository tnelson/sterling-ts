import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlinePalette, MdWorkspacesOutline } from 'react-icons/md';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectGraphDrawer, selectMainView } from '../../state/store';
import { graphDrawerViewChanged } from '../../state/ui/uiSlice';

const GraphViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      <SideBarButton
        text='Theme'
        rightIcon={<MdOutlinePalette />}
        isActive={view === 'GraphView' && drawer === 'theme'}
        onClick={() => dispatch(graphDrawerViewChanged('theme'))}
      />
      <SideBarButton
        text='Layout'
        rightIcon={<MdWorkspacesOutline />}
        isActive={view === 'GraphView' && drawer === 'layout'}
        onClick={() => dispatch(graphDrawerViewChanged('layout'))}
      />
      <SideBarButton
        text='Settings'
        rightIcon={<IoSettingsOutline />}
        isActive={view === 'GraphView' && drawer === 'settings'}
        onClick={() => dispatch(graphDrawerViewChanged('settings'))}
      />
    </>
  );
};

export { GraphViewButtons };
