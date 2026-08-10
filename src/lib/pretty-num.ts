export function prettyNum(val: number, unitIfZero: 'k' | 'M' | 'G' = 'k', suffix: string = '',) {
  if (val >= 1_000_000_000_000) return round2dp(val / 1_000_000_000_000) + ' T' + suffix
  if (val >= 1_000_000_000) return round2dp(val / 1_000_000_000) + ' G' + suffix
  if (val >= 1_000_000) return round2dp(val / 1_000_000) + ' M' + suffix
  if (val >= 1_000) return round2dp(val / 1_000) + ' k' + suffix
  if (val === 0) return '0.00 ' + unitIfZero + suffix
  return round2dp(val) + ' ' + suffix
}

export function round2dp(val: number) {
  return (Math.round(val * 100) / 100).toFixed(2)
}

export function fixedNum(val: number) {
  const floored = Math.floor(val)
  const decimal = val - floored
  return `${ floored.toLocaleString('en-US') }.${ String(Math.round(decimal * 1000)).padStart(3, '0') }`
}

// https://stackoverflow.com/a/31615643
export function ordinal(n: number) {
  var s = [ "th", "st", "nd", "rd" ],
    v = n % 100
  return n + (s[ (v - 20) % 10 ] || s[ v ] || s[ 0 ])
}