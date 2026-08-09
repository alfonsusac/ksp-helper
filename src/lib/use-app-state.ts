import { useEffect, useState } from "react"





export function serializeAppData<T>(data: T) {
  return JSON.stringify(data, (_, value) => {
    // Add more features here
    if (value === Number.POSITIVE_INFINITY)
      return { __type: "Positive Infinity" }
    if (value instanceof Map)
      return { __type: "Map", value: [ ...value ] }

    return value
  })
}

export function parseAppData2<T>(str: string, validate: (t: unknown) => string | true) {
  const res = JSON.parse(str, (key, value) => {
    // Add more features here
    if (value?.__type === "Map")
      return new Map(value.value)
    if (value?.__type === "Positive Infinity")
      return Number.POSITIVE_INFINITY
    return value
  })
  const isValid = validate(res)
  if (isValid !== true) throw new Error(`Failed App Data Parsing Validation: ${ isValid }`)
  return res as T

}

export function useAppState<T>(
  key: string,
  initialData: () => T,
  validate: (r: unknown) => string | true,
  spKey: string = "data",
) {
  const [ data, setData ] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (data) localStorage.setItem(key, serializeAppData(data))
  }, [ data ])

  useEffect(() => {
    // Read from search param first.
    // If not good or fail, load from localStorage
    // If not good or fail, load initial data

    const fromSp = new URLSearchParams(window.location.search).get(spKey)
    const fromLocalStorage = localStorage.getItem(key)

    const retrievedData = (() => {
      if (fromSp) {
        try {
          console.log(key, 'useAppState fromSp', fromSp)

          // const url = new URL(window.location.href)
          // url.searchParams.delete("data")
          // window.history.replaceState({}, "", url)

          return parseAppData2<T>(fromSp, validate)
        } catch (error) {
          console.log('error loading app state from searchParams', error)
        }
      }
      if (fromLocalStorage) {
        try {
          console.log(key, 'useAppState fromLocalStorage')
          return parseAppData2<T>(fromLocalStorage, validate)
        } catch (error) {
          console.log('error loading app state from localstorage',error)
        }
      }
      console.log("No data from localstorage nor SP")
      return initialData()
    })()

    setData(retrievedData)
  }, [])

  return [ data, setData ] as const

}




export function generateShareURL<T>(data: T | undefined) {
  if (data === undefined) return ""
  // console.log(window.location)
  const url = new URL(window.location.origin + window.location.pathname)
  url.searchParams.set("data", serializeAppData(data))
  const res = url.toString()
  // console.log(res)
  return res
}
