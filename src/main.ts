import type { Target } from '@libs/login'
import { data } from '@libs/login/fixtures/loginData'
import { Browser } from '@packages/Browser'
import { CrawlOptions } from '@config/CrawlOptions'

const loginData: Target[] = data

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

  if (options.userOptions.isPassiveCrawl) {
    const passiveResult = await page.crawler.passiveCrawl(options)
    console.log(passiveResult)
  } else {
    const activeResult = await page.crawler.activeCrawl(options)
    console.log(activeResult)
  }

  await page.close()
  await browser.close()
}

main()
