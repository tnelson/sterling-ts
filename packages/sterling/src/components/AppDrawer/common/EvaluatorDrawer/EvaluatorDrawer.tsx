import { evalRequested } from '@/sterling-connection';
import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { useCallback } from 'react';
import { GoTerminal } from 'react-icons/go';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../state/hooks';
import {
  selectActiveDatum,
  selectActiveDatumExpressions,
  selectEvaluatorActive,
  selectNextExpressionId
} from '../../../../state/selectors';
import { EvaluatorExpressions } from './EvaluatorExpressions';
import { EvaluatorInput } from './EvaluatorInput';

const EvaluatorDrawer = () => {
  const dispatch = useSterlingDispatch();
  const active = useSterlingSelector(selectEvaluatorActive);
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const expressions = useSterlingSelector(selectActiveDatumExpressions);
  const nextExpressionId = useSterlingSelector(selectNextExpressionId);

  const handleSubmit = useCallback(
    (value: string) => {
      if (activeDatum)
        dispatch(
          evalRequested({
            id: `${nextExpressionId}`,
            datumId: activeDatum.id,
            expression: value
          })
        );
    },
    [dispatch, nextExpressionId, activeDatum]
  );

  return (
    <div className='absolute inset-0'>
      <EvaluatorInput disabled={!active} onSubmit={handleSubmit} />
      <EvaluatorExpressions expressions={expressions} />
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
