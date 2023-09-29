import { describe, test } from 'vitest'
import { concatArraysAndWillBeUnique } from './concatArraysAndWillBeUnique'

describe('concatUniqueArray', () => {
  test('duplicates should be removed', () => {
    const array1 = ['a', 'b', 'c', 'd', 'e']
    const array2 = ['c', 'd', 'e', 'f', 'g']
    const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    const result = concatArraysAndWillBeUnique(array1, array2)
    expect(result).toEqual(expected)
  })
})
