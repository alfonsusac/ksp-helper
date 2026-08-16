import { spacedockApi, type Mod, type ModDescription, type ModSharedAuthors, type ModVersion, type UpateImageForm, type UpdateImageErrors, type UserRequiredError, type Version } from "./spacedock"

type GetModError = [ 404, "Mod not found." ] // _get_mod()
type CheckModPublishedError = [ 403, "Mod not published." ] // _check_mod_published()
type CheckModEditableError = [ 403, "Not enough rights." ] // _check_mod_editable()
type GetModPendingAuthorError = [ 200, 'You do not have a pending authorship invite.' ] // _get_mod_pending_author

export const SpacedockMods = {
  getMod,
  getModVersion,
  getModKspAvc,
  getModDownloadCounts,
  updateModBG,
  grantModAccess,
  acceptModGrant,
  rejectModGrant,
  revokeModGrant,
  setModDefaultVersion,
  createMod,
  updateMod,
  updateModEditVersion,
}


// GET /api/mod/<mod_id>
// "/api/mod/<int:mod_id>"
function getMod(mod_id: number) {
  return spacedockApi(`/api/mod/${ mod_id }`)<
    [ 200, (Mod & ModVersion & ModDescription & ModSharedAuthors) ], // this is the only way to get accurate sharedAuthors. Test: await getMod(1774)
    | [ 404, "Mod not found." ]
    | [ 401, "Mod not published. Authentication needed." ] // if not published and not logged in, can't see.
    | [ 403, "Mod not published. Only owner can see it." ] // if not published and logged in but not owner, can't see.
  >()
}

// GET /api/mod/<mod_id>/latest
// "/api/mod/<int:mod_id>/<version>"
function getModVersion(mod_id: number, version: number | "latest" | "latest_version") {
  return spacedockApi(`/api/mod/${ mod_id }/${ version }`)<
    [ 200, Version ],
    | GetModError
    | CheckModPublishedError
    | [ 400, "Invalid version." ]
    | [ 403, "Version not found." ]
  >()
}

// newly added in forked docs
function getModKspAvc(mod_id: number) {
  return spacedockApi(`/api/ksp-avc/${ mod_id }`)<
    [ 200, {
      NAME: string
      URL: string
      DOWNLOAD: string
      CHANGE_LOG: string
      CHANGE_LOG_URL: string
      VERSION: string
      KSP_VERSION: string
      GITHUB?: { // 
        USERNAME: string,
        REPOSITORY: string,
      }
    } ],
    | GetModError
    | CheckModPublishedError
  >()
}

// POST /api/download_counts
function getModDownloadCounts(mod_id: number[]) {
  return spacedockApi(`POST:/api/download_counts`, {
    form: { mod_id: mod_id.map(String) },
  })<[ 200, {
    download_counts: {
      id: number,
      downloads: number,
    }[]
  } ]>()
}


// newly added in forked docs
function updateModBG(mod_id: number, form: UpateImageForm) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/update-bg`, { form })<
    | [ 200, { path: string | undefined } ]
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | UpdateImageErrors
  >()
}

function grantModAccess(mod_id: number, form: {
  user: string // username
}) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/grant`, { form })<
    [ 200, { error: false } ],
    | GetModError
    | CheckModEditableError
    | [ 400, 'The specified user does not exist.' ]
    | [ 400, 'This user has already been added.' ]
    | [ 400, 'This user has not made their profile public.' ]
  >()
}

function acceptModGrant(mod_id: number,) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/accept_grant`)<
    [ 200, { error: false } ],
    | UserRequiredError
    | GetModError
    | GetModPendingAuthorError
  >()
}
function rejectModGrant(mod_id: number,) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/reject_grant`)<
    [ 200, { error: false } ],
    | UserRequiredError
    | GetModError
    | GetModPendingAuthorError
  >()
}

