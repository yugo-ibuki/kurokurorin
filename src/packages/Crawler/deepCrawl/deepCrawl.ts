import type { Page as PuppeteerPage } from 'puppeteer'
import { onlyAllowedDomain } from '@packages/Crawler/libs/onlyAllowedDomein'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'

type DeepCrawlOptions = {
  startTime: Date
  userOptions: {
    crawlTerm: number
    allowedDomain: string
  }
}

/**
 * 複数のタグに対し、動作を行い url を収集し、再帰的にクローリングしていく。
 * @param page - puppeteer の page オブジェクト
 * @param visitedUrls - 既に訪れた URL の配列
 * @param options - クローリングに必要なオプション
 * @param no - 何番目の URL か
 * @returns - 重複排除された URL の配列
 */
export const deepCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = [],
  options: DeepCrawlOptions,
  no: number = 0
): Promise<string[]> => {
  Log.info('deepCrawl is called times: ', no)

  const { startTime } = options
  const { crawlTerm, allowedDomain } = options.userOptions

  // クローリング指定時間を経過したら終了
  const isTimeUp = Date.now() - startTime.getTime() >= crawlTerm * 1000
  if (isTimeUp) {
    return visitedUrls
  }

  // const urls = await deepCrawl(page, options)
  const urls = ['']

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // マージして重複排除
  const uniqueVisitedUrls = concatArraysAndWillBeUnique(
    visitedUrls,
    onlyAllowedDomainUrl
  )

  // 一つずつページに遷移していく
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: ['load', 'networkidle2']
  })

  const resultUrls = await deepCrawl(page, uniqueVisitedUrls, options, no + 1)
  Log.info(resultUrls)

  return []
}
