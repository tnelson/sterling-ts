import { isUndefined } from 'lodash-es';

export function isDefined(value: any): boolean {
  return !isUndefined(value);
}

/**
 * Convert an array of unique strings to an object that maps those strings to their respective indices within the array.
 * @param array An array of unique strings
 */
export function mapIndices(array: string[]): { [key: string]: number } {
  const indices: { [key: string]: number } = {};
  array.forEach((item, index) => (indices[item] = index));
  return indices;
}

/**
 * Create an array of zeros
 * @param n The length of the array
 */
export function zeros(n: number): number[] {
  const arr: number[] = new Array(n);
  for (let i = 0; i < n; ++i) arr[i] = 0;
  return arr;
}
