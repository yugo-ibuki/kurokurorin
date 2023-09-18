/**
 * クローリングに必要なオプション
 */
export type Options = {
  /** クローリングを開始した時刻 */
  startTime: number
  /** ユーザーが指定するオプション */
  userOptions: {
    /** クローリングを行う時間 */
    crawlingTime: number
    /** 静的クローリングを行うかどうか: デフォルトをアクティブクローリングにする */
    isPassiveCrawl: boolean
  }
}

/**
 * オプションを取得する
 * @returns クローリングに必要なオプション
 */
export const getOptions = (): Options => {
  return {
    startTime: Date.now(),
    userOptions: {
      crawlingTime: 60,
      isPassiveCrawl: true
    }
  }
}
