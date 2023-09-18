import type { PuppeteerLaunchOptions } from 'puppeteer'

export const BrowserConfig: PuppeteerLaunchOptions = {
  headless: 'new',
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito']
}
