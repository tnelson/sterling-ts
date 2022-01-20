import { Pane, PaneBody, PaneHeader } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectMainView } from '../../state/selectors';
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
