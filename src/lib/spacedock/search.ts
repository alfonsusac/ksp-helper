import { spacedocsApi, type ModList, type PageQuery, type User, type UserMods } from "./spacedock"

export function getSearchTypeaheadMod(query: {
  game_id: string,
  query?: string,
}) {
  return spacedocsApi("/api/typeahead/mod", { query })<ModList>()
}


export function searchMod(query: PageQuery & {
  query?: string,
}) {
  return spacedocsApi("/api/search/mod", { query })<ModList>()
}


export function searchUser(query: PageQuery & {
  query?: string,
}) {
  return spacedocsApi("/api/search/user", { query })<(User & UserMods)[]>()
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
  return spacedocsApi("/api/browse", { query })<{
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
  return spacedocsApi("/api/browse/new", { query })<ModList>()
}


export function browseTop(query: PageQuery & {
}) {
  return spacedocsApi("/api/browse/top", { query })<ModList>()
}


export function browseFeatured(query: PageQuery & {
}) {
  return spacedocsApi("/api/browse/featured", { query })<ModList>()
}