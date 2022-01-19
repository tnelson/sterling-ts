import { Pane, PaneBody, PaneHeader, PaneTitle } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from './common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from './common/LogDrawer';
import { GraphDrawer, GraphDrawerHeader } from './graph/GraphDrawer';

const AppDrawer = () => {
  const view = useSterlingSelector(selectMainView);
  return (
    <Pane>
      <PaneHeader className='border-b'>
        {view === 'GraphView' && <GraphDrawerHeader />}
      </PaneHeader>
      <PaneBody>{view === 'GraphView' && <GraphDrawer />}</PaneBody>
    </Pane>
  );
};

export { AppDrawer };
