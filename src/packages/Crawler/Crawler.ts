import type { Page as PuppeteerPage } from 'puppeteer'

interface CrawlerInterface {
  crawl(): Promise<void>
  passiveCrawl(): Promise<void>
}

export class Crawler implements CrawlerInterface {
  private readonly _page: PuppeteerPage

  constructor(page: PuppeteerPage) {
    this._page = page
  }

  public async crawl() {
    console.log(this._page)
    console.log('crawl')
  }

  public async passiveCrawl() {
    console.log('passive crawl')
  }

  public activeCrawl() {
    console.log('active crawl')
  }
}
