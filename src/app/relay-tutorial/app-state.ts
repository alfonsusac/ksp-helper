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
    if (typeof s !== 'object' || s === null) return 'app state not an object'
    if ('height' in s === false) return 'height is not in app state'
    if ('apoapsis' in s === false) return 'apoapsis is not in app state'
    if ('relayCount' in s === false) return 'relayCount is not in app state'
    if ('mode' in s === false) return 'mode is not in app state'
    return true
  })
}