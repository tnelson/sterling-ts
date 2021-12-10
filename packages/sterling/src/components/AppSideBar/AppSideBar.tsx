import { SideBar, SideBarButton } from '@/sterling-ui';
import { Divider } from '@chakra-ui/react';
import { FiTerminal } from 'react-icons/fi';
import { MdFolderOpen } from 'react-icons/md';
import { useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/store';
import { GraphViewButtons } from './GraphViewButtons';
import { ScriptViewButtons } from './ScriptViewButtons';
import { TableViewButtons } from './TableViewButtons';

const AppSideBar = () => {
  const view = useSterlingSelector(selectMainView);
  return (
    <SideBar>
      <SideBarButton text='Traces' rightIcon={<MdFolderOpen />} />
      <SideBarButton text='Evaluator' rightIcon={<FiTerminal />} />
      <Divider borderBottomWidth={4} />
      {view === 'GraphView' && <GraphViewButtons />}
      {view === 'TableView' && <TableViewButtons />}
      {view === 'ScriptView' && <ScriptViewButtons />}
    </SideBar>
  );
};

export { AppSideBar };
