import type { Browser as PuppeteerBrowser } from 'puppeteer'
import type { Page as PuppeteerPage } from 'puppeteer'
import type { Target } from '@libs/login'
import { login } from '@libs/login'
import { Crawler } from '@packages/Crawler'
import { Log } from '@utils/log'
import type { CrawlOptionsType } from '@config/CrawlOptions'

type InitialSetup = {
  setRequestHook: boolean
}

const initialSetupDefaultParams: InitialSetup = {
  setRequestHook: false
}

interface PageInterface {
  login(loginData: Target[]): Promise<boolean>
  getCookies(): Promise<unknown>
  close(): Promise<void>
  initialSetup(initialSetupDefaultParams: InitialSetup): Promise<void>
}

export class Page implements PageInterface {
  readonly #page: PuppeteerPage
  readonly #crawler: Crawler
  readonly #options: CrawlOptionsType

  private constructor(page: PuppeteerPage, options: CrawlOptionsType) {
    this.#page = page
    this.#options = options
    this.#crawler = new Crawler(this.#page, this.#options)
  }

  /**
   * Pageを作成する
   * @param browser
   * @param options
   */
  static async createPage(
    browser: PuppeteerBrowser,
    options: CrawlOptionsType
  ): Promise<Page> {
    const page = await browser.newPage()
    return new Page(page, options)
  }

  /**
   * ログインを行う
   * @param loginData
   */
  public async login(loginData: Target[]) {
    try {
      console.log('login start')
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

  /**
   * ブラウザに埋め込ませる処理の初期設定
   */
  public async initialSetup(params: InitialSetup = initialSetupDefaultParams) {
    if (params.setRequestHook) {
      await this.requestHook()
    }
  }

  /**
   * リクエストを送る時のhookを page にセットする
   */
  private async requestHook() {
    this.#page.on('request', (request) => {
      Log.request('url: ' + request.url(), 'method: ' + request.method())
    })
  }
}
