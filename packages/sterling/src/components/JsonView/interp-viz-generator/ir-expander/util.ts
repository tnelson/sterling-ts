// check if a value is a conditional
export function isConditional(value: any): boolean {
  return value && typeof value === 'object' && value.type === 'conditional';
}

// check if a value needs to be evaluated as a forge expression
export function isForgeExpression(value: any): boolean {
  return typeof value === 'string' && value.startsWith('~');
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