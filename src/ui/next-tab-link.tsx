"use client"

import { cns } from "@/design-system"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

export function TabLink(props: ComponentProps<typeof Link>) {
  const path = usePathname()
  const isActive = path === props.href
  return <>
    <Link
      {...props}
      className={cns.tabItem(isActive)(
        "rounded-xl",
        "w-auto px-5 justify-center",
      )}
    >
    </Link>
  </>
}