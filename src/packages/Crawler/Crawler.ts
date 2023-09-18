import type { Page as PuppeteerPage } from 'puppeteer'
import { passiveCrawl } from './passiveCrawl'
import type { CrawlOptionsType } from '@config/CrawlOptions'
import { activeCrawl } from 'packages/Crawler/activeCrawl'

interface CrawlerInterface {
  passiveCrawl(options: CrawlOptionsType): Promise<string[]>
  activeCrawl(options: CrawlOptionsType): Promise<string[]>
}

export class Crawler implements CrawlerInterface {
  readonly #page: PuppeteerPage

  constructor(page: PuppeteerPage) {
    this.#page = page
  }

  public async passiveCrawl(options: CrawlOptionsType): Promise<string[]> {
    await this.#page.goto(options.userOptions.crawlStartUrl, {
      waitUntil: ['load', 'domcontentloaded']
    })
    return await passiveCrawl(this.#page, [], options)
  }

  public async activeCrawl(options: CrawlOptionsType) {
    const activeCrawlResult = await activeCrawl(options)
    console.log(activeCrawlResult)
    console.log('active crawl done')
    return []
  }
}
