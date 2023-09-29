import { writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { Log } from '@utils/log'

export const writeJsonToFile = async (
  // eslint-disable-next-line
  data: any,
  dirPath: string,
  filename: string
): Promise<void> => {
  const fullPath = join(dirPath, filename)

  try {
    await makeFileDir(dirname(fullPath))
    const jsonString = JSON.stringify(data, null, 2) // 2つのスペースでインデント
    await writeFile(fullPath, jsonString, 'utf8')
    Log.info(`Data has been written to ${fullPath}`)
  } catch (error) {
    console.error(`Error writing data to file: ${error}`)
  }
}

const makeFileDir = async (dirPath: string): Promise<void> => {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (err) {
    throw err
  }
}
