import type { Page as PuppeteerPage } from 'puppeteer'

/**
 * ページ内の a タグを収集する
 * @param page
 * @returns a タグの href 属性にある URL の配列
 */
export const scrapeATag = async (page: PuppeteerPage): Promise<string[]> => {
  const aTagUrls = await page.$$eval('a', (elements) => {
    return elements.map((element) => element.href)
  })
  return aTagUrls.filter((url) => url)
}
