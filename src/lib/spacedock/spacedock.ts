// https://github.com/KSP-SpaceDock/SpaceDock/blob/master/api.md

import { cookies } from "next/headers"
import { parseSetCookie } from "set-cookie-parser"

export type BrowseResult = {
  total: number
  count: number
  pages: number
  page: number
}

export type User = { // user_info()
  username: string
  description: string
  forumUsername: string
  ircNick: string
  twitterUsername: string
  redditUsername: null | string
}
export type UserMods = {
  mods: Mod[]
}

export type Mod = { // mod_info()
  name: string
  id: number
  game: Game
  game_id: number
  short_description: string
  downloads: number
  followers: number
  author: string
  default_version_id: number
  shared_authors: unknown[], // unless specified/implemented, shared_authors alwyas return empty array.
  background: null | string
  bg_offset_y: number | null
  license: License
  website: string
  donations: string
  source_code: string
  url: string
}
export type ModVersion = {
  versions: Version[]
}
export type ModDescription = {
  description: string,
  description_html: string,
}
export type ModSharedAuthors = {
  shared_authors: User[]
}

// specified by "serialize_mod_list()" in the source code, in api.py
export type ModList = (Mod & ModVersion)[]

export type Game = "Kerbal Space Program" | "Kitten Space Agency"
export type License = "MIT" | "GPL-3.0" | "CC-BY-NC-SA" | "GPL-2.0" | "CC0" | "CC-BY"

export type Version = { // version_info()
  friendly_version: string
  game_version: string
  id: number
  created: Date
  download_path: string
  changelog: null | string
  downloads: number
}




// API Type Helper

// specified by "get_page()" in common.py
export type PageQuery = {
  page?: number, // default 1
}
export type UpdateImageErrors = 
  | [400, 'This file type is not acceptable.']
  | [400, 'Malware detected in upload']
export type UpateImageForm = {
  image: File
}
export type UserRequiredError = [403, 'You are not logged in.'] // user_required()








// Helpers
const createParam = (params: Record<string, any>) => {
  return Object.entries(params).map(([ k, v ]) => {
    return `${ k }=${ v }`
  }).join('&')
}
const spacedockURL = (path: string, params?: Record<string, any>) => {
  const url = `https://spacedock.info` + path + (params ? `?${ createParam(params) }` : "")
  console.log(url)
  return url
}
type FormPayloadItemType = string | number | File
type FormPayload = FormPayloadItemType | FormPayloadItemType[]
const parseFormPtype = (fpt: FormPayloadItemType) => {
  if (typeof fpt === "number") return String(fpt)
  return fpt
}

const payloadToFormData = (payload?: Record<string, FormPayload>) => {
  if (!payload) return undefined
  const form = new FormData()
  Object.entries(payload).forEach((e) => {
    if (Array.isArray(e[ 1 ])) {
      e[ 1 ].forEach(i => form.append(e[ 0 ], parseFormPtype(i)))
    } else {
      form.append(e[ 0 ], parseFormPtype(e[ 1 ]))
    }
  })
  return form
}
const newHeaderWithSessionCookie = (authCode?: string) => {
  const header = new Headers()
  header.append('Cookie', `session=${ authCode }`)
  return header
}

// export type Error<T extends [ number, string ]> = [ number, { error: true, reason: T } ]
// export type NoError = { error: false }
// export type Result<Ok, Err extends [ number, string ]> = Error<Err> | Ok

export type ResponseType<Status extends number, Payload> = { status?: Status, payload: Payload }
export type Error<Status extends number, Reason extends string> = { status?: Status, payload: { error: true, reason: Reason } }
export type Result<Ok extends [ number, any ], Err extends [ number, string ]> =
  | ResponseType<Ok[ 0 ], Ok[ 1 ]>
  | Error<Err[ 0 ], Err[ 1 ]>
export type NoError = [ 200, { error: false } ]

const not_authenticated = { status: 401, payload: { error: true, reason: 'You are not logged in.' } } as Result<never, [ 401, "You are not logged in." ]>

// Auth Helper
export const saveSession = async (sessionValue: string) => {
  (await cookies()).set('spacedock-session', sessionValue)
}
export const getSession = async () => {
  return (await cookies()).get('spacedock-session')
}
export const clearSession = async () => {
  return (await cookies()).delete('spacedock-session')
}


