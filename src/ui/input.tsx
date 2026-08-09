import { useEffect, useId, useState, type ComponentProps, type ReactNode } from "react"
import { Select as BSelect } from '@base-ui/react/select'
import { cn } from "./cn"
import { LucideCheck, LucideChevronDown, LucideRotateCcw } from "./icons"
import { Slider as BSlider } from '@base-ui/react/slider'
import { Menu } from '@base-ui/react/menu'
import { cns } from "@/design-system"
import { ResetSettingsIconButton } from "./settings-section"

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
    <div className="flex gap-4 items-center">
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
                      "p-1 text",
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
  itemClassName?: string,
}) {
  return (
    <div className={cns.tab.base()}>
      {props.items.map((e, i) => {
        const selected = props.value === e.value
        return (
          <div key={i}
            onClick={() => props.onValueChange(e.value)}
            className={cns.tab.itemBase(selected, props.itemClassName)}>
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
  onValueCommitted?: (n: number) => void,
  thumbChildren?: ReactNode,
  step?: number
  className?: string,
}) {
  return (
    <BSlider.Root
      onValueCommitted={props.onValueCommitted}
      className={cn("group", props.className)} value={props.value} min={props.min} max={props.max} onValueChange={props.onValueChange} step={props.step} thumbAlignment="edge">
      <BSlider.Control className="flex w-full touch-none items-center py-0 select-none">
        <BSlider.Track className={cns.slider.track(
          "h-1 w-full select-none rounded-lg h-1.5"
        )}>
          <BSlider.Indicator className={cns.slider.indicator(
            "select-none rounded-lg"
          )} />
          <BSlider.Thumb
            className={cns.slider.thumb(
              "size-3 rounded-full select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ",
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
      "text-base",
      "flex flex-col gap-2",
      "max-h-[52vh]",
      "overflow-auto",
      props.className
    )} />
  )
}

export function MenuHelperText(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cns.text.muted("text-sm pl-2", props.className)} />
  )
}

export function MenuItem(props: ComponentProps<typeof Menu[ 'Item' ]>) {
  return (
    <Menu.Item
      {...props}
      className={cns.popover.item(
        "p-2 px-3",
        "flex gap-2 items-center",
        props.className
      )}
    />
  )
}

export function IntegerInput(props: ComponentProps<"input"> & {
  onValueChange: (num: number) => void
}) {
  const { onValueChange, ...rest } = props

  const [ val, setVal ] = useState(props.value)
  useEffect(() => {
    setVal(props.value)
  }, [ props.value ])

  return (
    <input {...rest}
      value={val}
      onChange={(e) => {
        props.onChange?.(e)
        const v = e.currentTarget.value
        setVal(v)
        if (v === "") return
        console.log(v)
        props.onValueChange(parseInt(v))
      }}
    />
  )
}

export function GenericInput(props: ComponentProps<"input"> & InputComponentProps<string>) {
  const { onValueChange, validate, error, onRawValueChange, initialValue, preprocessRaw, onEmpty, unit, ...rest } = props
  const [ val, setVal ] = useState(props.initialValue)
  const [ err, setErr ] = useState<string | undefined>(undefined)
  // useEffect(() => {
  //   setVal(props.initialValue)
  // }, [ props.initialValue ])

  return (
    <div className="flex flex-col max-w-none grow">
      <UnitInputWrapper unit={unit}>
        <input {...rest}
          className={cns.input.box(
            "max-w-60",
            (err || error) && cns.input.errorBox(),
            rest.className
          )}
          value={val}
          onChange={(e) => {
            props.onChange?.(e)
            const v = e.currentTarget.value
            onRawValueChange?.(v)
            setVal(v)
            if (v === "" && onEmpty) {
              const emptyError = onEmpty()
              if (emptyError)
                setErr(emptyError)
              return
            }
            const p = preprocessRaw ? preprocessRaw(v) : v
            const validateResult = validate(p, v)
            if (!validateResult) {
              setErr(undefined)
              onValueChange(p)
            }
            else setErr(validateResult)
          }}
        />
      </UnitInputWrapper>

      {err && <div className={cns.error.text.muted("text-xs")}>
        {err}
      </div>}
      {props.error && <div className={cns.error.text.muted("text-xs")}>
        {props.error}
      </div>}
    </div>
  )
}

const isValidNumberInput = (v: string): boolean => {
  const num = Number(v)
  if (Number.isNaN(num)) return false
  return true
}

type InputComponentProps<T> = Omit<ComponentProps<"input">, "value"> & {
  initialValue: T,
  onValueChange: (val: T) => void,
  validate: (val: T, raw: string) => string | undefined,
  onRawValueChange?: (val: string) => void,
  onEmpty?: () => string | void,
  preprocessRaw?: (val: string) => string,
  error?: string,
  inputClassname?: string,
  unit?: string,
}

export function NumberInput(props: InputComponentProps<number>) {
  const { onValueChange, ...rest } = props
  return (
    <GenericInput {...rest}
      initialValue={String(props.initialValue)}
      onValueChange={(v) => {
        if (v === "") return
        if (isValidNumberInput(v)) props.onValueChange(Number(v))
      }}
      preprocessRaw={(raw) => {
        const normalised = raw.replaceAll(',', '').replaceAll('_', '').replaceAll(' ', '')
        return props.preprocessRaw ? props.preprocessRaw(normalised) : normalised
      }}
      validate={(val) => {
        if (Number.isNaN(Number(val))) return "Invalid number"
        return props.validate(Number(val), val)
      }}
    />
  )
}

export function TextInput(props: InputComponentProps<string>) {
  const { onValueChange, ...rest } = props
  return (
    <GenericInput {...rest}
      initialValue={props.initialValue}
      onValueChange={(v) => props.onValueChange(v)}
      validate={(val) => {
        return props.validate(val, val)
      }}
    />
  )
}


export function InputWrapper(props: {
  label: ReactNode,
  children: ReactNode,
  error?: string | null
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm">{props.label}</label>
      <div className="flex gap-2 items-center">
        {props.children}
      </div>
      {props.error && <p className={cns.error.text.base("text-xs mt-1")}>
        {props.error}
      </p>}
    </div>
  )
}

export function UnitInputWrapper(props: {
  children: ReactNode,
  unit?: ReactNode,
}) {
  if (props.unit === undefined) return <>{props.children}</>
  return (
    <div className="grid grid-cols-[auto_1rem] gap-2 items-center">
      {props.children}
      {props.unit ?
        <div className={cns.text.muted()}>{props.unit}</div> : null
      }
    </div>
  )
}

export function NumberInputBlock(props: {
  label: string,
  onChange: (n: number) => void,
  value: number,
  resetValue?: number,
  step: string,
  error?: string,
}) {
  return (
    <InputWrapper label={props.label}>
      <NumberInput
        error={props.error}
        initialValue={props.value}
        validate={() => undefined}
        step={props.step}
        onValueChange={props.onChange}
      />
      {props.resetValue &&
        <ResetSettingsIconButton onClick={() => props.resetValue && props.onChange(props.resetValue)}>
          <LucideRotateCcw />
        </ResetSettingsIconButton>
      }
    </InputWrapper>
  )
}

export function TextInputBlock(props: {
  label: ReactNode,
  onChange: (n: string) => void,
  value: string,
  resetValue?: string,
  error?: string | undefined,
}) {
  return (
    <InputWrapper label={props.label} error={props.error}>
      <GenericInput
        validate={() => undefined}
        className={cn(
          props.error && cns.input.errorBox()
        )}
        initialValue={props.value}
        onValueChange={props.onChange}
      />
      {props.resetValue &&
        <ResetSettingsIconButton onClick={() => props.resetValue && props.onChange(props.resetValue)}>
          <LucideRotateCcw />
        </ResetSettingsIconButton>
      }
    </InputWrapper>
  )
}

export function InputBlock(props: {
  label: ReactNode,
  children: ReactNode,
  className?: string,
  row?: boolean
}) {

  if (props.row) {
    return (
      <div className={cns.surface("flex items-center gap-2", props.className)}>
        <label className={cns.text.label()}>{props.label}</label>
        {props.children}
      </div>
    )
  }

  return (
    <div className={cns.surface("flex flex-col gap-1.5", props.className)}>
      <label className={cns.text.label()}>{props.label}</label>
      {props.children}
    </div>
  )
}