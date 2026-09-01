"use client"

import { cns } from "@/design-system"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { cn } from "./cn"

export function TabLink(props: ComponentProps<typeof Link>) {
  const path = usePathname()
  const isActive = path === props.href
  return <>
    <Link
      {...props}
      className={cn(
        "pb-1.5 border-b-2 border-transparent text-fg2",
        isActive && "border-b-fgBlue/80 text-fg",
      )}
    >
      <div className={cns.tabItem(isActive)(
        "w-auto px-3 py-1.5 justify-center rounded-xl"
      )}>
        {props.children}
      </div>
    </Link>
  </>
}