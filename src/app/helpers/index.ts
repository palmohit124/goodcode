/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

const tagCache: { [label: string]: boolean } = {};

export function tag<T>(label: T | ''): T {
  if (tagCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  tagCache[<string>label] = true;

  return <T>label;
}
