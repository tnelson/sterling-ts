import { useSterlingSelector } from '../../../state/hooks';
import { selectTableDrawer } from '../../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from '../common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from '../common/LogDrawer';

const TableDrawer = () => {
  const drawer = useSterlingSelector(selectTableDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
    </>
  );
};

const TableDrawerHeader = () => {
  const drawer = useSterlingSelector(selectTableDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
    </>
  );
};

export { TableDrawer, TableDrawerHeader };
