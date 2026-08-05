import type { Metadata } from "next"
import { AntennaRange_Client } from "./page.client"

export const metadata: Metadata = {
  title: "Maximum Antenna Range",
  description: "Calculate the maximum antenna range between two bodies",
}

export default function AntennaRange() {
  return (<AntennaRange_Client />)
}