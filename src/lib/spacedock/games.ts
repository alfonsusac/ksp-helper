import { spacedockApi, type UpateImageForm, type UpdateImageErrors, type UserRequiredError } from "./spacedock"

export type GameInfo = { // game_info()
  id: number
  name: string
  publisher_id: number | null
  short_description: string | null
  description: string | null
  created: string | null
  background: string
  bg_offset_x: number | null
  bg_offset_y: number
  link: string | null
  short: string
}

export type GameVersionInfo = { // game_version_info()
  id: number,
  friendly_version: string,
}

export async function getGames() {
  return spacedockApi("/api/games")<GameInfo[]>()
}

export async function getGameVersions(gameid: number) {
  return spacedockApi(`/api/${ gameid }/versions`)<GameVersionInfo[]>()
}

export async function getGameNotifications(gameid: number) {
  return spacedockApi(`/api/${ gameid }/notifications`)<{
    id: number
    name: string
    builds_url: string
    add_url: string
    change_url: string
  }[]>()
}

export function updateGameBG(game_id: number, form: UpateImageForm) {
  // admin endpoint
  return spacedockApi(`POST:AUTH:/api/game/${ game_id }/update-bg`, {
    form
  })<
    { path: undefined },
    | UserRequiredError
    | (string & {})
    | UpdateImageErrors
  >()
}





// [
//   {
//     "id": 22409,
//     "name": "Kitten Space Agency",
//     "publisher_id": 9506,
//     "short_description": null,
//     "description": null,
//     "created": null,
//     "background": "game/Kitten_Space_Agency-header-1763476360.png",
//     "bg_offset_x": 0,
//     "bg_offset_y": -364,
//     "link": null,
//     "short": "ksa"
//   },
//   {
//     "id": 22405,
//     "name": "Kitbash Model Club",
//     "publisher_id": null,
//     "short_description": null,
//     "description": null,
//     "created": null,
//     "background": "game/Kitbash_Model_Club-header-1681053998.jpg",
//     "bg_offset_x": null,
//     "bg_offset_y": -350,
//     "link": null,
//     "short": "Kitbash-Model-Club"
//   },
//   {
//     "id": 22407,
//     "name": "Kerbal Space Program 2",
//     "publisher_id": 1464,
//     "short_description": null,
//     "description": null,
//     "created": null,
//     "background": "game/Kerbal_Space_Program_2-header-1681114939.jpg",
//     "bg_offset_x": 0,
//     "bg_offset_y": -360,
//     "link": null,
//     "short": "kerbal-space-program-2"
//   },
//   {
//     "id": 3102,
//     "name": "Kerbal Space Program",
//     "publisher_id": 1464,
//     "short_description": null,
//     "description": null,
//     "created": null,
//     "background": "game/Kerbal_Space_Program-header-1681053968.jpg",
//     "bg_offset_x": null,
//     "bg_offset_y": -750,
//     "link": null,
//     "short": "kerbal-space-program"
//   },
//   {
//     "id": 22406,
//     "name": "Juno: New Origins",
//     "publisher_id": null,
//     "short_description": null,
//     "description": null,
//     "created": null,
//     "background": "game/Juno_New_Origins-header-1681053953.jpg",
//     "bg_offset_x": null,
//     "bg_offset_y": -370,
//     "link": null,
//     "short": "juno"
//   }
// ]


// Deprecated

export function getkspversions() {
  return spacedockApi('/api/kspversions')<{
    'error': true,
    'reason': 'This API call has been retired. Use /api/games to find the id of the game you want, then /api/<game_id>/versions to get its versions.'
  }>()
}