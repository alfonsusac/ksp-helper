export function mapToListWithId<k, v>(map: Map<k, v>) {
  const list = Array.from(map, ([ id, value ]) => ({
    id,
    ...value,
  }))
  return list
}