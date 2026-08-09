import { useAppState } from "@/lib/use-app-state"

export type RelayTutorialData = {
  height: number,
  apoapsis: number,
  relayCount: number,
  mode: "diving" | "peaking",
}

export const initialData = (): RelayTutorialData => {
  return {
    height: 1_000_000,
    apoapsis: 0,
    relayCount: 0,
    mode: "peaking"
  }
}

export function useRelayTutorialAppState() {
  return useAppState<RelayTutorialData>("relay-height", initialData, (s) => {
    if (typeof s !== 'object' || s === null) return false
    if ('height' in s === false) return false
    if ('apoapsis' in s === false) return false
    if ('relayCount' in s === false) return false
    return true
  })
}