import puppeteer from 'puppeteer'
import type { Target } from './libs/login.ts'
import { login } from './libs/login.ts'
import { data } from './fixtures/login'

const loginData: Target[] = data

const main = async () => {
  const browser = await puppeteer.launch({
    // headless: 'new',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito']
  })
  const page = await browser.newPage()

  const ok = await login(page, loginData)
  if (!ok) {
    await page.close()
    await browser.close()
    throw new Error('login failed')
  }

  const cookies = await page.cookies()
  console.log(cookies)

  await page.close()
  await browser.close()
}

main()
