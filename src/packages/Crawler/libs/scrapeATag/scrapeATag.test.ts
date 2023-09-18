import { fixtures } from './fixtures.ts'
import { scrapeATag } from './scrapeATag'
import { afterAll, beforeAll, expect } from 'vitest'
import type { Page, Browser } from 'puppeteer'
import { launch } from 'puppeteer'
import { BrowserConfig } from '@config/BrowserConfig'

describe('scrapeATag test', function () {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(BrowserConfig)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  test('Expected Behavior', async () => {
    await page.setContent(fixtures)
    const result = await scrapeATag(page)
    console.log(result)
    expect(result).toEqual([
      'https://example.com/',
      'https://example.com/1',
      'https://example.com/2',
      'https://example2.com/1'
    ])
    expect(1).toBe(1)
  })
})
