import { SideBarButton } from '@/sterling-ui';
import { FaFilm } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlinePalette, MdWorkspacesOutline } from 'react-icons/md';
import { useSterlingDispatch, useSterlingSelector } from '../../statenew/hooks';
import { selectGraphDrawer, selectMainView } from '../../statenew/selectors';
import { graphDrawerViewChanged } from '../../statenew/ui/uiSlice';

const GraphViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      <SideBarButton
        text='Time'
        rightIcon={<FaFilm />}
        isActive={view === 'GraphView' && drawer === 'state'}
        onClick={() => dispatch(graphDrawerViewChanged('state'))}
      />
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
