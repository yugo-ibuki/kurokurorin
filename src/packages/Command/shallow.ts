import { createCrawlCommand } from './crawl'

const shallowCommand = createCrawlCommand()

/** shallow crawl コマンド */
shallowCommand
  .createCommand('shallow')
  .description('浅いクローリングを行います。')
  .argument('<crawlStartUrl>', 'クローリングのスタート地点を指定します。')
  .option(
    '--crawlTerm <crawlTerm>',
    'クローリングを行う時間を指定します。',
    '60'
  )
  .option(
    '--isDeepCrawl <isDeepCrawl>',
    '動的クローリングを行うかどうかを指定します。',
    'false'
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
  .action((crawlStartUrl, opts) => {
    console.log('crawlStartUrl: ', crawlStartUrl)
    console.log('opts: ', opts)
  })
  .action((crawlStartUrl) => {
    console.log(crawlStartUrl)
  })

shallowCommand.parse(process.argv)
console.log('shallowCommand done')
