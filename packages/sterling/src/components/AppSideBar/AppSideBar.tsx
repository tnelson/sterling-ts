import { SideBar, SideBarButton } from '@/sterling-ui';
import { Divider } from '@chakra-ui/react';
import { GoTerminal } from 'react-icons/go';
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
      <SideBarButton text='Data' rightIcon={<MdFolderOpen />} />
      <SideBarButton text='Evaluator' rightIcon={<GoTerminal />} />
      <Divider borderBottomWidth={4} />
      {view === 'GraphView' && <GraphViewButtons />}
      {view === 'TableView' && <TableViewButtons />}
      {view === 'ScriptView' && <ScriptViewButtons />}
    </SideBar>
  );
};

export { AppSideBar };
