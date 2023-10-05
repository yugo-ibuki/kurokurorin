import { getCommandOptions } from '@packages/Command/crawl'
import { formatDate } from '@utils/date'

/**
 * Required options for crawling
 */
export type CrawlOptionsType = {
  /** Crawling Start Time */
  startTime: string
  /** Options the user set */
  userOptions: {
    /** Crawling time */
    crawlTerm: number
    /** Flag for powerful crawl */
    isDeepCrawl: boolean
    /** Url to start with */
    crawlStartUrl: string
    /** Domain to be allowed to crawl  */
    allowedDomain: string
    /** If it's true, then you need to set loginJson */
    hasLoginProcess: boolean
    /** JSON file path that has the login data */
    loginJson: object
  }
}

/**
 * Get options for crawling
 * @returns - Options Required for Crawling
 */
export const CrawlOptions = (): CrawlOptionsType => {
  const commandOptions = getCommandOptions()
  return {
    startTime: formatDate(new Date()),
    userOptions: commandOptions
  }
}
