import { formatDistanceToNow, intlFormatDistance } from "date-fns"

export function relativeDate(date: Date | string) {
  date = new Date(date)

  return formatDistanceToNow(date, {
    addSuffix: true
  })
}