// Wrapper
export function spacedockApi(path: `${ "POST:" | "" }${ "AUTH:" | "" }/${ string }`, opts?: {
  query?: Record<string, any>,
  form?: Record<string, FormPayload>,
  onFetch?: (request: Response) => Promise<void>,
}) {
  return async <
    Ok extends [ number, any ],
    Err extends [ number, string ] = never,
  >() => {
    const isPost = path.split(':').includes("POST")
    const isAuth = path.split(':').includes("AUTH")
    const method = isPost ? "POST" : "GET"
    const realpath = path.split(':').at(-1) ?? ""

    if (isAuth) {
      const session = await getSession()
      if (!session) return not_authenticated
      const res = await fetch(
        spacedockURL(realpath, opts?.query),
        {
          method: method,
          headers: newHeaderWithSessionCookie(session.value),
          body: payloadToFormData(opts?.form)
        }
      )
      await opts?.onFetch?.(res)
      const json = await res.json()
      return { status: res.status, payload: json } as Result<Ok, Err>
    }
    const res = await fetch(
      spacedockURL(realpath, opts?.query),
      {
        method: method,
        body: payloadToFormData(opts?.form)
      }
    )
    await opts?.onFetch?.(res)
    const json = await res.json()
    return { status: res.status, payload: json } as Result<Ok, Err>
  }
}









// // List Search

// // Search Mod
// // GET /api/search/mod?query=<name>
// // https://spacedock.info/api/search/mod?query=FAR
// export async function searchMod(query: {
//   /** Search terms */
//   query: string,
//   /** Which page of results to retrieve (1 indexed) [optional] */
//   page?: number,
// }) {
//   return spacedockApi('/api/search/mod', { query })<(Mod & ModVersion)[]>()
// }

// // Search Public Users
// // GET /api/search/user?query=<name>
// // https://spacedock.info/api/search/user?query=poodmund
// export async function searchUser(query: {
//   /** Search terms */
//   query: string,
//   /** page: Which page of results to retrieve (1 indexed) [optional] */
//   page?: number
// }) {
//   return spacedockApi('/api/search/user', { query })<(User & UserMods)[]>()
// }

// // Browse Mods
// // GET /api/browse?page=<integer>&orderby=<string>&order=<string>&count=<integer>
// // https://spacedock.info/api/browse
// export async function browseMods(query: {
//   /** Only return mods for this game, by internal database id [optional]. If game_version_id is present, game_id and game_version will be ignored. */
//   game_id?: string,
//   /** Only return mods for this game version, by friendly string [optional]. If game_version_id is present, game_id and game_version will be ignored. */
//   game_version?: string,
//   /**  Only return mods for this game version, by internal database id [optional]. If game_version_id is present, game_id and game_version will be ignored.*/
//   game_version_id?: string,
//   /** Which page of results to retrieve (1 indexed) [optional] */
//   page?: number,
//   /** Which property of mod use for ordering. Valid values: name, updated, created. Default: created. [optional] */
//   orderby?: number,
//   /** Which ordering direction to use. Valid values: asc, desc. Default: asc. [optional] */
//   order?: "asc" | "desc"
//   /** Which count of mods to show per page. Valid values: 1-500. Default 30. [optional] */
//   count?: number
// }) {
//   return spacedockApi("/api/browse", { query })<BrowseResult & { result: (Mod & ModVersion)[] }>()
// }

// // Browse Newly Mods
// // GET /api/browse/new?page=<integer>
// // https://spacedock.info/api/browse/new
// export async function browseNewMods(query: {
//   /** Which page of results to retrieve (1 indexed) [optional] */
//   page?: number,
// }) {
//   return spacedockApi("/api/browse/new", { query })<BrowseResult & { result: (Mod & ModVersion)[] }>()
// }

// // Browse Top Mods
// // GET /api/browse/top?page=<integer>
// // https://spacedock.info/api/browse/top
// export async function browseTopMods(query: {
//   /** Which page of results to retrieve (1 indexed) [optional] */
//   page?: number,
// }) {
//   return spacedockApi("/api/browse/new", { query })<(Mod & ModVersion)[]>()
// }

// // Browse Featured Mods
// // GET /api/browse/featured?page=<integer>
// // https://spacedock.info/api/browse/featured
// export async function browseFeaturedMods(query: {
//   /** Which page of results to retrieve (1 indexed) [optional] */
//   page?: number,
// }) {
//   return spacedockApi("/api/browse/featured", { query })<(Mod & ModVersion)[]>()
// }














// // Mod

// // Get One Mod
// // GET /api/mod/<mod_id>
// // https://spacedock.info/api/mod/21
// export async function getMod(mod_id: number) {
//   return spacedockApi(`/api/mod/${ mod_id }`)<
//     (Mod & ModVersion & ModDescription),
//     | "Mod not found."
//     | "Mod not published."
//   >()
// }

// // Get One Mod Version
// // GET /api/mod/<mod_id>/<"latest" | version>
// // https://spacedock.info/api/mod/21/latest
// export async function getModVersion(mod_id: number, version: number | 'latest') {
//   return spacedockApi(`/api/mod/${ mod_id }/${ version }`)<
//     Version,
//     | "Mod not found."
//     | "Mod not published."
//     | "Invalid version."
//     | "Version not found."
//   >()
// }










// // Mod Management

