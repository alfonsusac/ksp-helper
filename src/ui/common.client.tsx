"use client"

import { useSearchParams } from "next/navigation"
import { BackButton, HomeButton } from "./common"

export function BackOrHomeButtonClient() {

  const sp = useSearchParams()
  const back = (() => {
    const v = sp?.get('back')
    if (v?.startsWith('/')) return v
    return null
  })()

  return (
    <>
      {back
        ? <BackButton href={back} />
        : <HomeButton />
      }
    </>
  )

}