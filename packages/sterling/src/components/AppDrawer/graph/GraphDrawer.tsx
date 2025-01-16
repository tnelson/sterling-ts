import { useSterlingSelector } from '../../../state/hooks';
import { selectGraphDrawer } from '../../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from '../common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from '../common/LogDrawer';
import {
  GraphStateDrawer,
  GraphStateDrawerHeader
} from './state/GraphStateDrawer';
import {
  ExplorerDrawer,
  ExplorerDrawerHeader
} from '../common/explorer/ExplorerDrawer';
import {
  GraphThemeDrawer,
  GraphThemeDrawerHeader
} from './theme/GraphThemeDrawer';
import { GraphLayoutDrawer, GraphLayoutDrawerHeader } from './theme/GraphLayoutDrawer';

const GraphDrawer = () => {
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      {drawer === 'explorer' && <ExplorerDrawer />}
      {drawer === 'state' && <GraphStateDrawer />}
      {drawer === 'theme' && <GraphThemeDrawer />}
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
      {drawer === 'layout' && <GraphLayoutDrawer />}
    </>
  );
};

// state drawer = time
// explorer = select instance
// theme = theme

const GraphDrawerHeader = () => {
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      {drawer === 'explorer' && <ExplorerDrawerHeader />}
      {drawer === 'state' && <GraphStateDrawerHeader />}
      {drawer === 'theme' && <GraphThemeDrawerHeader />}
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
      {drawer === 'layout' && <GraphLayoutDrawerHeader />}
    </>
  );
};

export { GraphDrawer, GraphDrawerHeader };
