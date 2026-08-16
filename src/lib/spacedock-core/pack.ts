import { spacedockApi, type UpateImageForm, type UpdateImageErrors, type UserRequiredError } from "./spacedock"

export const SpacedockPacks = {
  updatePackBG,
  createPack,
}

function updatePackBG(pack_id: number, form: UpateImageForm) {
  return spacedockApi(`POST:AUTH:/api/pack/${ pack_id }/update-bg`, { form })<
    [ 200, { path: undefined } ],
    | UserRequiredError
    | [ 403, 'You are not authorized to edit this pack\'s background' ]
    | [ 200, (string & {}) ]
    | UpdateImageErrors
  >()
}

function createPack(form: {
  name: string,// max 100
  game: number // game_id
}) {
  return spacedockApi(`POST:AUTH:/api/pack/create`, {
    form: {
      name: form.name,
      game: String(form.game)
    }
  })<[ 200, { url: string } ],
    | UserRequiredError
    | [ 403, 'Only users with public profiles may create mod packs.' ]
    | [ 400, 'All fields are required.' ]
    | [ 400, 'Please select a game.' ]
    | [ 400, 'Fields exceed maximum permissible length.' ] // name > 100
  >()
}