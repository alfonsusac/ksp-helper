import { cn } from "@/ui/cn"
import { createElement, type ComponentProps } from "react"

export function component<T extends
  | React.ElementType
>(
  component: T & HasClassName<T>,
  props?: {
    class?: string | string[],
  },
  displayName?: string,
) {
  const comp = (p: ComponentProps<T>) => {
    return createElement(component, {
      ...p,
      className: cn(props?.class, p.className)
    })
  }
  comp.displayName = displayName

  return comp
}

type HasClassName<T extends React.ElementType> =
"className" extends keyof React.ComponentProps<T> ? T : never

type IntrinsicElementWithClassname = {
  [ K in keyof React.JSX.IntrinsicElements ]: "className" extends keyof React.JSX.IntrinsicElements[ K ] ? K : never
}[ keyof React.JSX.IntrinsicElements ]