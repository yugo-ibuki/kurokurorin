/**
 * Merge two string arrays and return an array with duplicates removed
 * @param arr1
 * @param arr2
 * @returns - An array with duplicates removed
 */
export const concatArraysAndWillBeUnique = (
  arr1: string[],
  arr2: string[]
): string[] => {
  return [...new Set([...arr1, ...arr2])]
}
