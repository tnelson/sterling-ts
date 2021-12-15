import { Drawer } from '@/sterling-ui';
import { useSterlingSelector } from '../../state/hooks';
import { selectDrawerState } from '../../state/store';

const AppDrawer = () => {
  const variant = useSterlingSelector(selectDrawerState);
  return <Drawer variant={variant}>Drawer!</Drawer>;
};

export { AppDrawer };
