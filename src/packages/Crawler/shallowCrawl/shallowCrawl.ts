import type { Page as PuppeteerPage } from 'puppeteer'
import { scrapeATag } from '../libs/scrapeATag'
import { onlyAllowedDomain } from '../libs/onlyAllowedDomein'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'

type ShallowCrawlOptions = {
  startTime: string
  userOptions: {
    crawlTerm: number
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
export const shallowCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = [],
  options: ShallowCrawlOptions,
  no: number = 0
): Promise<string[]> => {
  Log.info('shallowCrawl is called times: ', no)

  const { startTime } = options
  const { crawlTerm, allowedDomain } = options.userOptions

  // クローリング指定時間を経過したら終了
  const isTimeUp =
    Date.now() - new Date(startTime).getTime() >= crawlTerm * 1000
  if (isTimeUp) {
    return visitedUrls
  }

  const urls = await scrapeATag(page)

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // マージして重複排除
  const uniqueVisitedUrls = concatArraysAndWillBeUnique(
    urls,
    onlyAllowedDomainUrl
  )

  // 一つずつページに遷移していく
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: ['networkidle0']
  })

  return await shallowCrawl(page, uniqueVisitedUrls, options, no + 1)
}
