import type { Target } from './libs/login.ts'
import { data } from './fixtures/loginData'
import { Browser } from './packages/Browser'

const loginData: Target[] = data

const main = async () => {
  const browser = await Browser.create()
  const page = await browser.createPage()

  const isLoggedIn = await page.login(loginData)
  if (!isLoggedIn) {
    console.log('ログインに失敗しました')
    await page.close()
    await browser.close()
    return
  }

  const cookies = await page.getCookies()
  console.log(cookies)

  // クローリングをここで行う

  await page.close()
  await browser.close()
}

main()
