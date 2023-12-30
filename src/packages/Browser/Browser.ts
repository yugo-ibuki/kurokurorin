import type { Browser as PuppeteerBrowser } from 'puppeteer'
import { launch } from 'puppeteer'
import { BrowserConfig } from '@config/BrowserConfig'
import { Page } from '@packages/Page'
import { Context } from '@packages/Context'

interface BrowserInterface {
  createPage(): Promise<Page>
  close(): Promise<void>
}

export class Browser extends Context implements BrowserInterface {
  readonly #browser: PuppeteerBrowser

  private constructor(browser: PuppeteerBrowser) {
    super()
    this.#browser = browser
  }

  /**
   * Factory Method to create Browser
   */
  static async create(): Promise<Browser> {
    const browser = await launch(BrowserConfig)
    // browser is private, so it should be set on constructor
    return new Browser(browser)
  }

  /**
   * Create Page
   */
  public async createPage(): Promise<Page> {
    return await Page.createPage(this.#browser, this.options)
  }

  /**
   * Close Browser
   */
  public async close() {
    await this.#browser.close()
  }
}
