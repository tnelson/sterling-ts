import { Stage } from '@/sterling-ui';
import { BoxProps } from '@chakra-ui/react';
import { useSterlingSelector } from '../../state/hooks';
import { selectDrawerIsCollapsed, selectMainView } from '../../state/store';
import { GraphView } from '../GraphView/GraphView';
import { ScriptView } from '../ScriptView/ScriptView';
import { TableView } from '../TableView/TableView';

const AppStage = (props: BoxProps) => {
  const mainView = useSterlingSelector(selectMainView);
  const variant = useSterlingSelector(selectDrawerIsCollapsed);
  return (
    <Stage variant={variant} {...props}>
      {mainView === 'GraphView' && <GraphView />}
      {mainView === 'TableView' && <TableView />}
      {mainView === 'ScriptView' && <ScriptView />}
    </Stage>
  );
};

export { AppStage };
