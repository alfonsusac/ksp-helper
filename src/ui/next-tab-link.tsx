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
      className={cns.buttonGhost(
        "text-base",
        "font-semibold border border-transparent",
        isActive && [
          "pointer-events-none",
          cns.surface2card(),
          "opacity-100"
        ],
        "py-2 px-4",
      )}
    >
    </Link>
  </>
}