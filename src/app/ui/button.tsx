import type { ComponentProps } from "react"
import { cn } from "./cn"

export function GhostButton(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "hover:bg-slate-200/50 w-full flex items-center justify-center rounded-sm text-slate-500",
        "select-none cursor-pointer",
        "active:hover:bg-slate-200/75",
        "p-1.5",
        props.className
      )} />
  )
}