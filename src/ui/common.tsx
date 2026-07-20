import type { ComponentProps } from "react"
import { cn } from "./cn"
import { cns } from "./design-system"

export function SignalSymbol(props: {
  strength?: number,
  className?: string,
  barClassname?: string
}) {

  const getSignalBarColor = (bar: 1 | 2 | 3 | 4) => {
    if (props.strength === undefined) return ""
    if (props.strength === 0) {
    }
    else if (props.strength < .25) {
      if (bar === 1) return "bg-red-400"
    }
    else if (props.strength < .5) {
      if (bar === 1) return "bg-orange-400"
      if (bar === 2) return "bg-orange-400"
    }
    else if (props.strength < .75) {
      if (bar === 1) return "bg-yellow-400"
      if (bar === 2) return "bg-yellow-400"
      if (bar === 3) return "bg-yellow-400"
    }
    else {
      if (bar === 1) return "bg-green-500"
      if (bar === 2) return "bg-green-500"
      if (bar === 3) return "bg-green-500"
      if (bar === 4) return "bg-green-500"
    }
  }
  return (
    <div className={cn("grid grid-cols-4 gap-px size-4 items-end", props.className)}>
      <div className={cn("h-1/4 bg-slate-500/20", props.barClassname, getSignalBarColor(1))}></div>
      <div className={cn("h-1/2 bg-slate-500/20", props.barClassname, getSignalBarColor(2))}></div>
      <div className={cn("h-3/4 bg-slate-500/20", props.barClassname, getSignalBarColor(3))}></div>
      <div className={cn("h-4/4 bg-slate-500/20", props.barClassname, getSignalBarColor(4))}></div>
    </div>
  )
}

export function Divider(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cns.divider(
      "border-b border-l border-slate-200 self-stretch",
      props.className
    )} />
  )
}

export function PageSection(props: ComponentProps<"div">) {
  return (
    <div {...props} className={
      cn(
        props.className
      )
    } />
  )
}