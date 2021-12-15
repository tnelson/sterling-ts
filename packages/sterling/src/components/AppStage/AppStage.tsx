import { Stage } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectDrawerState, selectMainView } from '../../state/store';
import { GraphView } from '../GraphView/GraphView';
import { ScriptView } from '../ScriptView/ScriptView';
import { TableView } from '../TableView/TableView';

const AppStage = () => {
  const mainView = useSterlingSelector(selectMainView);
  const variant = useSterlingSelector(selectDrawerState);
  return (
    <Stage variant={variant}>
      {mainView === 'GraphView' && <GraphView />}
      {mainView === 'TableView' && <TableView />}
      {mainView === 'ScriptView' && <ScriptView />}
    </Stage>
  );
};

export { AppStage };
