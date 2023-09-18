import type { Page as PuppeteerPage } from 'puppeteer'
import { scrapeATag } from '../libs/scrapeATag'
import { onlyAllowedDomain } from '../libs/onlyAllowedDomein'

type PassiveCrawlOptions = {
  startTime: Date
  userOptions: {
    crawlingTime: number
    allowedDomain: string
  }
}

/**
 * a タグのみを収集し、再帰的にクローリングしていく。
 * @param page - puppeteer の page オブジェクト
 * @param visitedUrls - 既に訪れた URL の配列
 * @param options - クローリングに必要なオプション
 * @param no - 何番目の URL か
 * @returns - 重複排除された URL の配列
 */
export const passiveCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = [],
  options: PassiveCrawlOptions,
  no: number = 0
): Promise<string[]> => {
  console.log(page.url())
  console.log('passiveCrawl is called times: ', no)

  const { startTime } = options
  const { crawlingTime, allowedDomain } = options.userOptions

  // クローリング指定時間を経過したら終了
  const isTimeUp = Date.now() - startTime.getTime() >= crawlingTime * 1000
  if (isTimeUp) {
    return visitedUrls
  }

  console.log('will scrape a tag')
  const urls = await scrapeATag(page)

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // マージして重複排除
  const uniqueVisitedUrls = [
    ...new Set(visitedUrls.concat(onlyAllowedDomainUrl))
  ]

  console.log('will go to next page: ', uniqueVisitedUrls[no])
  // 一つずつページに遷移していく
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: 'load'
  })

  return await passiveCrawl(page, uniqueVisitedUrls, options, no + 1)
}