// // Create Mod
// // POST /api/mod/<mod_id>/create
// export async function createMod(form: {
//   name: string
//   'short-description': string,
//   version: string
//   'ksp-version': string,
//   license: string,
//   ckan?: "true" | "yes" | "on",
//   zipball: File
// }) {
//   return spacedockApi('POST:AUTH:/api/mod/create')<
//     { url: string },
//     | 'You are not logged in.'
//     | 'Only users with public profiles may create mods.'
//     | 'All fields are required.'
//     | 'Fields exceed maximum permissible length.'
//     | 'This is not a valid zip file.'
//   >()
// }

// // Update Mod
// // POST /api/mod/<mod_id>/update
// export async function updateMod(form: {
//   version: string,
//   changelog: string,
//   'ksp-version': string,
//   'notify-followers': string,
//   zipball: string
// }) {
//   return spacedockApi('POST:AUTH:/api/mod/update', { form })<
//     { 'path': `/content/${ string }` },
//     | 'You are not logged in.'
//     | 'Mod not found.'
//     | 'Not enought rights.'
//     | 'All fields are required.'
//     | 'We already have this version. Did you mistype the version number?'
//     | 'This is not a valid zip file.'
//   >()
// }

// // Update Mod Background
// // POST /api/mod/<mod_id>/update-bg
// export async function updateModBG(mod_id: number, form: {
//   image: File
// }) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/update-bg`, { form })<
//     { 'path': `/content/${ string }` },
//     | 'You are not logged in.'
//     | 'Mod not found.'
//     | 'Not enought rights.'
//     | 'This file type is not acceptable.'
//   >()
// }

// // Update Default Mod Version Id
// // POST /api/mod/<int:mid>/set-default/<int:vid>
// export async function updateModDefaultVersion(mod_id: number, version_id: number) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/set-default/${ version_id }`)<
//     NoError,
//     | 'The specified mod does not exist.'
//     | 'You do not have permission to do this.'
//     | 'This mod does not have the specified version.'
//   >()
// }






// // Pack Management

// // Create a Pack
// export async function createPack(form: {
//   name: string,
// }) {
//   return spacedockApi(`POST:AUTH:/api/pack/create`, { form })<{ url: string },
//     | 'You are not logged in.'
//     | 'Only users with public profiles may create mod packs.'
//     | 'All fields are required.'
//     | 'Fields exceed maximum permissible length.'>()
// }








// // Grant Management

// // Grant User access to a mod
// // POST /api/mod/<mod_id>/grant
// export async function grantUser(mod_id: number, form: {
//   user: string
// }) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/grant`, { form })<NoError,
//     | 'Mod not found.'
//     | 'Not enought rights'
//     | 'The specified user does not exist.'
//     | 'This user has already been added.'
//     | 'This user has not made their profile public.'
//   >()
// }

// // Accept Grant
// // POST /api/mod/<mod_id>/accept_grant
// export async function acceptGrant(mod_id: number) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/grant`)<NoError,
//     | 'You are not logged in.'
//     | 'Mod not found.'
//     | 'You do not have a pending authorship invite.'
//   >()
// }

// // Deny Grant
// // POST /api/mod/<mod_id>/reject_grant
// export async function denyGrant(mod_id: string) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/reject_grant`)<NoError,
//     | 'You are not logged in.'
//     | 'Mod not found.'
//     | 'You do not have a pending authorship invite.'
//   >()
// }

// // Revoke Grant
// // POST /api/mod/<mod_id>/revoke
// export async function revokeGrant(mod_id: string, form: {
//   user: string
// }) {
//   return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/revoke`)<NoError,
//     | 'You are not logged in.'
//     | 'Mod not found.'
//     | 'Not enought rights.'
//     | 'The specified user does not exist.'
//     | 'You can\'t remove yourself.'
//     | 'This user is not an author.'
//     | 'You do not have a pending authorship invite.'
//   >()
// }












// // Users

// // Login
// // POST /api/login
// export async function login(form: {
//   username: string,
//   password: string,
// }) {
//   return spacedockApi('POST:/api/login',
//     {
//       form,
//       onFetch: async (res) => {
//         const setcookie = res.headers.getSetCookie()
//         const parsedSetCookie = parseSetCookie(setcookie, { map: true })
//         console.log(parsedSetCookie)
//         await saveSession(parsedSetCookie[ 'session' ].value)
//       },
//     },
//   )<NoError,
//     | 'Missing username or password'
//     | 'Username or password is incorrect'
//     | 'User is not confirmed'
//   >()
// }

// // Get One User
// // GET /api/user/<username>
// // https://spacedock.info/api/user/Xaiier
// export async function getUser(username: string) {
//   return spacedockApi(`/api/user/${ username }`)<NoError,
//     | "User not found."
//     | "User not public."
//   >()
// }

// // Update User Background
// // POST /api/mod/<mod_id>/update-bg
// export async function updateUserBG(username: string, form: {
//   image: File
// }) {
//   return spacedockApi(`POST:AUTH:/api/user/${ username }/update-bg`, {
//     form,
//   })<NoError,
//     | 'You are not logged in.'
//     | 'You are not authorized to edit this user\'s background.'
//     | 'This file type is not acceptable.'
//   >()
// }