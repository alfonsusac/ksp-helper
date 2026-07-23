import type { BodyPayload } from "../antenna"
import type { PackageNames } from "../packages"

export type AntennaCalculatorData = {
  0: BodyPayload
  1: BodyPayload
  settings: {
    rangeModifier: string,
    dsnModifier: string,
    contents: Record<PackageNames, boolean>
  }
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
  settings: {
    rangeModifier: "1",
    dsnModifier: "1",
    contents: { stock: true, outerplanets: false, commnetAntennasExtension: false, restockplus: false, dmagic: false, jsx2antenna: false, probesplus: false, venssr: false, nearfutureexpansion: false, }
  },
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