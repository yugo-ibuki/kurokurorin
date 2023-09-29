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
type Result = {
  startTime?: string
  endTime?: string
  takenTime?: string
  urls: string[]
  cookies: Protocol.Network.Cookie[]
}

/**
 * Default Object for CrawlResult
 */
const resultDefault: Result = {
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
  const result: Result = resultDefault

  // Record Start Time
  result.startTime = format(startTime, 'yyyy/MMdd HH:mm:ss')

  const browser = await Browser.create(options)
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

  // Crawling starts
  const crawlResult = isDeepCrawl
    ? await page.crawler.deepCrawl()
    : await page.crawler.shallowCrawl()

  result.urls = concatArraysAndWillBeUnique(result.urls, crawlResult)

  await page.close()
  await browser.close()

  // Set taken time and end time
  const takenTime = differenceInSeconds(new Date(), startTime)
  result.endTime = format(new Date(), 'yyyy/MM/dd HH:mm:ss')
  result.takenTime = `${takenTime} s`

  Log.info('result: ', result)
  Log.info(`Crawling Done in ${takenTime} s`)

  // Output Result
  await writeJsonToFile(result, './results', `result-${Date.now()}.json`)
}

main()
