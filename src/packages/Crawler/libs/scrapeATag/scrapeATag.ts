import type { Page as PuppeteerPage } from 'puppeteer'

/**
 * Get a tags in the page.
 * @param page
 * @returns a tag urls which is in the href attribute
 */
export const scrapeATag = async (page: PuppeteerPage): Promise<string[]> => {
  const aTagUrls = await page.$$eval('a', (elements) => {
    return elements.map((element) => element.href)
  })
  return aTagUrls.filter((url) => url)
}
