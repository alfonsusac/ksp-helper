import type { AntennaPayload } from "../antenna"
import { useAppState } from "../use-app-state"

export type RelayHeightData = {
  vessel: AntennaPayload,
  relay: AntennaPayload,
  relayCount: number,
  planet: string,
  strength: number,
  orbitRatio: number,
  overrideHeight: number | undefined,
}

export const initialData = () => {
  const temp: RelayHeightData = {
    vessel: new Map<string, number>,
    relay: new Map<string, number>,
    relayCount: 3,
    planet: "Kerbin",
    strength: 0.95,
    orbitRatio: 0.5,
    overrideHeight: undefined,
  }
  temp.relay.set("hg5", 1)
  temp.vessel.set("c16", 1)
  return temp
}

export function useRelayHeightAppState() {
  return useAppState<RelayHeightData>("relay-height", initialData, (s) => {
    console.log(s)
    if (typeof s !== 'object' || s === null) return 'state is not an object'
    if ('vessel' in s === false) return 'vessel not in state object'
    if ('relay' in s === false) return 'relay not in state object'
    if ('relayCount' in s === false) return 'relayCount not in state object'
    if ('planet' in s === false) return 'planet not in state object'
    if ('strength' in s === false) return 'strength not in state object'
    if ('orbitRatio' in s === false) return 'orbitRatio not in state object'
    return true
  })
}