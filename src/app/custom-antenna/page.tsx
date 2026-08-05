import type { Metadata } from "next"
import { CustomAntennaPage_Client } from "./page.client"

export const metadata: Metadata = {
  title: "Manage Custom Celestial Body",
  description: "Add or remove custom celestial bodies.",
}

export default function CustomAntennaPage() {
  return (<CustomAntennaPage_Client />)
}
