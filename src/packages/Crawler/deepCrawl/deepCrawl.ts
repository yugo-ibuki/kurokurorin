import type { Page as PuppeteerPage } from 'puppeteer'
import { onlyAllowedDomain } from '@packages/Crawler/libs/onlyAllowedDomein'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'
import { searchActionElements } from '@packages/Crawler/libs/searchActionElements'
import { scrapeATag } from '@packages/Crawler/libs/scrapeATag'

type DeepCrawlOptions = {
  startTime: string
  userOptions: {
    crawlTerm: number
    allowedDomain: string
  }
}

type ElementsInPage = {
  pageUrl: string
  actionElements: string[]
}

/**
 * Recursive Crawling with multiple tags and Get URLs.
 * @param page - puppeteer's page object
 * @param visitedUrls - URLs that have already been visited
 * @param actionElementsInPages - Array of action elements in each page
 * @param options - Options required for crawling
 * @param no - Number of process
 * @returns - Array of unique URLs
 */
export const deepCrawl = async (
  page: PuppeteerPage,
  visitedUrls: string[] = [],
  actionElementsInPages: ElementsInPage[] = [],
  options: DeepCrawlOptions,
  no: number = 0
): Promise<string[]> => {
  Log.info('deepCrawl is called times: ', no)

  const { startTime } = options
  const { crawlTerm, allowedDomain } = options.userOptions

  // クローリング指定時間を経過したら終了
  const isTimeUp =
    Date.now() - new Date(startTime).getTime() >= crawlTerm * 1000
  if (isTimeUp) {
    return visitedUrls
  }

  const urls = await scrapeATag(page)
  const elementsInPage: ElementsInPage = {
    pageUrl: page.url(),
    actionElements: await searchActionElements(page)
  }
  actionElementsInPages.push(elementsInPage)

  // Restrict with allowed domain
  const onlyAllowedDomainUrl = await onlyAllowedDomain(urls, allowedDomain)

  // Merge and remove duplicates
  const uniqueVisitedUrls = concatArraysAndWillBeUnique(
    visitedUrls,
    onlyAllowedDomainUrl
  )

  // If there is no URL to go to, then done
  if (!uniqueVisitedUrls[no]) {
    return visitedUrls
  }

  console.log(uniqueVisitedUrls[no])
  // Go to the next page one by one
  await page.goto(uniqueVisitedUrls[no], {
    waitUntil: ['networkidle0']
  })

  return await deepCrawl(
    page,
    uniqueVisitedUrls,
    actionElementsInPages,
    options,
    no + 1
  )
}
