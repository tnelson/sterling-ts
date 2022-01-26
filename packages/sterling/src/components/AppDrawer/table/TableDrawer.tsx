import { useSterlingSelector } from '../../../state/hooks';
import { selectTableDrawer } from '../../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from '../common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from '../common/LogDrawer';
import { TableStateDrawer, TableStateDrawerHeader } from './TableStateDrawer';

const TableDrawer = () => {
  const drawer = useSterlingSelector(selectTableDrawer);
  return (
    <>
      {drawer === 'state' && <TableStateDrawer />}
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
    </>
  );
};

const TableDrawerHeader = () => {
  const drawer = useSterlingSelector(selectTableDrawer);
  return (
    <>
      {drawer === 'state' && <TableStateDrawerHeader />}
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
    </>
  );
};

export { TableDrawer, TableDrawerHeader };
