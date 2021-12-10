import { NavButton } from '@/sterling-ui';
import { Icon } from '@blueprintjs/core';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/store';
import { mainViewChanged } from '../../state/ui/uiSlice';

const ViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const mainView = useSterlingSelector(selectMainView);
  return (
    <>
      <NavButton
        isActive={mainView === 'GraphView'}
        mr={1}
        leftIcon={<Icon icon='graph' />}
        onClick={() => dispatch(mainViewChanged('GraphView'))}
      >
        Graph
      </NavButton>
      <NavButton
        isActive={mainView === 'TableView'}
        mr={1}
        leftIcon={<Icon icon='th' />}
        onClick={() => dispatch(mainViewChanged('TableView'))}
      >
        Table
      </NavButton>
      <NavButton
        isActive={mainView === 'ScriptView'}
        mr={1}
        leftIcon={<Icon icon='code' />}
        onClick={() => dispatch(mainViewChanged('ScriptView'))}
      >
        Script
      </NavButton>
    </>
  );
};

export { ViewButtons };
