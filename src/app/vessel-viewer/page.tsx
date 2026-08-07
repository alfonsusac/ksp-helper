import type { Metadata } from "next"
import { VesselViewerClient } from "./page.client"

export const metadata: Metadata = {
  title: "Vessel Viewer",
  description: "Preview the Vessel ",
}

export default function VesselViewerPage() {
  return <VesselViewerClient />
}