import type { AntennaPayload } from "../antenna"
import { useAppState } from "../use-app-state"

export type RelayHeightData = {
  vessel: AntennaPayload,
  relay: AntennaPayload,
  relayCount: number,
  planet: string,
  strength: number,
  orbitRatio: number,
}

export const initialData = () => {
  const temp: RelayHeightData = {
    vessel: new Map<string, number>,
    relay: new Map<string, number>,
    relayCount: 3,
    planet: "Kerbin",
    strength: 0.95,
    orbitRatio: 0.5,
  }
  temp.relay.set("hg5", 1)
  temp.vessel.set("c16", 1)
  return temp
}

export function useRelayHeightAppState() {
  return useAppState<RelayHeightData>("relay-height", initialData, (s) => {
    if (typeof s !== 'object' || s === null) return false
    if ('vessel' in s === false) return false
    if ('relay' in s === false) return false
    if ('relayCount' in s === false) return false
    if ('planet' in s === false) return false
    if ('strength' in s === false) return false
    if ('orbitRatio' in s === false) return false
    return true
  })
}