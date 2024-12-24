import React from 'react';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveDatum } from '../../state/selectors';
import VisualizationGenerator from './interp-viz-generator/VisualizationGenerator';
import { LocalNextExpressionIdProvider } from './interp-viz-generator/LocalNextExpressionIdProvider';

const JsonView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  if (!datum) return null;

  return (
    <LocalNextExpressionIdProvider>
      <VisualizationGenerator datum={datum} />
    </LocalNextExpressionIdProvider>
  );
};

export { JsonView };
