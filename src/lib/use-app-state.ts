import { useEffect, useState } from "react"





export function serializeAppData<T>(data: T) {
  return JSON.stringify(data, (_, value) => {
    // Add more features here
    if (value instanceof Map) {
      return { __type: "Map", value: [ ...value ] }
    }
    return value
  })
}

export function parseAppData<T>(str: string, onErrorReturn: T, validate: (t: unknown) => boolean) {
  try {
    const res = JSON.parse(str, (key, value) => {
      // Add more features here
      if (value?.__type === "Map")
        return new Map(value.value)
      return value
    })
    const isValid = validate(res)
    if (!isValid) throw new Error("Failed App Data Parsing Validation")
    return res as T
  } catch (error) {
    return onErrorReturn
    // console.log("error parsing app data. Returning initial data")
  }
}


export function useAppState<T>(
  key: string,
  initialData: () => T,
  validate: (r: unknown) => boolean,
) {
  const [ data, setData ] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (data) localStorage.setItem(key, serializeAppData(data))
  }, [ data ])

  useEffect(() => {
    const fromSp = new URLSearchParams(window.location.search).get('settings')
    if (fromSp) {
      setData(
        parseAppData(fromSp, initialData(), validate)
      )
      const url = new URL(window.location.href)
      url.searchParams.delete("settings")
      window.history.replaceState({}, "", url)
    } else {
      const stored = localStorage.getItem(key)
      setData((() => {
        if (stored)
          return parseAppData(stored, initialData(), validate)
        else
          return initialData
      })())
    }
  }, [])

  return [ data, setData ] as const

}




export function generateShareURL<T>(data: T | undefined) {
  if (data === undefined) return ""
  console.log(window.location)
  const url = new URL(window.location.origin + window.location.pathname)
  url.searchParams.set("data", serializeAppData(data))
  const res = url.toString()
  console.log(res)
  return res
}
