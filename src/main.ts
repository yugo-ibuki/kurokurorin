import type { Target } from '@libs/login'
import { data } from '@libs/login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'
import { writeJsonToFile } from '@utils/writeJsonToFile'
import { differenceInSeconds } from 'date-fns'
import type { Protocol } from 'puppeteer'
import { concatArraysAndWillBeUnique } from '@utils/concatArraysAndWillBeUnique'

// NOTE: ここでログイン情報を取得する。現在はダミー
const loginData: Target[] = data

/**
 * クローリング結果の型
 */
type CrawlResult = {
  urls: string[]
  cookies: Protocol.Network.Cookie[]
}

/**
 * クローリング結果を格納するオブジェクトのデフォルト値
 */
const crawlResultDefault: CrawlResult = {
  urls: [],
  cookies: []
}

const main = async () => {
  const options = CrawlOptions()
  const {
    startTime,
    userOptions: { hasLoginProcess, isDeepCrawl }
  } = options

  const browser = await Browser.create()
  const page = await browser.createPage()
  await page.initialSetup({
    setRequestHook: true
  })

  if (hasLoginProcess) {
    const isLoggedIn = await page.login(loginData)
    if (!isLoggedIn) {
      console.log('ログインに失敗しました')
      await page.close()
      await browser.close()
      return
    }
  }

  // 最終的な結果となるオブジェクト
  const crawlResult: CrawlResult = crawlResultDefault

  // クッキーをセット
  crawlResult.cookies = await page.getCookies()

  // クローリングを開始
  const passiveCrawlResultUrls = await page.crawler.shallowCrawl(options)
  if (isDeepCrawl) {
    const activeCrawlUrls = await page.crawler.deepCrawl(options)
    crawlResult.urls = concatArraysAndWillBeUnique(
      passiveCrawlResultUrls,
      activeCrawlUrls
    )
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

  console.log(`Done in ${differenceInSeconds(new Date(), startTime)} s`)
}

main()
