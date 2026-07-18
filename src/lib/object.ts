// thanks chatgpt
export function mapToListWithId<k, v>(map: Map<k, v>) {
  const list = Array.from(map, ([ id, value ]) => ({
    id,
    ...value,
  }))
  return list
}

// thanks chatgpt
export function groupToList<T, K extends PropertyKey>(
  items: Iterable<T>,
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