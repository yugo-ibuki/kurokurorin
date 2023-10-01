import type { Page } from 'puppeteer'
import type { Target } from '@packages/Action/types'
import { Log } from '@utils/log'
import { Action } from '@packages/Action'

export const login = async (
  page: Page,
  targets: Target[]
): Promise<boolean> => {
  await page.goto('http://localhost:3333/login', {
    waitUntil: ['load', 'networkidle2']
  })

  let isSucceeded = true

  const action = new Action()
  for (const target of targets) {
    const selectorQuery = await action.createSelectorQuery(target.elementData)
    const element = await page.$(selectorQuery)
    if (!element) {
      throw new Error('element is empty')
    }

    // get the html as string
    await element.evaluate((x) => x.outerHTML)

    if (!element) {
      isSucceeded = false
      break
    }

    Log.info('actions: ', target.actionData)
    await action.run(target.actionData, element)
  }

  Log.info('all login actions are done. wait for navigation...')

  // wait for the page transition after login actions
  await page.waitForNavigation({
    timeout: 10000, // 10秒
    waitUntil: 'load'
  })

  return isSucceeded
}
