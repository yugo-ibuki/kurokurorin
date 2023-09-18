import type { Target } from '@libs/login'
import { data } from '@libs/login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'
import { writeJsonToFile } from '@utils/writeJsonToFile'
import { differenceInSeconds } from 'date-fns'

const loginData: Target[] = data

type CrawlResult = {
  urls: string[]
}

const crawlResultDefault: CrawlResult = {
  urls: []
}

const main = async () => {
  const options = CrawlOptions()

  const browser = await Browser.create()
  const page = await browser.createPage()

  if (options.userOptions.hasLoginProcess) {
    const isLoggedIn = await page.login(loginData)
    if (!isLoggedIn) {
      console.log('ログインに失敗しました')
      await page.close()
      await browser.close()
      return
    }
  }

  const cookies = await page.getCookies()
  console.log('cookies: ', cookies)

  const crawlResult: CrawlResult = crawlResultDefault

  if (options.userOptions.isPassiveCrawl) {
    const passiveResult = await page.crawler.passiveCrawl(options)
    crawlResult.urls = passiveResult
  } else {
    const activeResult = await page.crawler.activeCrawl(options)
    crawlResult.urls = activeResult
  }

  await page.close()
  await browser.close()

  console.log('crawlResult: ', crawlResult)

  // 結果を出力
  await writeJsonToFile(
    crawlResult,
    './results',
    `crawlResult-${Date.now()}.json`
  )

  console.log(`Done in ${differenceInSeconds(new Date(), options.startTime)} s`)
}

main()
