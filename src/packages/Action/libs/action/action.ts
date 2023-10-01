import type { Target } from '@packages/Action/types'
import type { ElementHandle } from 'puppeteer'

/**
 * Action to be performed on the element you want to get.
 * @param actionData - Data on the action to be performed on the element you want to get.
 * @param actionData.type - Type of action to be performed on the element you want to get.
 * @param actionData.value - The value of the action on the element you want to get.
 * @param element - The element you want to get from the page.
 */
export const action = async (
  actionData: Target['actionData'],
  element: ElementHandle<Element>
): Promise<void> => {
  const actionType = actionData.type

  // if it is 'type', type value in the input
  if (actionType === 'type') {
    await element.type(actionData.value)
  }

  // if it is 'click', click element
  if (actionType === 'click') {
    await element.click()
  }
}
