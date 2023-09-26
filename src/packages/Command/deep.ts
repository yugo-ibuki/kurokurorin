import { createCrawlCommand } from './crawl'
import { Command } from 'commander'

const deepCommand = createCrawlCommand()

export const deepCommandParse = () => {
  /** deep crawl コマンド */
  const cmd = deepCommand
    .addCommand(
      new Command('deep')
        .description('細部へのクローリングを行います。')
        .argument(
          '<crawlStartUrl>',
          'クローリングを開始する URL を指定します。'
        )
    )
    .option(
      '--loginJson <loginJson>',
      'ログイン情報を記述したJSONファイルのパスを指定します。'
    )

  const parsed = cmd.parse(process.argv)
  return parsed.opts()
}

console.log('deepCommand done')
