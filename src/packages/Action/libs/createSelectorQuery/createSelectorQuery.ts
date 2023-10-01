import type { Target } from '@packages/Action/types/types'

/**
 * Get the selector query of the element you want to get.
 * @param elementData
 * @param elementData.element.selectorType
 * @param elementData.element.selectorName
 * @returns - selector query
 */
export const createSelectorQuery = async (
  elementData: Target['elementData']
): Promise<string> => {
  const selectorType = elementData.selectorType
  const selectorName = elementData.selectorName
  let selectorQuery = ''

  // Change the query of the selector depending on the selectorType.
  switch (selectorType) {
    case 'name':
      // if it is name attribute, it becomes a query of [name="name attribute value"]
      selectorQuery = `[name="${selectorName}"]`
      break
    case 'id':
      // if it is id attribute, it becomes a query of #id attribute value
      selectorQuery = `#${selectorName}`
      break
    case 'class':
      // if it is class attribute, it becomes a query of .class attribute value
      selectorQuery = `.${selectorName}`
      break
    default:
      break
  }

  return selectorQuery !== ''
    ? selectorQuery
    : Promise.reject('selectorQuery is empty')
}
