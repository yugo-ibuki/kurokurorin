import type { Browser as PuppeteerBrowser } from 'puppeteer'
import type { Page as PuppeteerPage } from 'puppeteer'
import type { Target } from '@libs/login'
import { login } from '@libs/login'
import { Crawler } from '@packages/Crawler'

interface PageInterface {
  login(loginData: Target[]): Promise<boolean>
  getCookies(): Promise<unknown>
  close(): Promise<void>
}

export class Page implements PageInterface {
  readonly #page: PuppeteerPage
  readonly #crawler: Crawler

  private constructor(page: PuppeteerPage) {
    this.#page = page
    this.#crawler = new Crawler(this.#page)
  }

  /**
   * Pageを作成する
   * @param browser
   */
  static async createPage(browser: PuppeteerBrowser): Promise<Page> {
    const page = await browser.newPage()
    return new Page(page)
  }

  /**
   * ログインを行う
   * @param loginData
   */
  public async login(loginData: Target[]) {
    try {
      return await login(this.#page, loginData)
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Cookieを取得する
   */
  public async getCookies() {
    return await this.#page.cookies()
  }

  /**
   * ページを閉じる
   */
  public async close() {
    await this.#page.close()
  }

  /**
   * Crawlerを行う際のgetter
   */
  get crawler() {
    return this.#crawler
  }
}
