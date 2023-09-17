import type { Page as PuppeteerPage } from 'puppeteer'

const allowedDomain = 'security-crawl-maze.app'

/**
 * a タグのみを収集し、再帰的にクローリングしていく。
 * @param page - puppeteer の page オブジェクト
 * @param visitedUrls - 既に訪れた URL の配列
 * @returns - 重複排除された URL の配列
 */
export const passiveCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = []
) => {
  console.log('visitedUrls', visitedUrls)
  if (visitedUrls.length >= 10) {
    return visitedUrls
  }

  const urls = await scrapeATag(page)

  // ドメイン制限
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // 重複排除
  const uniqueVisitedUrls = [
    ...new Set(visitedUrls.concat(onlyAllowedDomainUrl))
  ]

  for (const url of uniqueVisitedUrls) {
    await page.goto(url)
    await passiveCrawl(page, uniqueVisitedUrls)
  }

  return uniqueVisitedUrls
}

/**
 * ページ内の a タグを収集する
 * @param page
 */
const scrapeATag = async (page: PuppeteerPage): Promise<string[]> => {
  return await page.$$eval('a', (elements) =>
    elements.map((element) => element.href)
  )
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
