import { Pane, PaneBody, PaneHeader, PaneTitle } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectCommonDrawer } from '../../state/store';
import { LogDrawer, LogDrawerHeader } from './common/LogDrawer';

const AppDrawer = () => {
  const commonDrawer = useSterlingSelector(selectCommonDrawer);
  return (
    <Pane>
      <PaneHeader className='border-b'>
        <LogDrawerHeader />
      </PaneHeader>
      <PaneBody>{commonDrawer === 'log' && <LogDrawer />}</PaneBody>
    </Pane>
  );
};

export { AppDrawer };
