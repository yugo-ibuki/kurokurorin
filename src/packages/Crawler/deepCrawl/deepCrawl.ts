import type { Page as PuppeteerPage } from 'puppeteer'
import { onlyAllowedDomain } from '@packages/Crawler/libs/onlyAllowedDomein'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'
import { searchActionElements } from '@packages/Crawler/libs/searchActionElements'
import { scrapeATag } from '@packages/Crawler/libs/scrapeATag'

type DeepCrawlOptions = {
  startTime: Date
  userOptions: {
    crawlTerm: number
    allowedDomain: string
  }
}

/**
 * Recursive Crawling with multiple tags and Get URLs.
 * @param page - puppeteer's page object
 * @param visitedUrls - URLs that have already been visited
 * @param options - Options required for crawling
 * @param no - Number of process
 * @returns - Array of unique URLs
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

  console.log('will search action elements')
  const actionElements = await searchActionElements(page)
  console.log(actionElements)

  const urls = await scrapeATag(page)

  // Restrict with allowed domain
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // Merge and remove duplicates
  const uniqueVisitedUrls = concatArraysAndWillBeUnique(
    visitedUrls,
    onlyAllowedDomainUrl
  )

  // Go to the next page one by one
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: ['load', 'networkidle2']
  })

  return await deepCrawl(page, uniqueVisitedUrls, options, no + 1)
}
