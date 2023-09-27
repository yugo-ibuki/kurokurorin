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
  readonly #options: CrawlOptionsType

  constructor(page: PuppeteerPage, options: CrawlOptionsType) {
    this.#page = page
    this.#options = options
  }

  public async shallowCrawl(): Promise<string[]> {
    await this.#page.goto(this.#options.userOptions.crawlStartUrl, {
      waitUntil: ['load']
    })
    return await shallowCrawl(this.#page, [], this.#options)
  }

  public async deepCrawl() {
    const activeCrawlResult = await deepCrawl(this.#page, [], this.#options)
    console.log(activeCrawlResult)
    console.log('active crawl done')
    return []
  }
}
