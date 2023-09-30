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
 * Recursive Crawling for collecting a tag URL
 * @param page - puppeteer page object
 * @param visitedUrls - the urls you already visited
 * @param options - options for crawling
 * @param no - the number of the process
 * @returns - unique urls
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

  // Restrict with allowed domain
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // merge the urls and make them unique
  const uniqueVisitedUrls = concatArraysAndWillBeUnique(
    urls,
    onlyAllowedDomainUrl
  )

  // the transition of the url one by one
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: ['networkidle0']
  })

  return await shallowCrawl(page, uniqueVisitedUrls, options, no + 1)
}
