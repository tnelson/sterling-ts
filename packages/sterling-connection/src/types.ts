/**
 * A button that can be displayed in the Sterling user interface.
 */
export interface Button {
  /**
   * The text to display in the button.
   */
  text: string;
  /**
   * A string that will be sent to the provider when the button is clicked.
   */
  onClick: string;
}

/**
 * An individual datum that can be displayed in Sterling.
 */
export interface Datum {
  /**
   * A unique identifier
   */
  id: string;
  /**
   * The format of the data.
   */
  format: string;
  /**
   * The raw data.
   */
  data: string;
  /**
   * An array of buttons to be displayed with this datum in the Sterling interface.
   */
  buttons?: Button[];
  /**
   * A boolean indicating whether REPL functionality is available for this datum.
   */
  evaluator?: boolean;
}

/**
 * The metadata associated with a Datum.
 */
export type DatumMeta = Omit<Datum, 'data' | 'format'>;
