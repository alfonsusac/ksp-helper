import { cns } from "@/design-system"
import type { ReactNode } from "react"

export function InputGroup(props: {
  id: string,
  label: ReactNode,
  children: ReactNode,
  error?: string | null,
  raw?: any,
}) {

  return (
    <div className="input-group group">
      {props.label &&
        <label className="input-label" htmlFor={props.id}>{props.label}</label>
      }
      <div className="flex gap-2 items-center">
        {props.children}
      </div>
      {props.error && <p className={cns.errorTextBase("text-xs")}>
        {props.error}
      </p>}
      {props.raw !== undefined && <p className="text-faint text-xs">= {(props.raw)}</p>}
    </div>
  )
}