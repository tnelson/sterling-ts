import { Datum, DatumMeta } from './types';

/**
 * A payload containing metadata about the click of an action button.
 */
export interface Click {
  /**
   * The id of the datum associated with the button that was clicked.
   */
  id: string;
  /**
   * The string value from the onClick field of the button that was clicked.
   */
  onClick: string;
}

/**
 * A payload containing updates to the data displayed in Sterling.
 */
export interface DataJoin {
  /**
   * An array of new data to display in Sterling.
   */
  enter?: Datum[];
  /**
   * An array of updates to apply to existing data in Sterling.
   */
  update?: DatumMeta[];
  /**
   * An array of (the IDs of) data to be removed from display in Sterling.
   */
  exit?: string[];
}

/**
 * A payload containing an expression to evaluate.
 */
export interface EvalExpression {
  /**
   * The unique id of expression to be evaluated.
   */
  id: string;
  /**
   * The id of the datum associated with the expression to evaluate.
   */
  datumId: string;
  /**
   * The expression to evaluate.
   */
  expression: string;
}

/**
 * A payload containing the result of evaluating an expression.
 */
export interface EvalResult {
  /**
   * The unique id of the expression that was evaluated.
   */
  id: string;
  /**
   * The result of the evaluating the expression.
   */
  result: string;
}

/**
 * A payload containing a data provider's metadata.
 */
export interface ProviderMeta {
  /**
   * The name of the data provider.
   */
  name?: string;
  /**
   * Whether the provider supports a REPL.
   */
  evaluator?: string;
  /**
   * The Sterling views the provider wants available to the user.
   */
  views?: ('graph' | 'table' | 'script' | 'json')[];
}
