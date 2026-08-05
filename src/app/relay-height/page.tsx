import type { Metadata } from "next"
import { RelayHeight_Client } from "./page.client"

export const metadata: Metadata = {
  title: "Maximum Antenna Range",
  description: "Find the ideal relay height given antenna requirement and celestial body",
}

export default function RelayHeight() {
  return (<RelayHeight_Client />)
}
