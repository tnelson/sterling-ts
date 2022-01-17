import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { tableDrawerViewChanged } from '../../state/ui/uiSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../statenew/hooks';
import { selectMainView, selectTableDrawer } from '../../statenew/selectors';

const TableViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectTableDrawer);
  return (
    <>
      <SideBarButton
        text='Settings'
        rightIcon={<IoSettingsOutline />}
        isActive={view === 'TableView' && drawer === 'settings'}
        onClick={() => dispatch(tableDrawerViewChanged('settings'))}
      />
    </>
  );
};

export { TableViewButtons };
