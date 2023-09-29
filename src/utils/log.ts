import * as chalk from 'chalk'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogType = (...data: any[]) => void

interface LogInterface {
  info: LogType
  warn: LogType
  error: LogType
  request: LogType
}

export const Log: LogInterface = {
  info: (...data) => infoLog(data),
  warn: (...data) => warnLog(data),
  error: (...data) => errorLog(data),
  request: (...data) => requestLog(data)
}

const infoLog: LogType = (data) => {
  console.info(chalk.cyan('I: '), ...data)
}

const warnLog: LogType = (data) => {
  console.warn(chalk.yellow('W: '), ...data)
}

const errorLog: LogType = (data) => {
  console.error(chalk.red('E: '), ...data)
}

const requestLog: LogType = (data) => {
  console.log(chalk.bgGray('R: '), ...data)
}
