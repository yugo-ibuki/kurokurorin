import type { Page } from 'puppeteer'
import { createSelectorQuery } from '@packages/Action/libs/createSelectorQuery'
import type { Target } from '@packages/Action/libs/createSelectorQuery'
import { Log } from '@utils/log'
import { action } from '@packages/Action/libs/action'

export const login = async (
  page: Page,
  targets: Target[]
): Promise<boolean> => {
  await page.goto('http://localhot:3333/login', {
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
