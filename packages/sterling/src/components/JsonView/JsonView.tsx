import React from 'react';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveDatum } from '../../state/selectors';
import VizConstructor from './viz-ir-constructor/VizConstructor';
import VisualizationGenerator from './interp-viz-generator/VisualizationGenerator';
import { LocalNextExpressionIdProvider } from './interp-viz-generator/LocalNextExpressionIdProvider';

const JsonView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  if (!datum) return null;

  return (
    <LocalNextExpressionIdProvider>
      <VizConstructor datum={datum} />
      {/* <VisualizationGenerator datum={datum} /> */}
    </LocalNextExpressionIdProvider>
  );
};

export { JsonView };
