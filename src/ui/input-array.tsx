import { useState } from "react"


export function useFieldArray<T>(props: {
  newItem: () => T,
  initial: () => T[],
  validate: (nv: { id: string, value: T }[], error: ArrayErrorMap<T>) => ArrayErrorMap<T>,
  onValidChange: (n: T[]) => void,
}) {
  const getNewId = () => Math.random().toString(36)
  const getInitial = () => {
    const initial = (props.initial ?? (() => []))()
    return initial.map(e => ({ id: getNewId(), value: e, }))
  }

  const [ rawData, setRawData ] = useState(getInitial())
  const [ errors, setErrors ] = useState<ArrayErrorMap<T>>(new Map())

  const changeRawData = (newRawData: ReturnType<typeof getInitial>) => {
    setRawData(newRawData)
    const err = props.validate(newRawData, new Map())
    setErrors(err)
    if (err.size === 0) {
      props.onValidChange(newRawData.map(r => r.value))
    }
  }

  return {
    rawData,
    fields: rawData.map((e, i) => {
      const id = e.id
      return {
        id: e.id,
        value: e.value,
        errors: errors.get(e.id),
        onChange: function (nv: T): void {
          const t = rawData.map((e) => e.id === id ? { id: id, value: nv } : e)
          changeRawData(t)
        },
        onDelete: function (): void {
          const t = rawData.filter((e) => e.id !== id)
          changeRawData(t)
        },
        onErrorChange: function (ne: DeepLeafObjectChange<T, string | undefined>): void {
          throw new Error("Function not implemented.")
        },
        onDirtyChange: function (): DeepStringifyAndOptional<boolean> {
          throw new Error("Function not implemented.")
        }
      } satisfies FieldArrayItem<T>
    }),
    errors,
    append() {
      rawData.push({ id: getNewId(), value: props.newItem() })
      changeRawData([ ...rawData ])
    },
    isEmpty: rawData.length === 0
  }
}

export type FieldArrayItem<T> = {
  id: string,
  value: T,
  errors: DeepStringifyAndOptional<T> | undefined,
  onChange: (nv: T) => void,
  onDelete: () => void,
  onErrorChange: (ne: DeepStringifyAndOptional<T>) => void,
  onDirtyChange: () => DeepStringifyAndOptional<boolean>,
}


type DeepLeafObjectChange<T, Into> =
  T extends readonly unknown[]
  ? { [ K in keyof T ]?: DeepLeafObjectChange<T[ K ], Into> }
  : T extends object
  ? { [ K in keyof T ]?: DeepLeafObjectChange<T[ K ], Into> }
  : Into

type DeepStringifyAndOptional<T> =
  DeepLeafObjectChange<T, string | undefined>


type ArrayErrorMap<T> = Map<string, DeepStringifyAndOptional<T>>