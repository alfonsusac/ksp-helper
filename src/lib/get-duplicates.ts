export function checkDuplicates<T>(
  arr: T[],
  key: (t: T) => string,
  onDupes: (t: T, x: number) => void
) {
  const ids = new Map<any, number>()

  arr.forEach((t) => ids.set(key(t), (ids.get(key(t)) ?? 0) + 1))

  arr.forEach((t, x) => {
    if (ids.get(key(t))! > 1) {
      onDupes(t, x)
    }
  })
}