import type { Page } from 'puppeteer'

/**
 * Scrape the page for action elements.
 * example: button, input, select, textarea
 * @param page
 */
export const searchActionElements = async (page: Page): Promise<string[]> => {
  const actionElements = await page.$$eval(
    'button, input, select, textarea',
    (elements) => {
      return elements.map((element) => element.outerHTML)
    }
  )

  console.log('actionsElements: ', actionElements)
  return []
}
