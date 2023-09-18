/**
 * クローリングに必要なオプション
 */
export type CrawlOptionsType = {
  /** クローリングを開始した時刻 */
  startTime: Date
  /** ユーザーが指定するオプション */
  userOptions: {
    /** クローリングを行う時間 */
    crawlingTime: number
    /** 静的クローリングを行うかどうか: デフォルトをアクティブクローリングにする */
    isPassiveCrawl: boolean
    /** クローリングを開始する URL */
    crawlStartUrl: string
    /** 許可するドメイン */
    allowedDomain: string
    /** ログイン処理が必要かどうか */
    hasLoginProcess: boolean
  }
}

/**
 * オプションを取得する
 * @returns クローリングに必要なオプション
 */
export const CrawlOptions = (): CrawlOptionsType => {
  return {
    startTime: new Date(),
    userOptions: {
      crawlingTime: 60,
      isPassiveCrawl: true,
      crawlStartUrl: 'https://security-crawl-maze.app/',
      allowedDomain: 'security-crawl-maze.app',
      hasLoginProcess: false
    }
  }
}
