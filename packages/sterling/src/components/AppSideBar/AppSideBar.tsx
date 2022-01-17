import { SideBar, SideBarButton } from '@/sterling-ui';
import { Spacer } from '@chakra-ui/react';
import { GoNote, GoTerminal } from 'react-icons/go';
import { useSterlingDispatch, useSterlingSelector } from '../../statenew/hooks';
import { selectDrawerView, selectMainView } from '../../statenew/selectors';
import { commonDrawerViewChanged } from '../../statenew/ui/uiSlice';
import { GraphViewButtons } from './GraphViewButtons';
import { ScriptViewButtons } from './ScriptViewButtons';
import { TableViewButtons } from './TableViewButtons';

const AppSideBar = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const drawer = useSterlingSelector(selectDrawerView);
  return (
    <SideBar>
      {view === 'GraphView' && <GraphViewButtons />}
      {view === 'TableView' && <TableViewButtons />}
      {view === 'ScriptView' && <ScriptViewButtons />}
      <Spacer />
      <SideBarButton
        text='Evaluator'
        rightIcon={<GoTerminal />}
        isActive={drawer === 'evaluator'}
        onClick={() => dispatch(commonDrawerViewChanged('evaluator'))}
      />
      <SideBarButton
        text='Log'
        rightIcon={<GoNote />}
        isActive={drawer === 'log'}
        onClick={() => dispatch(commonDrawerViewChanged('log'))}
      />
    </SideBar>
  );
};

export { AppSideBar };
