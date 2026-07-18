import { useEffect, useRef, useState, type ComponentProps } from "react"
import { cn } from "./cn"
import { LucideCheck, LucideShare2 } from "./icons"

export function GhostButton(props: ComponentProps<"button"> & {
  icon?: boolean,
}) {
  const { icon, ...rest } = props
  return (
    <button
      {...rest}
      className={cn(
        "hover:bg-slate-200/50 w-full flex items-center justify-center rounded-sm text-slate-500",
        "select-none cursor-pointer",
        "active:hover:bg-slate-200/75",
        "p-2 px-3 ",
        props.icon && "p-1.5 size-7",
        props.className
      )} />
  )
}


export function CopyButton(props: {
  value: string,
  className?: string
}) {

  const [ copied, setCopied ] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])
  async function handleCopy() {
    await navigator.clipboard.writeText(props.value)

    setCopied(true)

    if (timer.current) clearTimeout(timer.current)

    timer.current = window.setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <GhostButton
      className={cn("mt-4 text-sm gap-2 bg-slate-50", props.className)}
      onClick={handleCopy}
    >
      {copied === false ? <>
        <LucideShare2 />
        Share URL
      </> : <>
        <LucideCheck />
        Link Copied
      </>}
    </GhostButton >
  )
}
