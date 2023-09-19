import type { Page as PuppeteerPage } from 'puppeteer'
import { onlyAllowedDomain } from '@packages/Crawler/libs/onlyAllowedDomein'
import { deepCrawl } from '@packages/Crawler/libs/deepCrawl'

type ActiveCrawlOptions = {
  startTime: Date
  userOptions: {
    crawlingTime: number
    allowedDomain: string
  }
}

/**
 * 複数のタグに対して動作を行いながら URL を収集する
 * @param page - puppeteer の page オブジェクト
 * @param visitedUrls - 既に訪れた URL の配列
 * @param options - クローリングに必要なオプション
 * @param no - 何番目の URL か
 * @returns - 重複排除された URL の配列
 */
export const activeCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = [],
  options: ActiveCrawlOptions,
  no: number = 0
): Promise<string[]> => {
  console.log(options)
  console.log('activeCrawl is called times: ', no)

  const { startTime } = options
  const { crawlingTime, allowedDomain } = options.userOptions

  // クローリング指定時間を経過したら終了
  const isTimeUp = Date.now() - startTime.getTime() >= crawlingTime * 1000
  if (isTimeUp) {
    return visitedUrls
  }

  // より深い階層の URL を取得
  const urls = await deepCrawl(page, options)

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // マージして重複排除
  const uniqueVisitedUrls = [
    ...new Set(visitedUrls.concat(onlyAllowedDomainUrl))
  ]

  await page.goto(uniqueVisitedUrls[no])

  const AllATagUrls = await activeCrawl(page, visitedUrls, options, no + 1)
  console.log(AllATagUrls)

  return []
}
