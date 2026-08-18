"use client"

import { humanFileSize } from "@/lib/pretty-num"
import { use } from "react"

export function SpacedockDownloadURLFileSizeClient(props: {
  sizePromise: Promise<number>
}) {
  // const bytes = await SpacedockNext.getDownloadURLFileSize(props.path)
  const bytes = use(props.sizePromise)
  return <>
    {humanFileSize(bytes)}
  </>
}