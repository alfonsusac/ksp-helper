import { parseSetCookie } from "set-cookie-parser"
import { saveSession, spacedockApi, type NoError } from "./spacedock"

export function login(form: {
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
  )<NoError,
    | 'Missing username or password'
    | 'Username or password is incorrect'
    | 'User is not confirmed'
  >()
}