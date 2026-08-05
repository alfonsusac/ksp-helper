"use client"

import { cns } from "@/design-system"
import { HomeButton } from "@/ui/common"

export function ResonantOrbitClient() {
  return <div className={cns.page("max-w-240")}>
    <HomeButton />

    <header>
      <h1 className={cns.pageTitle()}>
        Resonant Orbit Calculator by Eric Meyer
      </h1>
      <div className={cns.pageDescription()}>
        Find the apoapsis needed to create a equally-spaced relay orbits. Usefull for creating a CommNet relay constellation.
      </div>
    </header>

  </div>
}