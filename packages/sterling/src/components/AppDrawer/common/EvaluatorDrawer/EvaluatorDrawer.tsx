import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { GoTerminal } from 'react-icons/go';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';
import { EvaluatorExpressions } from './EvaluatorExpressions';
import { EvaluatorInput } from './EvaluatorInput';

const EvaluatorDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);

  if (!activeDatum) return null;
  return (
    <div className='absolute inset-0'>
      <EvaluatorInput datum={activeDatum} />
      <EvaluatorExpressions datum={activeDatum} />
    </div>
  );
};

const EvaluatorDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={GoTerminal} />
      <PaneTitle>Evaluator</PaneTitle>
    </div>
  );
};

export { EvaluatorDrawer, EvaluatorDrawerHeader };
