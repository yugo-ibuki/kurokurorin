import type { Browser as PuppeteerBrowser } from 'puppeteer'
import type { Page as PuppeteerPage } from 'puppeteer'
import type { Target } from '../../libs/login.ts'
import { login } from '../../libs/login.ts'

export class Page {
  private readonly _page: PuppeteerPage

  private constructor(page: PuppeteerPage) {
    this._page = page
  }

  static async createPage(browser: PuppeteerBrowser): Promise<Page> {
    const page = await browser.newPage()
    return new Page(page)
  }

  public async login(loginData: Target[]) {
    return await login(this._page, loginData)
  }

  public async getCookies() {
    return await this._page.cookies()
  }

  public async close() {
    await this._page.close()
  }
}
