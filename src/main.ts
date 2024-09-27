import type { Target } from '@packages/Action/types'
import { data } from '@packages/Login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'
import { writeJsonToFile } from '@utils/writeJsonToFile'
import { differenceInSeconds } from 'date-fns'
import type { Protocol } from 'puppeteer'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'
import type { ElementsInPage } from '@packages/Crawler'
import { formatDate } from '@utils/date'

// NOTE: This is dummy data for login
const loginData: Target[] = data

/**
 * CrawlResult Object Type
 */
type Result = {
  startTime?: string
  endTime?: string
  takenTime?: string
  urls: string[]
  cookies: Protocol.Network.Cookie[]
  elementsInPage: ElementsInPage[]
}

/**
 * Default Object for CrawlResult
 */
const resultDefault: Result = {
  startTime: undefined,
  endTime: undefined,
  takenTime: undefined,
  urls: [],
  cookies: [],
  elementsInPage: []
}

const main = async () => {
  const options = CrawlOptions()
  Log.info('CRAWLING OPTIONS: ', options)
  const {
    startTime,
    userOptions: { hasLoginProcess, isDeepCrawl }
  } = options

  // Final Crawling Result
  const result: Result = resultDefault

  // Record Start Time
  result.startTime = startTime

  const browser = await Browser.create()
  browser.options = options
  const page = await browser.createPage()
  await page.initialSetup({
    setRequestHook: false
  })

  if (hasLoginProcess) {
    const isLoggedIn = await page.login(loginData)
    if (!isLoggedIn) {
      Log.warn('Failed to login')
      await page.close()
      await browser.close()
      return
    }
  }

  // Set Cookies
  result.cookies = await page.getCookies()

  // TODO: move the deep crawl and shallow crawl functions to Crawl class and leads to the following one by arg
  // Crawling starts
  // Shallow Crawl
  if (!isDeepCrawl) {
    const urls = await page.crawler.shallowCrawl()
    result.urls = concatArraysAndWillBeUnique(result.urls, urls)
  }

  // Deep Crawl
  if (isDeepCrawl) {
    const crawlResult = await page.crawler.deepCrawl()
    result.urls = concatArraysAndWillBeUnique(
      result.urls,
      crawlResult.visitedUrls
    )
    result.elementsInPage = crawlResult.elementsInPage
  }

  await page.close()
  await browser.close()

  // Set taken time and end time
  const takenTime = differenceInSeconds(new Date(), new Date(startTime))
  result.endTime = formatDate(new Date())
  result.takenTime = `${takenTime} s`

  Log.info('result: ', result)
  Log.info(`Crawling Done in ${takenTime} s`)

  // Output Result
  await writeJsonToFile(result, './results', `result-${Date.now()}.json`)
}

main()
