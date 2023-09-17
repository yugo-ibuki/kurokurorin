type Options = {
  isPassiveCrawl: boolean
}

/**
 * オプションを取得する
 * @returns クローリングに必要なオプション
 */
export const getOptions = (): Options => {
  return {
    isPassiveCrawl: true
  }
}
