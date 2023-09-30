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
  #visitedUrls: string[] = []

  constructor(page: PuppeteerPage, options: CrawlOptionsType) {
    this.#page = page
    this.#options = options
  }

  public async shallowCrawl(): Promise<string[]> {
    await this.firstPageCrawl()
    this.#visitedUrls = await shallowCrawl(this.#page, [], this.#options)
    return this.#visitedUrls
  }

  public async deepCrawl(): Promise<string[]> {
    await this.firstPageCrawl()
    this.#visitedUrls = await deepCrawl(this.#page, [], this.#options)
    return this.#visitedUrls
  }

  private async firstPageCrawl(): Promise<void> {
    await this.#page.goto(this.#options.userOptions.crawlStartUrl, {
      waitUntil: ['networkidle0']
    })
  }

  get visitedUrls(): string[] {
    return this.#visitedUrls
  }
}
