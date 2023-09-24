import type { Command } from 'commander'
import { program } from 'commander'

/** shallow コマンド */
export const createCrawlCommand = (): Command => {
  return (
    program
      /** バージョンの設定 */
      .version('1.0.0')
      /** コマンドの設定 */
      .command('crawl')
  )
}
