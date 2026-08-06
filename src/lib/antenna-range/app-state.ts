import type { BodyPayload } from "../antenna"
import type { PackageNames } from "../../packages/_process-packages"
import { useAppState } from "../use-app-state"

export type AntennaCalculatorData = {
  0: BodyPayload
  1: BodyPayload
}

const defaultProp = () => ({
  level: "1",
  hasCommandModule: true,
  antennas: new Map<string, number>,
  isRelay: false,
} as const)

export const initialData: AntennaCalculatorData = {
  '0': { ...defaultProp(), type: "ksc" },
  '1': { ...defaultProp(), type: "ship" },
}

export function useAntennaRangeAppStateData() {
  return useAppState("antenna-range", () => initialData, (s) => {
    if (typeof s !== 'object' || s === null) return false
    if ('0' in s === false) return false
    if ('1' in s === false) return false
    return true
  })
}


export function serializeAppData(data: AntennaCalculatorData) {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof Map) {
      return { __type: "Map", value: [ ...value ] }
    }
    return value
  })
}

export function parseAppData(str: string, onErrorReturn: AntennaCalculatorData) {
  try {
    return JSON.parse(str, (key, value) => {
      if (value?.__type === "Map")
        return new Map(value.value)
      return value
    })
  } catch (error) {
    return onErrorReturn
    // console.log("error parsing app data. Returning initial data")
  }
}