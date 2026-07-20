import { useId, type ComponentProps, type ReactNode } from "react"
import { Select as BSelect } from '@base-ui/react/select'
import { cn } from "./cn"
import { LucideCheck, LucideChevronDown } from "./icons"
import { Slider as BSlider } from '@base-ui/react/slider'
import { Menu } from '@base-ui/react/menu'
import { cns } from "./design-system"

export type SelectPayload = {
  value: string,
  label: ReactNode
}[]

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
        <BSelect.Label className="select-none">
          {props.label}
        </BSelect.Label>
        <BSelect.Trigger className={cns.input.box()}>
          <BSelect.Value className="grow text-start" />
          <BSelect.Icon>
            <LucideChevronDown />
          </BSelect.Icon>
        </BSelect.Trigger>

        <BSelect.Portal>
          <BSelect.Positioner className={cn(
            "outline-hidden select-none z-10"
          )} sideOffset={4}>
            <BSelect.Popup className={cns.popover.base("min-w-40")}>
              <BSelect.List className={cn("relative p-0.5 overflow-y-auto max-h-[var(--available-height)]")}>
                {props.data.map(({ label, value }) => (
                  <BSelect.Item
                    key={value}
                    value={value}
                    className={cns.popover.item(
                      cns.popover.selectItemLayout(),
                      "grid grid-cols-[0.5rem_1fr] items-center gap-2",
                      "p-1 text-sm",
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
  label: ReactNode,
  value: boolean,
  onValueChange: (n: boolean) => void,
  className?: string,
}) {
  const id = useId()
  return (
    <label
      className={cns.button.ghost('opacity-100', props.className)}
      htmlFor={id}>
      <input className="mb-1 cursor-pointer" type="checkbox" id={id} checked={props.value} onChange={e => props.onValueChange(e.currentTarget.checked)} />
      {props.label}
    </label>
  )
}

export function TabSelectRow<const T extends SelectPayload>(props: {
  items: T,
  value: T[ number ][ 'value' ],
  onValueChange: (value: T[ number ][ 'value' ]) => void,
}) {
  return (
    <div className={cn(
      cns.tab.containerBg(),
      cns.tab.containerBorder(),
      "p-1 flex self-start gap-1 border rounded-xl"
    )}>
      {props.items.map((e, i) => {
        const selected = props.value === e.value
        return (
          <div key={i}
            onClick={() => props.onValueChange(e.value)}
            className={cn(
              "p-2 rounded-md px-3 w-40 border border-transparent",
              "flex items-center gap-2",
              "select-none cursor-pointer",
              selected ? [
                cns.tab.selectedBg(),
                cns.tab.selectedBorder(),
                cns.tab.selectedShadow(),
              ] : cns.tab.itemHoverBg()
            )}>
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

export function Slider(props: {
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
        <BSlider.Track className={cns.slider.track(
          "h-1 w-full select-none rounded-lg"
        )}>
          <BSlider.Indicator className={cns.slider.indicator(
            "select-none rounded-lg"
          )} />
          <BSlider.Thumb
            className={cns.slider.thumb(
              "size-3 rounded-full select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ",
              // "has-[:focus-visible]:outline-neutral-950",
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

export function MenuPopup(props: ComponentProps<typeof Menu[ 'Popup' ]>) {
  return (
    <Menu.Popup {...props} className={cns.popover.base(
      "p-2",
      "flex flex-col gap-2",
      "max-h-[52vh]",
      "overflow-auto",
      props.className
    )} />
  )
}

export function MenuHelperText(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cns.text.muted("text-xs pl-2", props.className)} />
  )
}

export function MenuItem(props: ComponentProps<typeof Menu[ 'Item' ]>) {
  return (
    <Menu.Item
      {...props}
      className={cns.popover.item(
        "p-2 px-3 text-sm",
        "flex gap-2 items-center",
        props.className
      )}
    />
  )
}