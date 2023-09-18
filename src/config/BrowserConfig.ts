import type { PuppeteerLaunchOptions } from 'puppeteer'

export const BrowserConfig: PuppeteerLaunchOptions = {
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito']
}
