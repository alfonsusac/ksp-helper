"use client"

import { cnr } from "@/design-system"
import { cn } from "@/ui/cn"

export function ClientDebugTool() {
  if (process.env.NODE_ENV !== "development") return null
  return (
    <div className={cn(
      "fixed bottom-2 right-2 h-11 p-1.5 bg-black flex",
      "rounded-lg"
    )}>
      <button className={button()} onClick={() => {
        document.documentElement.style.setProperty('color-scheme', 'light')
      }}>
        Light
      </button>
      <button className={button()} onClick={() => {
        document.documentElement.style.setProperty('color-scheme', 'dark')
      }}>
        Dark
      </button>
      <button className={button()} onClick={() => {
        document.documentElement.style.setProperty('color-scheme', 'light dark')
      }}>
        Default
      </button>
    </div>
  )
}

const button = cnr(" px-4 hover:bg-current/10 rounded cursor-pointer active:bg-current/15")