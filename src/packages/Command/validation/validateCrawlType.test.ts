import type { CrawlType } from './validateCrawlType'
import { validateCrawlType } from './validateCrawlType'

describe('validate', function () {
  it('options バリデーション 成功', function () {
    /** テスト用の正しいオプション */
    const crawlType: CrawlType = 'shallow'
    const isValid = validateCrawlType(crawlType)
    expect(isValid).toBe(true)
  })

  it('options バリデーション 失敗', function () {
    /** テスト用の不正なオプション */
    const invalidOptions = 'invalid' as CrawlType
    const isValid = validateCrawlType(invalidOptions)
    expect(isValid).toBe(false)
  })
})
