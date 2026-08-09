import { Suspense } from "react"
import { HomeButton } from "./common"
import { BackOrHomeButtonClient } from "./common.client"

export function HomeOrBackButton() {
  return (
    <Suspense fallback={<HomeButton />} >
      <BackOrHomeButtonClient />
    </Suspense>
  )
}