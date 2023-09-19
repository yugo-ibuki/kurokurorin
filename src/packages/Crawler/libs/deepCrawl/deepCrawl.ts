import type { Page as PuppeteerPage } from 'puppeteer'

type DeepCrawl = {
  startTime: Date
}

/**
 * より深い階層の URL を取得する
 * 対象:
 * ページ内の a タグの href 属性にある URL
 * ページ内の img タグの src 属性にある URL
 * ページ内の script タグの src 属性にある URL
 * ページ内の link タグの href 属性にある URL
 * @returns 取得した URL の配列
 */
export const deepCrawl = async (
  page: PuppeteerPage,
  options: DeepCrawl
): Promise<string[]> => {
  console.log(options)
  console.log(page.url())
  console.log('here is deepCrawl')
  return []
}
