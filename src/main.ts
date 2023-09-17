// import type { Target } from './libs/login.ts'
// import { data } from './fixtures/loginData'
import { Browser } from './packages/Browser'
import { getOptions } from './libs/getOptions.ts'

// const loginData: Target[] = data

const main = async () => {
  const options = getOptions()

  const browser = await Browser.create()
  const page = await browser.createPage()

  // const isLoggedIn = await page.login(loginData)
  // if (!isLoggedIn) {
  //   console.log('ログインに失敗しました')
  //   await page.close()
  //   await browser.close()
  //   return
  // }

  const cookies = await page.getCookies()
  console.log('cookies: ', cookies)

  if (options.userOptions.isPassiveCrawl) {
    const passiveResult = await page.crawler.passiveCrawl(options)
    console.log(passiveResult)
  }

  await page.close()
  await browser.close()
}

main()
