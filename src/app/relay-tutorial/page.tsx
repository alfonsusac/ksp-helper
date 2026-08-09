import type { Metadata } from "next"
import { RelayTutorial_Client } from "./page.client"

export const metadata: Metadata = {
  title: "Simple Relay Tutorial",
  description: "Guide on how to set up a relay orbit.",
}

export default function RelayHeight() {
  return (<RelayTutorial_Client />)
}
