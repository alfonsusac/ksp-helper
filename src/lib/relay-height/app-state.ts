import type { AntennaPayload } from "../antenna"
import type { PackageNames } from "../packages"

export type RelayHeightData = {
  vessel: AntennaPayload,
  relay: AntennaPayload,
  relayCount: number,
  planet: string,
  settings: {
    rangeModifier: string,
    dsnModifier: string,
    contents: Record<PackageNames, boolean>
  }
}

export const initialData: RelayHeightData = {
  vessel: new Map<string, number>,
  relay: new Map<string, number>,
  relayCount: 3,
  planet: "Kerbin",
  settings: {
    rangeModifier: "1",
    dsnModifier: "1",
    contents: { stock: true, outerplanets: false, commnetAntennasExtension: false, restockplus: false, dmagic: false, jsx2antenna: false, probesplus: false, venssr: false, nearfutureexpansion: false, }
  }
}