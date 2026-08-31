import { cns } from "@/design-system"
import { useId, useRef, useState, type ChangeEvent, type ReactNode } from "react"
import { LucideRotateCcw } from "./icons"
import { InputGroup } from "./input-ui"


export function ResetIconButton(props: {
  className?: string
  field: Field<any>,
}) {
  return (
    <button
      {...props}
      className={cns.buttonGhost(cns.buttonIcon("shrink-0"), props.className)}
      disabled={props.field.isResettable}
      onClick={props.field.reset}
    >
      <LucideRotateCcw />
    </button>
  )
}

export function FieldBlock<T>(props: {
  label?: string,
  savedValue?: any,
  endAdornment?: ReactNode,
  hideReset?: boolean,
} & (
    | { field: Field<T>, fieldDef?: never }
    | { field?: never, fieldDef: UseFieldProps<T> }
  )
) {
  const field = useField<T>(props.field ? { field: props.field } : props.fieldDef)
  return (
    <InputGroup
      label={props.label}
      raw={props.savedValue}
      id={field.id}
      error={field.error}
    >
      <div className={cns.inputBoxWithError(field.error)()}>
        <input
          id={field.id}
          value={field.value}
          onChange={field.onChange}
          className={cns.inputInner()} />
        {props.endAdornment &&
          <div className={cns.inputAdornment()}>
            {props.endAdornment}
          </div>
        }
        {!props.hideReset &&
          <div className={cns.inputAdornment()}>
            <ResetIconButton field={field} />
          </div>
        }
      </div>
    </InputGroup>
  )
}


// Hooks

type DefaultStringValidations = {
  noempty?: Flag,
}

type CustomPropPart<T, F> = {
  initialData: () => T,
  validate: (v: F) => T,
  deserialize: (i: T) => F,
}

type CommonPropPart<T> = {
  onValidChange?: null | ((v: T) => void),
  resetValue?: null | (() => T),
  error?: null | string,
} & DefaultStringValidations

type FieldDef<T> =
  & CommonPropPart<T>
  & (
    T extends string
    ? Partial<CustomPropPart<T, string>> : CustomPropPart<T, string>
  )

type UseFieldProps<T> =
  | (
    { field?: never }
    & FieldDef<T>
  )
  | (
    { field: Field<T> }
    & MakeNever<FieldDef<T>>
  )


const NOVALUE = Symbol

// Todo: What happens if the intiial data already fails validation? option to error on first or skip?

export function useField<T = string>(props:
  UseFieldProps<T>
): Field<T> {
  const deserialize = props.deserialize ?? ((s: T) => s as string)    // If no deserialize then T is string. Therefore safe to pass
  const validate = props.validate ?? (t => t as T)
  const getInitialData = props.initialData ?? (() => "" as T)         // if no initial data then T is string.
  const getDeserializedInitialData = () => deserialize(getInitialData())
  const getResetvalue = () => deserialize((props.resetValue ?? getInitialData)())

  const id = useId()
  const [ raw, setRaw ] = useState<string>(getDeserializedInitialData())
  const lastValidValue = useRef<T>(getInitialData())                  // assume initial data is valid.
  const fieldError = useRef<string | undefined>(undefined)


  if (props.field)
    return props.field

  const changeRawValue = (v: string, external?: boolean) => {
    fieldError.current = undefined
    setRaw(v)
    if (external) return // no need to signal change nor validate if external
    try {
      if (props.noempty && v === "") throw "Can't be empty"
      const parsed = validate(v)
      props.onValidChange?.(parsed)
      lastValidValue.current = parsed
    } catch (error) {
      fieldError.current = toErrorMessage(error)
    }
  }

  const isDirty = raw === getDeserializedInitialData()
  const isResettable = raw === getResetvalue()
  const isInvalid = (props.error ?? fieldError.current) !== undefined

  const res = {
    id,
    value: raw,
    lastValidValue: lastValidValue.current,
    setValue: (nv: T) => {
      changeRawValue(deserialize(nv), true)
    },
    onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const raw = e.currentTarget.value
      changeRawValue(raw)
    },
    error: props.error ?? fieldError.current,
    isDirty,
    isInvalid,
    refresh: () => changeRawValue(raw),

    reset: () => changeRawValue(getResetvalue()),
    isResettable,

    fieldDef: {
      initialData: getInitialData,
      validate: validate,
      deserialize: deserialize,
      onValidChange: props.onValidChange ?? null,
      resetValue: props.resetValue ?? null,
      error: props.error ?? null,
      noempty: props.noempty ?? null,
    } satisfies Field<T>[ 'fieldDef' ]

  } satisfies Field<T>

  return res
}

export type Field<T> = {
  // Interfaces
  setValue: (nv: T) => void
  lastValidValue: T,
  reset: () => void
  refresh: () => void

  // To Component Props
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
  error: string | undefined
  isDirty: boolean
  isResettable: boolean
  isInvalid: boolean,

  // for nesting
  fieldDef: Required<CustomPropPart<T, string> & CommonPropPart<T>>
}


type DerivedUseFieldProps<T, Extra extends object> = {
  initialData?: () => T,
  onValidChange?: (v: T) => void,
  validate?: (v: T) => void,
  onEmpty?: () => T,
} & CommonPropPart<T>
  & DefaultStringValidations
  & Extra

export function textField(props:
  DerivedUseFieldProps<string, {}>
): UseFieldProps<string> {
  return {
    ...props,
    validate: r => {
      props.validate?.(r)
      return r
    }
  }
}

export function numberField(props:
  DerivedUseFieldProps<number, {
    nonnegative?: Flag,
  }>
): UseFieldProps<number> {
  return {
    ...props,
    initialData: () => props.initialData?.() ?? 0,
    onValidChange: r => props.onValidChange?.(Number(r)),
    validate: r => {
      if (r === "" && props.onEmpty) return props.onEmpty()
      const n = Number(r)
      if (Number.isNaN(n)) throw "Invalid number"
      if (props.nonnegative && n < 0) throw "Can't be negative"
      props.validate?.(n)
      return n
    },
    deserialize: (i) => String(i),
  }
}


// Commons

function toErrorMessage(err: unknown): string {
  if (typeof err === "string") return err
  if (err instanceof Error) return err.message
  console.error("Unhandled validate error:", err) // visibility, doesn't block release
  return "Invalid value" // catch-all fallback — never leak [object Object] etc.
}

type MakeExplicit<T> = {
  [ K in keyof T & {} ]: T[ K ]
}
type MakeNever<T> = {
  [ K in keyof T ]?: never
}

type Flag = boolean | 1 | 0 | null | undefined | Record<never, never>