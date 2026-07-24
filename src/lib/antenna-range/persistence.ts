import { initialData, parseAppData, serializeAppData, type AntennaCalculatorData } from "./app-state"

export function saveToLocalStorage(data: AntennaCalculatorData | undefined) {
  if (data) localStorage.setItem("settings", serializeAppData(data))
}

export function loadFromLocalStorage() {
  const stored = localStorage.getItem("settings")
  if (stored)
    return parseAppData(stored, initialData)
  else
    return initialData
}

export function generateShareURL(data: AntennaCalculatorData | undefined) {
  if (data === undefined) return ""
  console.log(window.location)
  const url = new URL(window.location.origin + window.location.pathname)
  url.searchParams.set("data", serializeAppData(data))
  const res = url.toString()
  console.log(res)
  return res
}
