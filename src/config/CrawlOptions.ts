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
      crawlTerm: 60, // 1 minute
      isDeepCrawl: true,
      // crawlStartUrl: 'https://security-crawl-maze.app/',
      crawlStartUrl: 'http://localhost:3333',
      // allowedDomain: 'security-crawl-maze.app',
      allowedDomain: 'localhost',
      hasLoginProcess: true
    }
  }
}
