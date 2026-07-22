import type { ComponentProps } from "react"
import { cn } from "./cn"
import { cns } from "@/design-system"

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
      if (bar === 1) return cns.signalBarRed()
    }
    else if (props.strength < .5) {
      if (bar === 1) return cns.signalBarOrange()
      if (bar === 2) return cns.signalBarOrange()
    }
    else if (props.strength < .75) {
      if (bar === 1) return cns.signalBarYellow()
      if (bar === 2) return cns.signalBarYellow()
      if (bar === 3) return cns.signalBarYellow()
    }
    else {
      if (bar === 1) return cns.signalBarGreen()
      if (bar === 2) return cns.signalBarGreen()
      if (bar === 3) return cns.signalBarGreen()
      if (bar === 4) return cns.signalBarGreen()
    }
  }
  return (
    <div className={cn("grid grid-cols-4 gap-px size-4 items-end", props.className)}>
      <div className={cns.signalBarBg("h-1/4", props.barClassname, getSignalBarColor(1))}></div>
      <div className={cns.signalBarBg("h-1/2", props.barClassname, getSignalBarColor(2))}></div>
      <div className={cns.signalBarBg("h-3/4", props.barClassname, getSignalBarColor(3))}></div>
      <div className={cns.signalBarBg("h-4/4", props.barClassname, getSignalBarColor(4))}></div>
    </div>
  )
}

export function Divider(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cns.divider(
      "border-b border-l self-stretch",
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