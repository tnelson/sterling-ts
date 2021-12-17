import { Pane } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectCommonDrawer } from '../../state/store';
import { LogDrawer } from './common/LogDrawer';

const AppDrawer = () => {
  const commonDrawer = useSterlingSelector(selectCommonDrawer);
  return <Pane>{commonDrawer === 'log' && <LogDrawer />}</Pane>;
};

export { AppDrawer };
