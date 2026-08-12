import { parseSetCookie } from "set-cookie-parser"
import { clearSession, saveSession, spacedockApi, type UpateImageForm, type UpdateImageErrors, type User, type UserMods, type UserRequiredError } from "./spacedock"

export function getUser(username: string) {
  return spacedockApi(`/api/user/${ username }`)<User & UserMods,
    | 'User not found.'
    | 'User not public.'
  >()
}

export function changeUserPassword(username: string, form: {
  'old-password': string,
  'new-password': string,
  'new-password-confirm': string,
}) {
  return spacedockApi(`POST:AUTH:/api/user/${ username }/change-password`, { form })<
    { error: false, reason: unknown },
    | UserRequiredError
    | 'You are not authorized to change this user\'s password.'
    | 'The old password you entered doesn\'t match your current account password.'
  >()
}

export function deleteUser(username: string, form: {
  username: string,
}) {
  return spacedockApi(`POST:AUTH:/api/user/${ username }/delete`, {
    form, onFetch: async (res) => {
      // check if "session" cookie is deleted. If yes then delete log user out
      const setcookie = res.headers.getSetCookie()
      const parsedSetCookie = parseSetCookie(setcookie, { map: true })
      if (parsedSetCookie[ 'session' ].value === "") {
        await clearSession()
      }
      // TODO: Test if its working
    }
  })<
    { error: false },
    | UserRequiredError
    | 'Unauthorized'
    | 'Wrong username'
    | 'User does not exist'
  >()
}

export function updateUserBG(username: string, form: UpateImageForm) {
  return spacedockApi(`POST:AUTH:/api/username/${ username }/update-bg`, { form })<
    { path: undefined },
    | UserRequiredError
    | 'You are not authorized to edit this user\'s background'
    | UpdateImageErrors
  >()
}


