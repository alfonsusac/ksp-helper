"use client"

import { cns } from "@/design-system"
import { useEffect, useState } from "react"
import { convert } from "./convert"

// thanks chatgpt

export default function AlphaMatteBGRemover() {

  if (process.env.NODE_ENV === "production") return null


  const [ blackImage, setBlackImage ] = useState<File>()
  const [ whiteImage, setWhiteImage ] = useState<File>()

  const [ blackURL, setBlackURL ] = useState<string>()
  const [ whiteURL, setWhiteURL ] = useState<string>()

  const [ result, setResult ] = useState<string>()

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (!item.type.startsWith("image/")) continue
        const file = item.getAsFile()
        if (!file) continue
        // Decide which slot to fill
        if (!blackImage) {
          setBlackImage(file)
        } else if (!whiteImage) {
          setWhiteImage(file)
        }
        break
      }
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [ blackImage, whiteImage ])

  useEffect(() => {
    const blackURL = blackImage ? URL.createObjectURL(blackImage) : undefined
    setBlackURL(blackURL)
    return () => {
      if (blackURL) URL.revokeObjectURL(blackURL)
    }
  }, [ blackImage ])

  useEffect(() => {
    const whiteURL = whiteImage ? URL.createObjectURL(whiteImage) : undefined
    setWhiteURL(whiteURL)
    return () => {
      if (whiteURL) URL.revokeObjectURL(whiteURL)
    }
  }, [ whiteImage ])

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result)
    }
  }, [ result ])

  return (
    <div className={cns.page("")}>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-full flex flex-col gap-1">
          {blackURL ? <>
            <img src={blackURL} onClick={() => setBlackImage(undefined)} />
            <button className={cns.button.base()} onClick={() => setBlackImage(undefined)}>
              Remove Black Image
            </button>
          </> : <>
            Paste Image
          </>}
        </div>
        <div className="w-full h-full flex flex-col gap-1">
          {whiteURL ? <>
            <img src={whiteURL} onClick={() => setWhiteImage(undefined)} />
            <button className={cns.button.base()} onClick={() => setWhiteImage(undefined)}>
              Remove White Image
            </button>
          </> : <>
            Paste Image after black URL
          </>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className={cns.button.base("")} onClick={async () => {
          if (blackImage && whiteImage) {
            const resultBuffer = await convert(
              blackImage,
              whiteImage,
            )

            const blob = new Blob([ resultBuffer ], { type: "image/png" })
            const url = URL.createObjectURL(blob)
            setResult(url)
          }
        }}>Convert</button>
      </div>

      <div className="bg-blue-800 hover:bg-blue-500 transition-all duration-200">
        <img src={result} />
      </div>
    </div>
  )
}