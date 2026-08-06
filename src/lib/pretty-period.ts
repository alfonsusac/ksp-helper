export function prettyPeriod(secs: number) {
  const flooredSeconds = Math.floor(secs)

  const SECONDS_IN_A_MINUTE = 60
  const SECONDS_IN_AN_HOUR = SECONDS_IN_A_MINUTE * 60
  const SECONDS_IN_A_DAY = SECONDS_IN_AN_HOUR * 6
  const SECONDS_IN_A_YEAR = SECONDS_IN_A_DAY * 426

  let remainder = 0

  const yearsPart = Math.floor(flooredSeconds / SECONDS_IN_A_YEAR)
  remainder = flooredSeconds % SECONDS_IN_A_YEAR

  const daysPart = Math.floor(remainder / SECONDS_IN_A_DAY)
  remainder = remainder % SECONDS_IN_A_DAY

  const hoursPart = Math.floor(remainder / SECONDS_IN_AN_HOUR)
  remainder = remainder % SECONDS_IN_AN_HOUR

  const minutesPart = Math.floor(remainder / SECONDS_IN_A_MINUTE)
  remainder = remainder % SECONDS_IN_A_MINUTE

  const secondsPart = remainder % 60
  const milisecondsPart = Math.round((secs - flooredSeconds) * 1000_000) / 1000

  const formatted = (() => {
    if (yearsPart > 0) return `${ yearsPart }y, ${ daysPart }d, ${ hoursPart }h, ${ minutesPart }m, ${ secondsPart }s, ${ milisecondsPart }ms`
    if (daysPart > 0) return `${ daysPart }d, ${ hoursPart }h, ${ minutesPart }m, ${ secondsPart }s, ${ milisecondsPart }ms`
    if (hoursPart > 0) return `${ hoursPart }h, ${ minutesPart }m, ${ secondsPart }s, ${ milisecondsPart }ms`
    if (minutesPart > 0) return `${ minutesPart }m, ${ secondsPart }s, ${ milisecondsPart }ms`
    if (secondsPart > 0) return `${ secondsPart }s, ${ milisecondsPart }ms`
    if (milisecondsPart > 0) return `${ milisecondsPart }ms`
  })()

  return {
    yearsPart,
    hoursPart,
    minutesPart,
    daysPart,
    secondsPart,
    milisecondsPart,
    formatted
  }
}

// y d h m s