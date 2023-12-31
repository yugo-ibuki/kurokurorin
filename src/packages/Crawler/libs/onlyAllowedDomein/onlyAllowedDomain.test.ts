import { onlyAllowedDomain } from './onlyAllowedDomain'
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
      name: 'Restrict URLs to only those allowed by the domain.',
      args: {
        urls: [
          'https://test.invalid/1',
          'https://test.invalid/2',
          'https://test2.invalid/1'
        ],
        allowedDomain: 'test.invalid'
      },
      expected: ['https://test.invalid/1', 'https://test.invalid/2']
    },
    {
      name: 'includes invalid URL',
      args: {
        urls: ['https://test.invalid/1', 'invalid'],
        allowedDomain: 'test.invalid'
      },
      expected: ['https://test.invalid/1']
    }
  ]

  test.each(cases)('%s', async ({ args, expected }) => {
    const result = await onlyAllowedDomain(args.urls, args.allowedDomain)
    expect(result).toEqual(expected)
  })
})
