export type Options = {
  startTime: number
  userOptions: {
    crawlingTime: number
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
