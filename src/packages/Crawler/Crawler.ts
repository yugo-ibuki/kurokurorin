import type { Page as PuppeteerPage } from 'puppeteer'
import { passiveCrawl } from './passiveCrawl'
import type { Options } from '@libs/getOptions'
import { activeCrawl } from 'packages/Crawler/activeCrawl'

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
    const activeCrawlResult = await activeCrawl(options)
    console.log(activeCrawlResult)
    console.log('active crawl done')
  }
}
