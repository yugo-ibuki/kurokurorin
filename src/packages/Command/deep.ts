import { createCrawlCommand } from './crawl'

const deepCommand = createCrawlCommand()

/** deep crawl コマンド */
deepCommand
  .createCommand('deep')
  .description('細部へのクローリングを行います。')
  .option(
    '--crawlTerm <crawlTerm>',
    'クローリングを行う時間を指定します。',
    '60'
  )
  .option(
    '--allowedDomain <allowedDomain>',
    '許可するドメインを指定します。',
    'localhost'
  )
  .option(
    '--hasLoginProcess <hasLoginProcess>',
    'ログイン処理が必要かどうかを指定します。',
    'false'
  )

deepCommand.parse(process.argv)
console.log('deepCommand done')
