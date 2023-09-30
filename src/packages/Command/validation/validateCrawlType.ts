import { z } from 'zod'

/** スキーマ */
export const crawlTypeSchema = z.union([
  z.literal('shallow'),
  z.literal('other')
])

export const crawlTypeObjectSchema = z.object({
  crawlType: crawlTypeSchema
})

/** スキーマの型 */
export type CrawlType = z.infer<typeof crawlTypeObjectSchema>

/** バリデーション */
export const validateCrawlType = (crawlType: CrawlType): boolean => {
  try {
    const parsed = crawlTypeObjectSchema.safeParse(crawlType)
    return parsed.success
  } catch (e) {
    console.error(e)
    return false
  }
}
