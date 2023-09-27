import type { Browser as PuppeteerBrowser } from 'puppeteer'
import { launch } from 'puppeteer'
import { BrowserConfig } from '@config/BrowserConfig'
import { Page } from '@packages/Page'
import type { CrawlOptionsType } from '@config/CrawlOptions'

interface BrowserInterface {
  createPage(): Promise<Page>
  close(): Promise<void>
}

export class Browser implements BrowserInterface {
  readonly #browser: PuppeteerBrowser
  readonly #options: CrawlOptionsType

  private constructor(browser: PuppeteerBrowser, options: CrawlOptionsType) {
    this.#browser = browser
    this.#options = options
  }

  /**
   * Browserを作成するファクトリーメソッド
   */
  static async create(options: CrawlOptionsType): Promise<Browser> {
    const browser = await launch(BrowserConfig)
    return new Browser(browser, options)
  }

  /**
   * Pageを作成する
   */
  public async createPage(): Promise<Page> {
    return await Page.createPage(this.#browser, this.#options)
  }

  /**
   * Browserを閉じる
   */
  public async close() {
    await this.#browser.close()
  }
}
