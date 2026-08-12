import { parseSetCookie } from "set-cookie-parser"
import { clearSession, saveSession, spacedockApi, type UpateImageForm, type UpdateImageErrors, type User, type UserMods, type UserRequiredError } from "./spacedock"

// GET /api/user/<username>
// "/api/user/<username>"
export function getUser(username: string) {
  return spacedockApi(`/api/user/${ username }`)<[ 200, User & UserMods ],
    | [ 404, 'User not found.' ]
    | [ 403, 'User not public.' ]
  >()
}

export function changeUserPassword(username: string, form: {
  'old-password': string,
  'new-password': string,
  'new-password-confirm': string,
}) {
  return spacedockApi(`POST:AUTH:/api/user/${ username }/change-password`, { form })<
    [ 200, { error: false, reason: "Success" } ],
    | UserRequiredError
    | [ 403, 'You are not authorized to change this user\'s password.' ]
    | [ 200, 'The old password you entered doesn\'t match your current account password.' ]
    // check_password_criteria()
    | [ 200, 'Please fill in both fields.' ]
    | [ 200, 'The passwords do not match.' ]
    | [ 200, 'Your new password must have at least 5 characters.' ]
    | [ 200, 'Your new password can\'t have more than 256 characters.' ]
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
    [ 200, { error: false } ],
    | UserRequiredError
    | [ 401, 'Unauthorized' ]
    | [ 403, 'Wrong username' ]
    | [ 404, 'User does not exist' ]
  >()
}

export function updateUserBG(username: string, form: UpateImageForm) {
  return spacedockApi(`POST:AUTH:/api/username/${ username }/update-bg`, { form })<
    [ 200, { path: undefined } ],
    | UserRequiredError
    | [ 403, 'You are not authorized to edit this user\'s background' ]
    | UpdateImageErrors
  >()
}


