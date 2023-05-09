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
  GraphExplorerDrawer,
  GraphExplorerDrawerHeader
} from './explorer/GraphExplorerDrawer';
import {
  GraphThemeDrawer,
  GraphThemeDrawerHeader
} from './theme/GraphThemeDrawer';

const GraphDrawer = () => {
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      {drawer === 'explorer' && <GraphExplorerDrawer />}
      {drawer === 'state' && <GraphStateDrawer />}
      {drawer === 'theme' && <GraphThemeDrawer />}
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
    </>
  );
};

const GraphDrawerHeader = () => {
  const drawer = useSterlingSelector(selectGraphDrawer);
  return (
    <>
      {drawer === 'explorer' && <GraphExplorerDrawerHeader />}
      {drawer === 'state' && <GraphStateDrawerHeader />}
      {drawer === 'theme' && <GraphThemeDrawerHeader />}
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
    </>
  );
};

export { GraphDrawer, GraphDrawerHeader };
