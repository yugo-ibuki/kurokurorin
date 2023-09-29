import { describe, expect, vi } from 'vitest'
import { Log } from './log'
import * as chalk from 'chalk'

describe('log', () => {
  vi.mock('chalk', () => {
    return {
      cyan: vi.fn(),
      yellow: vi.fn(),
      red: vi.fn(),
      bgGray: vi.fn()
    }
  })

  test('logger info: chalk should be called', () => {
    Log.info('info')
    expect(chalk.cyan).toHaveBeenCalled()
  })

  test('logger warn: chalk should be called', () => {
    Log.warn('warn')
    expect(chalk.yellow).toHaveBeenCalled()
  })

  test('logger error: chalk should be called', () => {
    Log.error('error')
    expect(chalk.red).toHaveBeenCalled()
  })

  test('logger request: chalk should be called', () => {
    Log.request('request')
    expect(chalk.bgGray).toHaveBeenCalled()
  })
})
