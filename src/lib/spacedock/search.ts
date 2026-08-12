import { spacedockApi, type ModList, type PageQuery, type User, type UserMods } from "./spacedock"

export function getSearchTypeaheadMod(query: {
  game_id: string,
  query?: string,
}) {
  return spacedockApi("/api/typeahead/mod", { query })<ModList>()
}


export function searchMod(query: PageQuery & {
  query?: string,
}) {
  return spacedockApi("/api/search/mod", { query })<ModList>()
}


export function searchUser(query: PageQuery & {
  query?: string,
}) {
  return spacedockApi("/api/search/user", { query })<(User & UserMods)[]>()
}


export function browse(query: {
  count?: number,
  game_id?: number, // id
  game_version?: string // friendly string
  game_version_id?: number // id
  orderby?: "name" | "updated",
  order?: "desc",
  page?: number
}) {
  return spacedockApi("/api/browse", { query })<{
    total: number
    count: number
    pages: number
    page: number
    result: ModList
  }>()
}


export function browseNew(query: PageQuery & {
  game_id?: number,
  game_version?: string, // friendly string
  game_version_id?: number,
}) {
  return spacedockApi("/api/browse/new", { query })<ModList>()
}


export function browseTop(query: PageQuery & {
}) {
  return spacedockApi("/api/browse/top", { query })<ModList>()
}


export function browseFeatured(query: PageQuery & {
}) {
  return spacedockApi("/api/browse/featured", { query })<ModList>()
}