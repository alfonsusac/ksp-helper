import { spacedocsApi, type UpateImageForm, type UpdateImageErrors, type UserRequiredError } from "./spacedock"

export function updatePackBG(pack_id: number, form: UpateImageForm) {
  return spacedocsApi(`POST:AUTH:/api/pack/${ pack_id }/update-bg`, { form })<
    { path: undefined },
    | UserRequiredError
    | 'You are not authorized to edit this pack\'s background'
    | (string & {})
    | UpdateImageErrors
  >()
}

export function createPack(form: {
  name: string,
  game: number // game_id
}) {
  return spacedocsApi(`POST:AUTH:/api/pack/create`, {
    form: {
      name: form.name,
      game: String(form.game)
    }
  })<{ url: string }
    | UserRequiredError
    | 'Only users with public profiles may create mod packs.'
    | 'All fields are required.'
    | 'Please select a game.'
    | 'Fields exceed maximum permissible length.' // name > 100
  >()
}