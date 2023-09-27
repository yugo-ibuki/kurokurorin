import type { Command } from 'commander'
import { program } from 'commander'
import type { CrawlOptionsType } from '@config/CrawlOptions'

/** コマンド作成 */
const createCrawlCommand = (): Command => {
  const cmd = program
    /** バージョンの設定 */
    .version('1.0.0')

  /** オプション */
  cmd
    .option(
      '--allowedDomain <allowedDomain>',
      '許可するドメインを指定します。',
      'localhost'
    )
    .option(
      '--crawlTerm <crawlTerm>',
      'クローリングを行う時間を指定します。',
      '60'
    )
    .option(
      '--crawlStartUrl <crawlStartUrl>',
      'クローリングを開始する URL を指定します。',
      'http://localhost:3333'
    )
    .option('--crawlType <crawlType>', 'クローリングの種類を指定します。')
    .option(
      '--loginJson <loginJson>',
      'ログイン情報を記述したJSONファイルのパスを指定します。'
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
