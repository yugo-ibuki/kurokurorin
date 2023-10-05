import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss', {
    locale: ja
  })
}

export const checkTimeIsUp = (startTime: string, crawlTerm: number) => {
  const startTimeDate = new Date(startTime)
  const now = new Date()
  const difference = now.getTime() - startTimeDate.getTime()
  return difference >= crawlTerm * 1000
}
