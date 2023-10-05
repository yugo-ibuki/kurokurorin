import { afterAll, beforeAll, describe, expect } from 'vitest'
import { scrapeActionElements } from './scrapeActionElements'
import type { Page, Browser } from 'puppeteer'
import { launch } from 'puppeteer'
import { fixtures } from './fixtures'

const selectExpected = `
      <select>
        <option value="1">option1</option>
        <option value="2">option2</option>
      </select>
    `
  .replace(/\>\s+\</g, '><')
  .trim()

describe('scrapeActionElements', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch({
      headless: true,
      args: ['--no-sandbox']
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  test('check getting DOM', async () => {
    await page.setContent(fixtures)
    const result = await scrapeActionElements(page)
    expect(result[0]).toBe('<button>button</button>')
    expect(result[1]).toBe('<input type="text">')
    expect(result[2]).toEqual(selectExpected)
    expect(result[3]).toBe('<textarea>textarea text</textarea>')
  })
})
