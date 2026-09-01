import { Tooltip } from '@base-ui/react/tooltip'
import type { ReactNode } from 'react'
import { cn } from './cn'

const triggerClass =
  'flex size-8 items-center justify-center border-0 bg-transparent text-neutral-950 select-none data-popup-open:bg-neutral-100 focus-visible:relative focus-visible:z-1 focus-visible:bg-transparent focus-visible:outline-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white hover:bg-neutral-100 active:bg-neutral-200 dark:text-white dark:data-popup-open:bg-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700'
const popupClass =
  'relative flex flex-col border border-neutral-950 bg-white px-2 py-1 text-sm text-neutral-950 origin-[var(--transform-origin)] shadow-[0.25rem_0.25rem_0] shadow-black/12 transition-[transform,opacity] duration-100 ease-out data-ending-style:opacity-0 data-ending-style:[transform:scale(0.98)] data-instant:transition-none data-starting-style:opacity-0 data-starting-style:[transform:scale(0.98)] dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none'
const arrowClass =
  "relative block w-3 h-1.5 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-[calc(6px*sqrt(2))] before:h-[calc(6px*sqrt(2))] before:bg-white dark:before:bg-neutral-950 before:border before:border-neutral-950 dark:before:border-white before:[transform:translate(-50%,50%)_rotate(45deg)]"

const style = {
  popup: cn(
    "relative px-2.5 py-1.5",
    "rounded-md",
    "flex flex-col",
    "border border-border2 bg-surface2",
    "text-base text-fg",
    "origin-[var(--transform-origin)]",
    "shadow-md shadow-dark/25",
    "transition-[transform,opacity] duration-100 ease-out ",
    "data-instant:transition-none",
    "data-ending-style:opacity-0 data-ending-style:[transform:scale(0.90)]",
    "data-starting-style:opacity-0 data-starting-style:[transform:scale(0.90)]"
  ),
  arrow: cn(
    "relative w-3 h-1.5",
    "block overflow-clip",
    "data-[side=bottom]:top-[-6px]",
    "data-[side=left]:right-[-9px]",
    "data-[side=left]:rotate-90",
    "data-[side=right]:left-[-9px]",
    "data-[side=right]:-rotate-90",
    "data-[side=top]:bottom-[-6px]",
    "data-[side=top]:rotate-180",
    "before:content-['']",
    "before:absolute before:bottom-0 before:left-1/2",
    "before:w-[calc(6px*sqrt(2))] before:h-[calc(6px*sqrt(2))]",
    "before:bg-surface2",
    "before:border before:border-border",
    "before:[transform:translate(-50%,50%)_rotate(45deg)]",
  ),
}


export function TooltipSimple(props: {
  trigger?: Tooltip.Trigger.Props['render']
  content?: ReactNode
}) {
  return (
    <Tooltip.Provider
      delay={150}
      timeout={0}
    >
      <Tooltip.Root>
        <Tooltip.Trigger aria-label="Bold" render={props.trigger}>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={11}>
            <Tooltip.Popup className={style.popup}>
              <Tooltip.Arrow className={style.arrow} />
              {props.content}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}



// ---------