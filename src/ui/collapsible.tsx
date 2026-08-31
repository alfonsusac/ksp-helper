import type { ComponentProps } from "react"
import { cn } from "./cn"

export function CollapsibleRow(props: ComponentProps<"div"> & { 'data-opened': boolean }) {
  return (
    <div {...props} className={cn(
      "grid grid-rows-[0fr] data-opened:grid-rows-[1fr] overflow-clip",
      "transition-[grid-template-rows] duration-300",
      props.className
    )}
      data-opened={props[ 'data-opened' ] ? "" : undefined}
    >
      <div className="min-h-0 min-w-0">
        {props.children}
      </div>
    </div>
  )
}
export function CollapsibleColumn(props: ComponentProps<"div"> & { 'data-opened': boolean }) {
  return (
    <div {...props} className={cn(
      "grid grid-cols-[0fr] data-opened:grid-cols-[1fr] overflow-clip",
      "transition-[grid-template-columns,opacity] duration-300",
      props.className
    )}
      data-opened={props[ 'data-opened' ] ? "" : undefined}
    >
      <div className="min-w-0 min-h-0">
        {props.children}
      </div>
    </div>
  )
}