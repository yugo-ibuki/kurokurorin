import type { Page as PuppeteerPage } from 'puppeteer'
import type { Options } from '@libs/getOptions'
import { scrapeATag } from '../scrapeATag'

const allowedDomain = 'security-crawl-maze.app'

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
  options: Pick<Options, 'startTime'>,
  no: number = 0
): Promise<string[]> => {
  console.log('passiveCrawl is called times: ', no)

  // 10秒経過したら終了
  const isTimeUp = Date.now() - options.startTime >= 10000
  if (isTimeUp) {
    return visitedUrls
  }

  const urls = await scrapeATag(page)

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // 重複排除
  const uniqueVisitedUrls = [
    ...new Set(visitedUrls.concat(onlyAllowedDomainUrl))
  ]

  // 一つずつページに遷移していく
  await page.goto(uniqueVisitedUrls[no])

  return await passiveCrawl(page, uniqueVisitedUrls, options, no + 1)
}

/**
 * 許可されてるドメインのみに絞った URL に限定する。
 * @param urls - 対象となるURL
 * @param allowedDomain - 許可されているドメイン
 */
const onlyAllowedDomain = async (
  urls: string[],
  allowedDomain: string
): Promise<string[]> => {
  return urls
    .filter((url) => {
      const origin = new URL(url).origin
      return origin.includes(allowedDomain) ? url : undefined
    })
    .filter((url) => url) // undefined 排除
}
