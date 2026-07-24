import { useEffect, useState } from "react"

export function useAppState<T>(
  key: string,
  initialData: () => T,
) {
  const [ data, setData ] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (data) localStorage.setItem(key, JSON.stringify(data, (_, value) => {

      // Add more features here
      if (value instanceof Map)
        return { __type: "Map", value: [ ...value ] }

      return value
    }))
  }, [ data ])

  useEffect(() => {

    const parseAppData = (str: string) => {
      try {
        return JSON.parse(str, (key, value) => {

          // Add more features here
          if (value?.__type === "Map")
            return new Map(value.value)

          return value
        })
      } catch (error) {
        return initialData()
      }
    }

    const fromSp = new URLSearchParams(window.location.search).get('data')
    if (fromSp) {
      setData(
        parseAppData(fromSp)
      )
      const url = new URL(window.location.href)
      url.searchParams.delete("data")
      window.history.replaceState({}, "", url)
    } else {
      setData((() => {
        const stored = localStorage.getItem(key)
        if (stored)
          return parseAppData(stored)
        else
          return initialData
      })())
    }
  }, [])

  return [ data, setData ] as const

}