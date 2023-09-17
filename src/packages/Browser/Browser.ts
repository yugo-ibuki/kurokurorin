import type { Browser as PuppeteerBrowser } from 'puppeteer'
import { launch } from 'puppeteer'
import { BrowserConfig } from '../../config/BrowserConfig.ts'
import { Page } from '../Page'

interface BrowserInterface {
  createPage(): Promise<Page>
  close(): Promise<void>
}

export class Browser implements BrowserInterface {
  private readonly browser: PuppeteerBrowser

  private constructor(browser: PuppeteerBrowser) {
    this.browser = browser
  }

  static async create() {
    const browser = await launch(BrowserConfig)
    return new Browser(browser)
  }

  public async createPage(): Promise<Page> {
    return await Page.createPage(this.browser)
  }

  public async close() {
    await this.browser.close()
  }
}
