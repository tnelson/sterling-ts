import { Pane } from '@/sterling-ui';
import { useSterlingSelector } from '../../statenew/hooks';
import { selectMainView } from '../../statenew/selectors';
import { GraphView } from '../GraphView/GraphView';
import { ScriptView } from '../ScriptView/ScriptView';
import { TableView } from '../TableView/TableView';

const AppStage = () => {
  const mainView = useSterlingSelector(selectMainView);
  return (
    <Pane>
      {mainView === 'GraphView' && <GraphView />}
      {mainView === 'TableView' && <TableView />}
      {mainView === 'ScriptView' && <ScriptView />}
    </Pane>
  );
};

export { AppStage };
