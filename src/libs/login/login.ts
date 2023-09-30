import type { Page } from 'puppeteer'
import type { ElementHandle } from 'puppeteer'
import { Log } from '@utils/log'

type ClickAction = {
  type: 'click'
}

type TypeAction = {
  type: 'type'
  value: string
}

export type Target = {
  elementData: {
    /** The attribute name to search for */
    selectorType: 'class' | 'id' | 'name'
    /** The value of the attribute */
    selectorName: string
  }
  actionData: ClickAction | TypeAction
}

export const login = async (
  page: Page,
  targets: Target[]
): Promise<boolean> => {
  await page.goto('http://localhost:3333/login', {
    waitUntil: ['load', 'networkidle2']
  })

  let isSucceeded = true

  for (const target of targets) {
    const selectorQuery = await createSelectorQuery(target.elementData)
    const element = await page.$(selectorQuery)
    if (!element) {
      throw new Error('element is empty')
    }

    // get the html as string
    await element.evaluate((x) => x.outerHTML)
    // const html = await element.evaluate((x) => x.outerHTML)
    // if (html.includes('login')) {
    // Log.info(html)
    // }

    if (!element) {
      isSucceeded = false
      break
    }

    Log.info('actions: ', target.actionData)
    await action(target.actionData, element)
  }

  Log.info('all login actions are done. wait for navigation...')

  // wait for the page transition after login actions
  await page.waitForNavigation({
    timeout: 10000, // 10秒
    waitUntil: 'load'
  })

  return isSucceeded
}

/**
 * Get the selector query of the element you want to get.
 * @param elementData
 * @param elementData.element.selectorType
 * @param elementData.element.selectorName
 * @returns - selector query
 */
const createSelectorQuery = async (
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

/**
 * Action to be performed on the element you want to get.
 * @param actionData - Data on the action to be performed on the element you want to get.
 * @param actionData.type - Type of action to be performed on the element you want to get.
 * @param actionData.value - The value of the action on the element you want to get.
 * @param element - The element you want to get from the page.
 */
const action = async (
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
