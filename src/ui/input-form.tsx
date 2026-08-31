import { useState } from "react"

export function useForm<T>(props: {
  initial: () => T,
  onSubmit: (values: T) => void,
}) {
  const [val, setVal] = useState<T>(props.initial())

}