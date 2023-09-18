import type { Page as PuppeteerPage } from 'puppeteer'
import { passiveCrawl } from './libs/passiveCrawl'
import type { Options } from '@libs/getOptions'

interface CrawlerInterface {
  passiveCrawl(options: Options): Promise<string[]>
  activeCrawl(options: Options): Promise<void>
}

export class Crawler implements CrawlerInterface {
  private readonly _page: PuppeteerPage

  constructor(page: PuppeteerPage) {
    this._page = page
  }

  public async passiveCrawl(options: Options): Promise<string[]> {
    await this._page.goto('https://security-crawl-maze.app/')
    return await passiveCrawl(this._page, [], options)
  }

  public async activeCrawl(options: Options) {
    console.log(this._page)
    console.log(options)
    console.log('active crawl')
  }
}
