import { Pane } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/store';
import { AppMiniMap } from '../AppMiniMap/AppMiniMap';
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
      <AppMiniMap />
    </Pane>
  );
};

export { AppStage };