function revokeModGrant(mod_id: number, form: {
  user: string // username
}) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/revoke`, { form })<
    [ 200, { error: false } ],
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | [ 404, 'The specified user does not exist.' ]
    | [ 400, 'You can\'t remove yourself.' ]
    | [ 400, 'This user is not an author.' ]
  >()
}

function setModDefaultVersion(mod_id: number, version_id: number) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/set-default/${ version_id }`)<
    [ 200, { error: false } ],
    | GetModError
    | CheckModEditableError
    | [ 404, 'This mod does not have the specified version.' ]
  >()
}

// POST /api/mod/create
// '/api/mod/create'
function createMod(form: {
  name: string, // max(100)
  'short-description': string, // max(1000)
  description?: string,
  version: string, // friendly version
  'game-version': string // game friendly version
  license: string, // max(128)
  // from dropzone.js when chunk is enabled
  dztotalchunkcount?: number, // default 1
  dzchunkindex?: number, // default 0
  dzchunkbyteoffset?: number, // default 0
  zipball: File,
  notifications?: number[] // check valid id from /api/<game_id>/notifications
} & ({ game: string } | { 'game-id': string } | { 'game-short-name': string }) // must be active game
) {
  return spacedockApi(`POST:AUTH:/api/mod/create`, { form })<
    [ 202, {
      url: string,
      id: number,
      name: string
    } | {
      url?: undefined,
      id?: undefined,
      name?: undefined
    } ],
    | UserRequiredError
    | [ 400, 'Malware detected in upload' ]
    | [ 400, `${ string } is not a valid zip file.` ]
    | [ 400, 'Game version does not exist.' ]
    | [ 400, 'Game does not exist.' ]
    | [ 400, 'Fields exceed maximum permissible length.' ]
    | [ 400, 'All fields are required.' ]
    | [ 403, 'Only users with public profiles may create mods.' ]
  >()
}

// POST /api/mod/<mod_id>/update
// '/api/mod/<int:mod_id>/update'
// "This is called by dropzone"
function updateMod(mod_id: number, form: {
  version: string, // friendly version
  'game-version': string, // game friendly version
  changelog?: string, // max 10000 chars, max changelog_html is 20000 chars
  dztotalchunkcount?: number // default 1
  dzchunkindex?: number // default 0
  dzchunkbyteoffset?: number // default 0
  zipball: File // required if the dzs are sent
  'notify-followers'?: 'true' | 'yes' | 'on' // default ''
}) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/update`, { form })<
    [ 202, {
      url: string,
      id: number,
    } | {
      url?: undefined,
      id?: undefined
    } ],
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | [ 400, 'All fields are required.' ]
    | [ 400, 'Game version does not exist.' ]
    | [ 400, 'We already have this version. Did you mistype the version number?' ]
    | [ 400, `Changelog is ${ number } bytes, the limit is ${ number }!` ] // errors says bytes even though its in char length
    | [ 400, `Rendered changelog is ${ number } bytes, the limit is ${ number }!` ] // errors says bytes even though its in char length
    | [ 400, `${ string } ${ number }/${ number } is not a valid zip file.` ]
    | [ 400, 'Malware detected in upload' ]
  >()
}

// newly added in forked docs
// "This is called by dropzone (sometimes)"
function updateModEditVersion(mod_id: number, form: {
  'version-id': number
  changelog?: string // max 10000 chars, max changelog_html is 20000 chars
  dztotalchunkcount?: number
  dzchunkindex?: number // default 1
  dzchunkbyteoffset?: number // default 0
  zipball?: File // required if dztotalchunkcount is sent
}) {
  return spacedockApi(`POST:AUTH:/api/mod/${ mod_id }/edit_version`, { form })<
    [ 202, { url: string } ],
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | [ 404, 'Version not found' ]
    | [ 400, `Changelog is ${ number } bytes, the limit is ${ number }!` ] // errors says bytes even though its in char length
    | [ 400, `Rendered changelog is ${ number } bytes, the limit is ${ number }!` ] // errors says bytes even though its in char length
    | [ 400, 'Storage not configured' ]
  >()
}




