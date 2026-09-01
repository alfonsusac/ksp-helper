export function prettyNum(val: number, unitIfZero: 'k' | 'M' | 'G' | '' = 'k', suffix: string = '', dp: 0 | 2 = 2) {
  if (val >= 1_000_000_000_000) return roundDp(val / 1_000_000_000_000) + ' T' + suffix
  if (val >= 1_000_000_000) return roundDp(val / 1_000_000_000) + ' G' + suffix
  if (val >= 1_000_000) return roundDp(val / 1_000_000) + ' M' + suffix
  if (val >= 1_000) return roundDp(val / 1_000) + ' k' + suffix
  if (val === 0) return (0).toFixed(dp) + unitIfZero + suffix
  return roundDp(val, dp) + ' ' + suffix
}

export function roundDp(val: number, dp: 0 | 2 = 2) {
  // if (dp === 0) return Math.round(val).toFixed()
  return (Math.round(val * 100) / 100).toFixed(dp)
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



// https://stackoverflow.com/a/14919494
/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? [ 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
    : [ 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' ]
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)


  return bytes.toFixed(dp) + ' ' + units[ u ]
}