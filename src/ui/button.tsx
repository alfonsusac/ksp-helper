import type { ComponentProps } from "react"
import { cn } from "./cn"

export function GhostButton(props: ComponentProps<"button"> & {
  icon?: boolean,
}) {
  const { icon, ...rest } = props
  return (
    <button
      {...rest}
      className={cn(
        "hover:bg-slate-200/50 w-full flex items-center justify-center rounded-sm text-slate-500",
        "select-none cursor-pointer",
        "active:hover:bg-slate-200/75",
        "p-2 px-3 ",
        props.icon && "p-1.5 size-7",
        props.className
      )} />
  )
}
