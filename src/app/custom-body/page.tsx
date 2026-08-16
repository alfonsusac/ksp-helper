import type { Metadata } from "next"
import { CustomPlanetsPage_Client } from "./page.client"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Manage Custom Celestial Body",
  description: "Add or remove custom celestial bodies.",
}

export default function CustomPlanetsPage() {
  return <Suspense>
    <CustomPlanetsPage_Client />
  </Suspense>
}