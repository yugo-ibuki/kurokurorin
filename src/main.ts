import type { Target } from '@libs/login'
import { data } from '@libs/login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'
import { writeJsonToFile } from '@utils/writeJsonToFile'
import { differenceInSeconds } from 'date-fns'
import type { Protocol } from 'puppeteer'

// NOTE: ここでログイン情報を取得する。現在はダミー
const loginData: Target[] = data

type CrawlResult = {
  urls: string[]
  cookies: Protocol.Network.Cookie[]
}

const crawlResultDefault: CrawlResult = {
  urls: [],
  cookies: []
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

  const crawlResult: CrawlResult = crawlResultDefault

  crawlResult.cookies = await page.getCookies()

  // クローリングを開始
  crawlResult.urls = await page.crawler.passiveCrawl(options)

  if (options.userOptions.isActiveCrawl) {
    const activeCrawlResultUrls = await page.crawler.activeCrawl(options)
    crawlResult.urls = [
      ...new Set(crawlResult.urls.concat(activeCrawlResultUrls))
    ]
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
