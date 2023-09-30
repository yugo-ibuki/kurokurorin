import type { Page } from 'puppeteer'
import { Log } from '@utils/log'

/**
 * Scrape the page for action elements.
 * example: button, input, select, textarea
 * @param page
 */
export const searchActionElements = async (page: Page): Promise<string[]> => {
  Log.info('will search action elements')

  const actionElements = await page.$$eval(
    'button, input, select, textarea',
    (elements) => {
      return elements.map((element) => element.outerHTML)
    }
  )

  Log.info('actionsElements: ', actionElements)
  return []
}
