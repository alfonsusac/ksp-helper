import { initialData, parseAppData, serializeAppData, type AppData } from "./app-state"

export function saveToLocalStorage(data: AppData | undefined) {
  if (data) localStorage.setItem("settings", serializeAppData(data))
}

export function loadFromLocalStorage() {
  const stored = localStorage.getItem("settings")
  if (stored)
    return parseAppData(stored, initialData)
  else
    return initialData
}

export function generateShareURL(data: AppData | undefined) {
  if (data === undefined) return ""
  const url = new URL(window.location.origin)
  url.searchParams.set("data", serializeAppData(data))
  const res = url.toString()
  console.log(res)
  return res
}
