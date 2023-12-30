import type { CrawlOptionsType } from '@config/CrawlOptions'

export class Context {
  private _options: CrawlOptionsType = {} as CrawlOptionsType

  /**
   * Get Options for all browser, page, and crawler
   * @returns - options
   */
  get options() {
    return this._options
  }

  /**
   * Set Options for all browser, page, and crawler
   * @param options
   */
  set options(options: CrawlOptionsType) {
    this._options = options
  }
}
