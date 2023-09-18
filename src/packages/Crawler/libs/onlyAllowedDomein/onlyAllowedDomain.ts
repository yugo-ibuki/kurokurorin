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
      const host = new URL(url).host
      return host.includes(allowedDomain) ? url : undefined
    })
    .filter((url) => url) // undefined を除外
}
