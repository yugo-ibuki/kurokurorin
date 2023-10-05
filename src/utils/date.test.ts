import { describe, vi } from 'vitest'
import { formatDate, checkTimeIsUp } from './date'

describe('date', () => {
  test('date', () => {
    // same
    const valid_result = formatDate(new Date('2021/01/01 00:00:00'))
    expect(valid_result).toBe('2021-01-01 00:00:00')

    // different
    const invalid_result = formatDate(new Date('2021/01/01 00:00:01'))
    expect(invalid_result).not.toBe('2021-01-01 00:00:00')
  })

  test('checkTimeIsUp', () => {
    vi.useFakeTimers()
    const now = new Date('2021/01/01 09:00:00')
    vi.setSystemTime(now)

    const valid_result = checkTimeIsUp('2021/01/01 08:50:00', 600) // 10 min
    // just 10 min
    expect(valid_result).toBe(true)

    const invalid_result = checkTimeIsUp('2021/01/01 08:50:01', 600) // 10 min 1 sec
    // over 10 min by 1 sec
    expect(invalid_result).toBe(false)
  })
})
