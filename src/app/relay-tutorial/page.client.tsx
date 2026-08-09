"use client"

import { cns } from "@/design-system"
import { useRelayTutorialAppState } from "./app-state"

export function RelayTutorial_Client() {

  const [ data, setData ] = useRelayTutorialAppState()

  return (
    <div className={cns.page("max-w-120")}>

    </div>
  )
}