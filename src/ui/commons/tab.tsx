import { cns } from "@/design-system"
import { cn } from "../cn"
import { LucideCheck } from "../icons"
import type { ValueLabelArray } from "../input"

export function TabSelectRow<const T extends ValueLabelArray>(props: {
  items: T,
  value: T[ number ][ 'value' ],
  onValueChange: (value: T[ number ][ 'value' ]) => void,
  itemClassName?: string,
}) {
  return (
    <div className={cns.tabBase()}>
      {props.items.map((e, i) => {
        const selected = props.value === e.value
        return (
          <div key={i}
            onClick={() => props.onValueChange(e.value)}
            className={cns.tabItem(selected)(props.itemClassName)}>
            <div className={cn(
              "size-4 grid place-items-center p-0.5 shrink-0",
              selected ? "opacity-100" : "opacity-0"
            )}>
              <LucideCheck className="size-full stroke-4" />
            </div>
            {e.label}
          </div>
        )
      })}
    </div>
  )
}