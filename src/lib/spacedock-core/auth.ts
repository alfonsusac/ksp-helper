import { parseSetCookie } from "set-cookie-parser"
import { saveSession, spacedockApi, type NoError } from "./spacedock"

export const SpacedockAuth = {
  login
}

// POST /api/login
// "/api/login"
function login(form: {
  username: string,
  password: string,
}) {
  return spacedockApi('POST:/api/login',
    {
      form,
      onFetch: async (res) => {
        const setcookie = res.headers.getSetCookie()
        const parsedSetCookie = parseSetCookie(setcookie, { map: true })
        await saveSession(parsedSetCookie[ 'session' ].value)
      },
    },
  )<[ 200, { error: false } ],
    | [ 401, 'Missing username or password' ]
    | [ 401, 'Username or password is incorrect' ]
    | [ 403, 'User is not confirmed' ]
  >()
}