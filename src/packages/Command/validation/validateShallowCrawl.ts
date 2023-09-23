import { z } from 'zod'
import { crawlTypeSchema } from './validateCrawlType'

/** スキーマ */
export const optionsShallowSchema = z.object({
  type: crawlTypeSchema,
  crawlTerm: z.number().int().positive().min(1).max(60)
})

/** スキーマの型 */
export type Options = z.infer<typeof optionsShallowSchema>

/** バリデーション */
export const validateShallowCrawl = (options: Options): boolean => {
  try {
    const parsed = optionsShallowSchema.safeParse(options)
    return parsed.success
  } catch (e) {
    console.error(e)
    return false
  }
}
