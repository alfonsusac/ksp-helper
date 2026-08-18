export function mapToListWithId<k, v>(map: Map<k, v>) {
  return Array.from(map, ([ id, value ]) => ({ id, ...value, }))
}

// Groupby Array of T based on key K
export function groupToList<T, K extends PropertyKey>(
  items: T[],
  getKey: (item: T) => K,
) {
  const groups = new Map<K, { key: K; list: T[] }>()

  for (const item of items) {
    const key = getKey(item)

    let group = groups.get(key)
    if (!group) {
      group = { key, list: [] }
      groups.set(key, group)
    }

    group.list.push(item)
  }

  return [ ...groups.values() ]
}



export function aggregateBy<T, P extends keyof T, A>(arr: T[], prop: P, init: () => A, cb?: (prev: A) => A) {
  const map = new Map<T[ P ], A>
  for (const o of arr) {
    const key = o[ prop ]
    const prev = map.get(key)
    map.set(key, cb?.(prev ?? init()) ?? init())
  }
  return map
}

// Aggregates T[] and count how many of T have a specific P and collect them in a map of T[P]: number
export function countBy<T, P extends keyof T>(arr: T[], prop: P) {
  return aggregateBy(arr, prop, () => 1, (prev) => prev + 1)
}

