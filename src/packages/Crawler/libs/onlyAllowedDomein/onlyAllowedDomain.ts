/**
 * 許可されてるドメインのみに絞った URL に限定する。
 * @param urls - 対象となるURL
 * @param allowedDomain - 許可されているドメイン
 */
export const onlyAllowedDomain = async (
  urls: string[],
  allowedDomain: string
): Promise<string[]> => {
  return urls
    .filter((url) => {
      const origin = new URL(url).origin
      return origin.includes(allowedDomain) ? url : undefined
    })
    .filter((url) => url) // undefined 排除
}
