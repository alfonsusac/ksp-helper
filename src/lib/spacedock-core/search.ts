import { spacedockApi, type ModList, type PageQuery, type User, type UserMods } from "./spacedock"

export const SpacedockSearch = {
  getSearchTypeaheadMod,
  searchMod,
  searchUser,
  browse,
  browseNew,
  browseTop,
  browseFeatured,
}

function getSearchTypeaheadMod(query: {
  game_id: string,
  query?: string, // default ''
}) {
  return spacedockApi("/api/typeahead/mod", { query })<[ 200, ModList ]>()
}

// Search
// --------

// GET /api/search/mod?query=<name>
// "/api/search/mod"
function searchMod(query: PageQuery & { // page query default 1
  query?: string, // default ''
}) {
  return spacedockApi("/api/search/mod", { query })<[ 200, ModList ]>()
}

// GET /api/search/user?query=<name>
// "/api/search/user" 
function searchUser(query: { // page query default 1
  query?: string, // default ''
  page?: number // default 0
}) {
  return spacedockApi("/api/search/user", { query })<[ 200, (User & UserMods)[] ]>()
}

// GET /api/browse?page=<integer>&orderby=<string>&order=<string>&count=<integer>
// "/api/browse"
function browse(query: {
  count?: number, // default 30, range [1-500]
  game_id?: number, // id                  priority2
  game_version?: string // friendly string priority2 more specific
  game_version_id?: number // id           priority1 (If game_version_id is present, game_id and game_version will be ignored.)
  orderby?: "name" | "updated" | "created", // default "created"
  order?: "desc" | "asc", // default "asc"
  page?: number // default 1, min 1
}) {
  return spacedockApi("/api/browse", { query })<
    [ 200, {
      total: number
      count: number
      pages: number
      page: number
      result: ModList
    } ]
  >()
}


// Browse
// --------

// GET /api/browse/new?page=<integer>
// "/api/browse/new"
function browseNew(query: PageQuery & { // page default 1, min 1
  game_id?: number, //                      priority2   
  game_version?: string, // friendly string priority2 more specific  
  game_version_id?: number, //              priority1    
}) {
  return spacedockApi("/api/browse/new", { query })<[ 200, ModList ]>()
}

// GET /api/browse/top?page=<integer>
// "/api/browse/top"
function browseTop(query: PageQuery & { // page default 1, min 1
}) {
  return spacedockApi("/api/browse/top", { query })<[ 200, ModList ]>()
}

// GET /api/browse/featured?page=<integer>
// "/api/browse/featured"
function browseFeatured(query: PageQuery & { // page default 1, min 1
}) {
  return spacedockApi("/api/browse/featured", { query })<[ 200, ModList ]>()
}




