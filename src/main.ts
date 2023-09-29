import type { Target } from '@libs/login'
import { data } from '@libs/login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'
import { writeJsonToFile } from '@utils/writeJsonToFile'
import { differenceInSeconds, format } from 'date-fns'
import type { Protocol } from 'puppeteer'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'
import { Log } from '@utils/log'

// NOTE: This is dummy data for login
const loginData: Target[] = data

/**
 * CrawlResult Object Type
 */
type CrawlResult = {
  startTime?: string
  endTime?: string
  takenTime?: string
  urls: string[]
  cookies: Protocol.Network.Cookie[]
}

/**
 * Default Object for CrawlResult
 */
const crawlResultDefault: CrawlResult = {
  startTime: undefined,
  endTime: undefined,
  takenTime: undefined,
  urls: [],
  cookies: []
}

const main = async () => {
  const options = CrawlOptions()
  Log.info('CRAWLING OPTIONS: ', options)
  const {
    startTime,
    userOptions: { hasLoginProcess, isDeepCrawl }
  } = options

  // Final Crawling Result
  const crawlResult: CrawlResult = crawlResultDefault

  // Record Start Time
  crawlResult.startTime = format(startTime, 'yyyy/MMdd HH:mm:ss')

  const browser = await Browser.create(options)
  const page = await browser.createPage()
  await page.initialSetup({
    setRequestHook: true
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
  crawlResult.cookies = await page.getCookies()

  // Crawling starts
  // Shallow Crawl starts
  const passiveCrawlResultUrls = await page.crawler.shallowCrawl()
  // 結果を格納
  crawlResult.urls = concatArraysAndWillBeUnique(
    crawlResult.urls,
    passiveCrawlResultUrls
  )

  // Deep Crawl starts
  if (isDeepCrawl) {
    const activeCrawlUrls = await page.crawler.deepCrawl()
    // Set Result
    crawlResult.urls = concatArraysAndWillBeUnique(
      crawlResult.urls,
      activeCrawlUrls
    )
  }

  await page.close()
  await browser.close()

  // Set taken time and end time
  const takenTime = differenceInSeconds(new Date(), startTime)
  crawlResult.endTime = format(new Date(), 'yyyy/MM/dd HH:mm:ss')
  crawlResult.takenTime = `${takenTime} s`

  Log.info('crawlResult: ', crawlResult)
  Log.info(`Crawling Done in ${takenTime} s`)

  // Output Result
  await writeJsonToFile(
    crawlResult,
    './results',
    `crawlResult-${Date.now()}.json`
  )
}

main()
