import { ForgeUtil } from "../../forge-evaluator";

// check if a value is a conditional
export function isConditional(value: any): boolean {
  return value && typeof value === 'object' && value.type === 'conditional';
}

// check if a value needs to be evaluated as a forge expression
export function isForgeExpression(value: any): boolean {
  return typeof value === 'string' && value.startsWith('~');
}

// checks if a string represents a boolean value in the
// format of the forge evaluator
export function isForgeBoolean(str: string): boolean {
  return str === "#t" || str === "#f";
}

// parse a string value returned by the forge evaluator to a boolean 
export function parseBoolean(str: string): boolean {
  if (str.toLowerCase() === '#t') {
    return true;
  } else if (str.toLowerCase() === '#f') {
    return false;
  }
  throw new Error(`Invalid boolean string: ${str}`);
}

// checks if a string value is an integer value 
export function isNumeric(str: string): boolean {
  return !isNaN(parseInt(str));
}

// checks if a var is referenced in the given string
export function usesVar(str: string, variable: string) {
  const start = str.indexOf('${');
  const end = str.substring(start).indexOf('}');

  if (start === -1 || end === -1)
    return false;

  if (str.substring(start, start + end).includes(variable))
    return true;

  return usesVar(str.substring(start + end + 1), variable);
}

// applies a text renaming to a string
export function applyTextRename(currValue: string, textRenames: [string, string][]): string {
  const [_, replacedText] = textRenames.find(([originalText]) => originalText === currValue) || ['', currValue];
  return replacedText;
}

// evaluates a forge expression using the given forge evaluator util
export function evaluateForgeExpr(query: string, forgeUtil: ForgeUtil) {
  return forgeUtil.evaluateExpression(query);
}

// handles a conditional value by evaluating the condition and returning
// the appropriate branch (if the value is not a conditional, it is returned
// as is)
export function handleConditional(value: any, forgeUtil: ForgeUtil) {
  if (isConditional(value)) {
    const conditionResult = evaluateForgeExpr(value.condition.substring(1), forgeUtil);
    if (typeof conditionResult === 'string') {
      if (parseBoolean(conditionResult)) {
        return value.then;
      }
      return value.else;
    }
    throw new Error('Condition must evaluate to a boolean value, not tuples!');
  } else {
    return value;
  }
}

// evaluates a value as a forge expression if specified by the user
// (i.e. if the value is a string starting with '~')
// (if the value is not a forge expression, it is returned as is)
export function evaluateForgeProps(value: any, forgeUtil: ForgeUtil) {
  if (value !== undefined && isForgeExpression(value)) {
    return evaluateForgeExpr(value.substring(1), forgeUtil);
  }
  return value;
}