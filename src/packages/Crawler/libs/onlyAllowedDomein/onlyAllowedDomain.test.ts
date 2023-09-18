import { onlyAllowedDomain } from './onlyAllowedDomain.ts'
import { expect } from 'vitest'

describe('onlyAllowedDomain', () => {
  const cases: {
    name: string
    args: {
      urls: string[]
      allowedDomain: string
    }
    expected: string[]
  }[] = [
    {
      name: '許可されているドメインのみに絞った URL に限定する',
      args: {
        urls: [
          'https://test.invalid/1',
          'https://test.invalid/2',
          'https://test2.invalid/1'
        ],
        allowedDomain: 'test.invalid'
      },
      expected: ['https://test.invalid/1', 'https://test.invalid/2']
    }
  ]

  test.each(cases)('%s', async ({ args, expected }) => {
    const result = await onlyAllowedDomain(args.urls, args.allowedDomain)
    expect(result).toEqual(expected)
  })
})
