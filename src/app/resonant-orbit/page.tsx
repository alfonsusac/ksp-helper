import type { Metadata } from "next"
import { ResonantOrbitClient } from "./page.client"

export const metadata: Metadata = {
  title: "Resonant Orbit Calculator",
  description: "Calculate "
}

export default function ResonantOrbitPage() {
  return <ResonantOrbitClient />  
}