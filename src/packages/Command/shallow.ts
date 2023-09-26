import { createCrawlCommand } from './crawl'
import { Command } from 'commander'

const shallowCommand = createCrawlCommand()

export const shallowCommandParse = () => {
  /** shallow crawl コマンド */
  const cmd = shallowCommand.addCommand(
    new Command('shallow')
      .argument('<crawlStartUrl>', 'クローリングを開始する URL を指定します。')
      .description('浅いクローリングを行います。')
  )

  const parsed = cmd.parse(process.argv)
  return parsed.opts()
}

console.log('shallowCommand done')
