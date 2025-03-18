import React from 'react';
import { useSterlingSelector } from '../../state/hooks';
import { selectActiveDatum } from '../../state/selectors';
import VizConstructor from './viz-ir-constructor/VizConstructor';
import { LocalNextExpressionIdProvider } from './interp-viz-generator/LocalNextExpressionIdProvider';
import { ForgeUtil } from './forge-evaluator';
import { extractPredicates } from './predicate-extractor/predicate-extractor';
import { ForgePredUtil } from './forge-evaluator-pred';
import { ForgeUtil as SidForgeUtil } from './siddartha-forge-antlr/index';

const JsonView = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  if (!datum) return null;

  console.log('datum:', datum);
  // console.log('datum.data', datum.data);
  const xmlParser = new DOMParser()
  const xmlDoc = xmlParser.parseFromString(datum.data, 'application/xml');

  if (xmlDoc.documentElement.nodeName === "parsererror") {
    console.error("XML parsing error:", xmlDoc.documentElement.textContent);
    return;
  }

  const sourceElement = xmlDoc.querySelector('source');
  if (sourceElement === null) {
    console.error('No source element found in XML');
    return;
  }
  const content = sourceElement.getAttribute('content');
  if (content === null) {
    console.error('No content attribute found in source element');
    return;
  }
  console.log('content:', content);

  // sample data
  const predicates = extractPredicates(content);
  console.log('predicates:', predicates);

  const forgePredUtil = new ForgePredUtil(datum, 0, predicates);
  const expr = 'argPred1[2, 3]';
  const result = forgePredUtil.evaluateExpression(expr);
  console.log('FINAL RESULT:', result);

  // const instanceIndex = 0;
  // // const forgeExpr = 'Board6.board[0][1]';
  // const forgeExpr = 'add[#Left, 1]';
  // const forgeUtil = new ForgeUtil(datum, instanceIndex);
  // const result = forgeUtil.evaluateExpression(forgeExpr);

  // console.log('evaluated expr result:', result);

  // return (
  //   <div>{result}</div>
  // )

  return (
    <LocalNextExpressionIdProvider>
      <VizConstructor datum={datum} />
      {/* <VisualizationGenerator datum={datum} /> */}
    </LocalNextExpressionIdProvider>
  );
};

export { JsonView };
