import { getCommandOptions } from '@packages/Command/crawl'

/**
 * クローリングに必要なオプション
 */
export type CrawlOptionsType = {
  /** クローリングを開始した時刻 */
  startTime: Date
  /** ユーザーが指定するオプション */
  userOptions: {
    /** クローリングを行う時間 */
    crawlTerm: number
    /** 動的クローリングを行うかについてのフラグ */
    isDeepCrawl: boolean
    /** クローリングを開始する URL */
    crawlStartUrl: string
    /** 許可するドメイン */
    allowedDomain: string
    /** ログイン処理が必要かどうか */
    hasLoginProcess: boolean
    /** ログイン情報を記述したJSON */
    loginJson: object
  }
}

/**
 * オプションを取得する
 * @returns クローリングに必要なオプション
 */
export const CrawlOptions = (): CrawlOptionsType => {
  const commandOptions = getCommandOptions()
  return {
    startTime: new Date(),
    userOptions: commandOptions
  }
}
