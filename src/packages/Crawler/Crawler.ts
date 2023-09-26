import type { Page as PuppeteerPage } from 'puppeteer'
import { shallowCrawl } from './shallowCrawl'
import type { CrawlOptionsType } from '@config/CrawlOptions'
import { deepCrawl } from 'packages/Crawler/deepCrawl'

interface CrawlerInterface {
  shallowCrawl(options: CrawlOptionsType): Promise<string[]>
  deepCrawl(options: CrawlOptionsType): Promise<string[]>
}

export class Crawler implements CrawlerInterface {
  readonly #page: PuppeteerPage

  constructor(page: PuppeteerPage) {
    this.#page = page
  }

  public async shallowCrawl(options: CrawlOptionsType): Promise<string[]> {
    await this.#page.goto(options.userOptions.crawlStartUrl, {
      waitUntil: ['load']
    })
    return await shallowCrawl(this.#page, [], options)
  }

  public async deepCrawl(options: CrawlOptionsType) {
    const activeCrawlResult = await deepCrawl(this.#page, [], options)
    console.log(activeCrawlResult)
    console.log('active crawl done')
    return []
  }
}
