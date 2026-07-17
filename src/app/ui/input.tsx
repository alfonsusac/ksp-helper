import { useId, type ReactNode } from "react"
import { Select as BSelect } from '@base-ui/react/select'
import { cn } from "./cn"
import { LucideCheck, LucideChevronDown } from "./icons"
import { Slider as BSlider } from '@base-ui/react/slider'

export type SelectPayload = {
  value: string,
  label: ReactNode
}[]

export function Select<const T extends SelectPayload>(props: {
  id: string,
  data: T,
  value: T[ number ][ 'value' ],
  onValueChange: (value: T[ number ][ 'value' ]) => void
}) {
  return (
    <select
      id={props.id}
      value={props.value}
      onChange={(e) => props.onValueChange(e.currentTarget.value as T[ number ][ 'value' ])}
      className="border border-slate-300 p-1 rounded-md"
    >
      {props.data.map((d, i) => {
        return (
          <option key={i} value={d.value}>{d.label}</option>
        )
      })}
    </select>
  )
}



export function SelectRow<const T extends SelectPayload>(props: {
  data: T,
  value: T[ number ][ 'value' ],
  onValueChange: (value: T[ number ][ 'value' ]) => void,
  label: string,
}) {
  const id = useId()

  return (
    <div className="flex gap-4 items-center text-sm">
      <BSelect.Root
        value={props.value}
        items={props.data}
        onValueChange={(e) => {
          if (e === null) return
          props.onValueChange(e)
        }}
      >
        <BSelect.Label className="text-slate-500 select-none">
          {props.label}
        </BSelect.Label>
        <BSelect.Trigger className={cn(
          "border border-slate-300 p-1 pl-3 min-w-30 rounded-md hover:bg-slate-100",
          "flex gap-2 items-center"
        )}>
          <BSelect.Value className="grow text-start" />
          <BSelect.Icon>
            <LucideChevronDown />
          </BSelect.Icon>
        </BSelect.Trigger>

        <BSelect.Portal>
          <BSelect.Positioner className={cn(
            "outline-hidden select-none z-10"
          )} sideOffset={4}>
            <BSelect.Popup className={cn(
              "outline-hidden",
              "bg-background rounded-md rounded-md border border-slate-400",
              "shadow-md shadow-slate-300",
              "min-w-40",
              "transition-[scale,opacity] duration-100 ease-out",
              "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            )}>
              <BSelect.List className={cn("relative p-0.5 overflow-y-auto max-h-[var(--available-height)]")}>
                {props.data.map(({ label, value }) => (
                  <BSelect.Item
                    key={value}
                    value={value}
                    className={cn(
                      "cursor-default",
                      "grid  grid-cols-[0.5rem_1fr] items-center gap-2",
                      "p-1 rounded-md text-sm outline-hidden",
                      "select-none ",
                      "data-highlighted:bg-slate-100"
                      // "dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
                    )}
                  >
                    <BSelect.ItemIndicator className="col-start-1">
                      <LucideCheck />
                    </BSelect.ItemIndicator>
                    <BSelect.ItemText className="col-start-2">{label}</BSelect.ItemText>
                  </BSelect.Item>
                ))}
              </BSelect.List>
            </BSelect.Popup>
          </BSelect.Positioner>
        </BSelect.Portal>
      </BSelect.Root>
    </div>
  )
}

export function CheckboxRow(props: {
  label: string,
  value: boolean,
  onValueChange: (n: boolean) => void
}) {
  const id = useId()
  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <input className="mb-1 cursor-pointer" type="checkbox" id={id} checked={props.value} onChange={e => props.onValueChange(e.currentTarget.checked)} />
      <label className="text-slate-500 select-none cursor-pointer" htmlFor={id}>
        {props.label}
      </label>
    </div>
  )
}

export function TabSelectRow<const T extends SelectPayload>(props: {
  items: T,
  value: T[ number ][ 'value' ],
  onValueChange: (value: T[ number ][ 'value' ]) => void,
}) {
  return (
    <div className="p-1 flex self-start gap-1 bg-slate-100 border border-slate-200/50 rounded-xl">
      {props.items.map((e, i) => {
        const selected = props.value === e.value
        return (
          <div key={i}
            onClick={() => props.onValueChange(e.value)}
            className={cn(
              "p-2 rounded-md px-3 w-40 border border-transparent",
              "flex items-center gap-2",
              "select-none cursor-pointer",
              selected ? " border-slate-200 bg-background " : "hover:bg-slate-50"
            )}>
            <div className={cn(
              "text-slate-700 rounded-lg size-4 grid place-items-center p-0.5 shrink-0",
              selected ? "opacity-100" : "opacity-0"
            )}>
              <LucideCheck className="size-full stroke-3" />
            </div>
            {e.label}
          </div>
        )
      })}
    </div>
  )
}

export default function Slider(props: {
  min: number,
  max: number,
  value: number,
  onValueChange: (n: number) => void,
  thumbChildren?: ReactNode,
  step?: number
}) {
  return (
    <BSlider.Root value={props.value} min={props.min} max={props.max} onValueChange={props.onValueChange} step={props.step} thumbAlignment="edge" >
      <BSlider.Control className="flex w-full touch-none items-center py-3 select-none">
        <BSlider.Track className="h-1 w-full bg-slate-200 select-none rounded-lg">
          <BSlider.Indicator className="bg-slate-400 select-none rounded-lg" />
          <BSlider.Thumb
            className={cn(
              "size-3 rounded-full border border-slate-400 bg-slate-400 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-neutral-950",
              "hover:cursor-pointer"
            )}
          >
            {props.thumbChildren}
          </BSlider.Thumb>
        </BSlider.Track>
      </BSlider.Control>
    </BSlider.Root>
  )
}