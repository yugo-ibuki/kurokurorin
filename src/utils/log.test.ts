import { describe, expect, vi } from 'vitest'
import { Log } from './log'
import * as chalk from 'chalk'

describe('log', () => {
  vi.mock('chalk', () => {
    return {
      blue: vi.fn(),
      yellow: vi.fn(),
      red: vi.fn(),
      bgGray: vi.fn()
    }
  })

  test('logger info: チョークが呼ばれていること', () => {
    Log.info('info')
    expect(chalk.blue).toHaveBeenCalled()
  })

  test('logger warn: チョークが呼ばれていること', () => {
    Log.warn('warn')
    expect(chalk.yellow).toHaveBeenCalled()
  })

  test('logger error: チョークが呼ばれていること', () => {
    Log.error('error')
    expect(chalk.red).toHaveBeenCalled()
  })

  test('logger request: チョークが呼ばれていること', () => {
    Log.request('request')
    expect(chalk.bgGray).toHaveBeenCalled()
  })
})
