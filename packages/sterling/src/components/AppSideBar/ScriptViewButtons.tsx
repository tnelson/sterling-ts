import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { scriptDrawerViewChanged } from '../../state/ui/uiSlice';
import { useSterlingDispatch, useSterlingSelector } from '../../statenew/hooks';
import { selectMainView, selectScriptDrawer } from '../../statenew/selectors';

const ScriptViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      <SideBarButton
        text='Settings'
        rightIcon={<IoSettingsOutline />}
        isActive={view === 'ScriptView' && drawer === 'settings'}
        onClick={() => dispatch(scriptDrawerViewChanged('settings'))}
      />
    </>
  );
};

export { ScriptViewButtons };
