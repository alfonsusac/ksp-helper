import { cns } from "@/design-system"
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { LucideCheck, LucideShare2 } from "./icons"
import { generateShareURL } from "@/lib/use-app-state"

export function CopyButton(props: {
  value: string,
  className: string,
  label: ReactNode,
  copied: ReactNode,
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
    <button
      className={props.className}
      onClick={handleCopy}
    >
      {copied === false ? <>
        {props.label}
      </> : <>
        {props.copied}
      </>}
    </button >
  )
}


export function ShareAppURLButton<T>(props: {
  data: T,
  className?: string
}) {
  return (
    <CopyButton
      value={generateShareURL(props.data)}
      className={cns.buttonBase(props.className)}
      label={<>
        <LucideShare2 />
        Share Setup</>}
      copied={<>
        <LucideCheck />
        Link Copied
      </>}
    />
  )
}