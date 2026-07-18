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