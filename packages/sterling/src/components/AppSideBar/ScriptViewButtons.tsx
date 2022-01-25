import { SideBarButton } from '@/sterling-ui';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscVariableGroup } from 'react-icons/vsc';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectMainView, selectScriptDrawer } from '../../state/selectors';
import { scriptDrawerViewChanged } from '../../state/ui/uiSlice';

const ScriptViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      <SideBarButton
        text='Variables'
        rightIcon={<VscVariableGroup />}
        isActive={view === 'ScriptView' && drawer === 'variables'}
        onClick={() => dispatch(scriptDrawerViewChanged('variables'))}
      />
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
