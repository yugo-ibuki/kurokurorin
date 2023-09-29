import type { Command } from 'commander'
import { program } from 'commander'
import type { CrawlOptionsType } from '@config/CrawlOptions'

/**
 * Create Crawl Command
 * @returns - crawl command object
 */
const createCrawlCommand = (): Command => {
  const cmd = program
    /** Version */
    .version('1.0.0')

  /** Options */
  cmd
    .option(
      '--allowedDomain <allowedDomain>',
      'Domain to be allowed for requesting',
      'localhost'
    )
    .option('--crawlTerm <crawlTerm>', 'Time to crawl in seconds', '600')
    .option(
      '--crawlStartUrl <crawlStartUrl>',
      'Start URL to crawl',
      'http://localhost:3333'
    )
    .option('--crawlType <crawlType>', 'Type of crawl', 'shallow')
    .option(
      '--loginJson <loginJson>',
      'Path to JSON file that describes login information'
    )

  return cmd
}

export const getCommandOptions = (): CrawlOptionsType['userOptions'] => {
  const cmd = createCrawlCommand()
  cmd.parse(process.argv)
  const options = cmd.opts()
  return {
    crawlTerm: options.crawlTerm,
    isDeepCrawl: options.crawlType === 'deep',
    crawlStartUrl: options.crawlStartUrl,
    allowedDomain: options.allowedDomain,
    hasLoginProcess: !!options.loginJson,
    loginJson: options.loginJson
  }
}
