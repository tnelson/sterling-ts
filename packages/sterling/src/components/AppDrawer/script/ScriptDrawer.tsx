import { useSterlingSelector } from '../../../state/hooks';
import { selectScriptDrawer } from '../../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from '../common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from '../common/LogDrawer';

const ScriptDrawer = () => {
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
    </>
  );
};

const ScriptDrawerHeader = () => {
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
    </>
  );
};

export { ScriptDrawer, ScriptDrawerHeader };
