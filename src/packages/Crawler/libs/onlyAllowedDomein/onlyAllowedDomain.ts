/**
 * Restrict URLs to only those allowed by the domain.
 * @param urls
 * @param allowedDomain
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
