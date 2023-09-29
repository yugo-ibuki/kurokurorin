import type { PuppeteerLaunchOptions } from 'puppeteer'

const isHeadless = true

export const BrowserConfig: PuppeteerLaunchOptions = {
  headless: isHeadless ? 'new' : false,
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito']
}
