import { NavButton } from '@/sterling-ui';
import { HiCode } from 'react-icons/hi';
import { FaTable } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/selectors';
import { mainViewChanged } from '../../state/ui/uiSlice';

const ViewButtons = () => {
  const dispatch = useSterlingDispatch();
  const mainView = useSterlingSelector(selectMainView);
  return (
    <>
      <NavButton
        isActive={mainView === 'GraphView'}
        mr={1}
        leftIcon={<BiNetworkChart />}
        onClick={() => dispatch(mainViewChanged('GraphView'))}
      >
        Graph
      </NavButton>
      <NavButton
        isActive={mainView === 'TableView'}
        mr={1}
        leftIcon={<FaTable />}
        onClick={() => dispatch(mainViewChanged('TableView'))}
      >
        Table
      </NavButton>
      <NavButton
        isActive={mainView === 'ScriptView'}
        mr={1}
        leftIcon={<HiCode />}
        onClick={() => dispatch(mainViewChanged('ScriptView'))}
      >
        Script
      </NavButton>
    </>
  );
};

export { ViewButtons };
