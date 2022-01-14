import { Pane, PaneBody, PaneHeader, PaneTitle } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectCommonDrawer } from '../../state/store';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from './common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from './common/LogDrawer';

const AppDrawer = () => {
  const commonDrawer = useSterlingSelector(selectCommonDrawer);
  return (
    <Pane>
      <PaneHeader className='border-b'>
        {commonDrawer === 'evaluator' && <EvaluatorDrawerHeader />}
        {commonDrawer === 'log' && <LogDrawerHeader />}
      </PaneHeader>
      <PaneBody>
        {commonDrawer === 'evaluator' && <EvaluatorDrawer />}
        {commonDrawer === 'log' && <LogDrawer />}
      </PaneBody>
    </Pane>
  );
};

export { AppDrawer };
