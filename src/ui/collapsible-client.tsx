"use client"

import type { ReactNode } from "react"
import { cn } from "./cn"

export function Collapsible(props: {
  opened: boolean,
  row?: boolean,
  column?: boolean,
  className?: string,
  render: (opened: boolean) => ReactNode
}) {
  const isColumn = props.column === true

  return (
    <div className={cn(
      isColumn ? [
        "grid-cols-[0fr]",
        "data-opened:grid-cols-[1fr]",
        "transition-[grid-template-columns,opacity]"
      ] : [
        "grid-rows-[0fr]",
        "data-opened:grid-rows-[1fr]",
        "transition-[grid-template-rows]"
      ],
      "grid overflow-clip duration-300",
      props.className
    )}
      data-opened={props.opened ? "" : undefined}
    >
      <div className="min-h-0 min-w-0">
        {props.render(props.opened)}
      </div>
    </div>
  )

}