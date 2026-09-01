import { relativeDate } from "@/lib/format-relative-date"
import { TooltipSimple } from "./tooltip"
import { format, intlFormat, parse } from "date-fns"

export function DateTooltip(props: {
  value?: string | undefined,
}) {
  const date = props.value ? intlFormat(props.value, {
    dateStyle: "medium",
    timeStyle: "medium"
  }) : null 

  return <TooltipSimple
    trigger={<span>{relativeDate(props.value ?? "")}</span>}
    content={<div>
      {date ?? "Unknown Date"}
    </div>}
  />
}