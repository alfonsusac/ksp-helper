import { spacedocsApi, type Mod, type ModDescription, type ModSharedAuthors, type ModVersion, type UpateImageForm, type UpdateImageErrors, type UserRequiredError, type Version } from "./spacedock"

type GetModError = "Mod not found." // _get_mod()
type CheckModPublishedError = "Mod not published." // _check_mod_published()
type CheckModEditableError = "Not enough rights." // _check_mod_editable()
type GetModPendingAuthorError = 'You do not have a pending authorship invite.' // _get_mod_pending_author



export function getMod(mod_id: number) {
  return spacedocsApi(`/api/mod/${ mod_id }`)<
    (Mod & ModVersion & ModDescription & ModSharedAuthors), // this is the only way to get sharedAuthors. Test: await getMod(1774)
    | "Mod not found."
    | "Mod not published. Authentication needed." // if not published and not logged in, can't see.
    | "Mod not published. Only owner can see it." // if not published and logged in but not owner, can't see.
  >()
}

export function getModVersion(mod_id: number, version: number | "latest" | "latest_version") {
  return spacedocsApi(`/api/mod/${ mod_id }/${ version }`)<
    Version,
    | GetModError
    | CheckModPublishedError
    | "Invalid version."
    | "Version not found."
  >()
}

export function getModKspAvc(mod_id: number) {
  return spacedocsApi(`/api/ksp-avc/${ mod_id }`)<
    {
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
    },
    | GetModError
    | CheckModPublishedError
  >()
}

export function getModDownloadCounts(mod_id: number[]) {
  return spacedocsApi(`POST:/api/download_counts`, {
    form: { mod_id: mod_id.map(String) },
  })<{
    download_counts: {
      id: number,
      downloads: number,
    }[]
  }>()
}


export function updateModBG(mod_id: number, form: UpateImageForm) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/update-bg`, { form })<
    { path: undefined },
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | UpdateImageErrors
  >()
}

export function grantModAccess(mod_id: number, form: {
  user: string // username
}) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/grant`, { form })<
    { error: false },
    | GetModError
    | CheckModEditableError
    | 'The specified user does not exist.'
    | 'This user has already been added.'
    | 'This user has not made their profile public.'
  >()
}

export function acceptModGrant(mod_id: number,) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/accept_grant`)<
    { error: false },
    | UserRequiredError
    | GetModError
    | GetModPendingAuthorError
  >()
}
export function rejectModGrant(mod_id: number,) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/reject_grant`)<
    { error: false },
    | UserRequiredError
    | GetModError
    | GetModPendingAuthorError
  >()
}

export function revokeModGrant(mod_id: number, form: {
  user: string // username
}) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/revoke`, { form })<
    { error: false },
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | 'The specified user does not exist.'
    | 'You can\'t remove yourself.'
    | 'This user is not an author.'
  >()
}

export function setModDefaultVersion(mod_id: number, version_id: number) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/set-default/${ version_id }`)<
    { error: false },
    | GetModError
    | CheckModEditableError
    | 'This mod does not have the specified version.'
  >()
}

export function createMod(form: {
  name: string, // max(100)
  'short-description': string, // max(1000)
  description: string,
  version: string, // friendly version
  'game-version': string // game friendly version
  license: string, // max(128)
  // from dropzone.js when chunk is enabled
  dztotalchunkcount: number,
  dzchunkindex: number,
  dzchunkbyteoffset: number,
  zipball: File
} & ({ game: string } | { 'game-id': string } | { 'game-short-name': string }) // must be active game
) {
  return spacedocsApi(`POST:AUTH:/api/mod/create`, { form })<{
    url: string,
    id: number,
    name: string
  },
    | UserRequiredError
    | 'Malware detected in upload'
    | `${ string } is not a valid zip file.`
    | 'Game version does not exist.'
    | 'Game does not exist.'
    | 'Fields exceed maximum permissible length.'
    | 'All fields are required.'
    | 'Only users with public profiles may create mods.'
  >()
}

// "This is called by dropzone"
export function updateMod(mod_id: number, form: {
  version: string, // friendly version
  'game-version': string, // game friendly version
  changelog?: string, // max 10000 chars, max changelog_html is 20000 chars
  dztotalchunkcount?: number // default 1
  dzchunkindex?: number // default 0
  dzchunkbyteoffset?: number // default 0
  zipball?: File // required if the dzs are sent
  'notify-followers'?: 'true' | 'yes' | 'on' // default ''
}) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/update`, { form })<
    {
      url: string,
      id: number,
    },
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | 'All fields are required.'
    | 'Game version does not exist.'
    | 'We already have this version. Did you mistype the version number?'
    | `Changelog is ${ number } bytes, the limit is ${ number }!` // errors says bytes even though its in char length
    | `Rendered changelog is ${ number } bytes, the limit is ${ number }!` // errors says bytes even though its in char length
    | `${ string } ${ number }/${ number } is not a valid zip file.`
    | 'Malware detected in upload'
  >()
}

// "This is called by dropzone (sometimes)"
export function updateModEditVersion(mod_id: number, form: {
  'version-id': number
  changelog?: string // max 10000 chars, max changelog_html is 20000 chars
  dztotalchunkcount?: number
  dzchunkindex?: number // default 1
  dzchunkbyteoffset?: number // default 0
  zipball?: File // required if dztotalchunkcount is sent
}) {
  return spacedocsApi(`POST:AUTH:/api/mod/${ mod_id }/edit_version`, { form })<
    { url: string },
    | UserRequiredError
    | GetModError
    | CheckModEditableError
    | 'Version not found'
    | `Changelog is ${ number } bytes, the limit is ${ number }!` // errors says bytes even though its in char length
    | `Rendered changelog is ${ number } bytes, the limit is ${ number }!` // errors says bytes even though its in char length
    | 'Storage not configured'
  >()
}




