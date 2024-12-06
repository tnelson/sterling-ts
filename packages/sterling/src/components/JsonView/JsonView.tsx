import { useSterlingSelector } from '../../state/hooks';
import { selectActiveDatum } from '../../state/selectors';
//import { ScriptViewDatum } from './ScriptViewDatum';

const JsonView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  if (!datum) return null;
  
  return <b>Hi!</b>  // <ScriptViewDatum datum={datum} data-testid='script-view-datum'/>;
};

export { JsonView };
