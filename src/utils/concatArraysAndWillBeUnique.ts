/**
 * 二つの文字列配列をマージして、重複を削除した配列を返す
 * @param arr1
 * @param arr2
 * @returns 重複を削除した配列
 */
export const concatArraysAndWillBeUnique = (
  arr1: string[],
  arr2: string[]
): string[] => {
  return [...new Set([...arr1, ...arr2])]
}
