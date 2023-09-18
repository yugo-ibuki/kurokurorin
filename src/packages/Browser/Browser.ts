import type { Browser as PuppeteerBrowser } from 'puppeteer'
import { launch } from 'puppeteer'
import { BrowserConfig } from '@config/BrowserConfig'
import { Page } from '@packages/Page'

interface BrowserInterface {
  createPage(): Promise<Page>
  close(): Promise<void>
}

export class Browser implements BrowserInterface {
  private readonly browser: PuppeteerBrowser

  private constructor(browser: PuppeteerBrowser) {
    this.browser = browser
  }

  /**
   * Browserを作成するファクトリーメソッド
   */
  static async create() {
    const browser = await launch(BrowserConfig)
    return new Browser(browser)
  }

  /**
   * Pageを作成する
   */
  public async createPage(): Promise<Page> {
    return await Page.createPage(this.browser)
  }

  /**
   * Browserを閉じる
   */
  public async close() {
    await this.browser.close()
  }
}
