"use client"

import { cns } from "@/design-system"
import { useEffect, useState } from "react"
// import { convert } from "./convert"

// thanks chatgpt

export default function AlphaMatteBGRemover() {

  // if (process.env.NODE_ENV === "production") return null


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





  const convert = async () => {

    async function imageToImageData(file: File) {
      const bitmap = await createImageBitmap(file)

      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      const ctx = canvas.getContext("2d")!

      ctx.drawImage(bitmap, 0, 0)

      return ctx.getImageData(0, 0, bitmap.width, bitmap.height)
    }

    if (!blackImage || !whiteImage) return

    const black = await imageToImageData(blackImage)
    const white = await imageToImageData(whiteImage)

    const out = new ImageData(black.width, black.height)

    const blackData = black.data
    const whiteData = white.data
    const outData = out.data

    for (let i = 0; i < blackData.length; i += 4) {
      const br = blackData[ i ] / 255
      const bg = blackData[ i + 1 ] / 255
      const bb = blackData[ i + 2 ] / 255

      const wr = whiteData[ i ] / 255
      const wg = whiteData[ i + 1 ] / 255
      const wb = whiteData[ i + 2 ] / 255

      const ar = 1 - (wr - br)
      const ag = 1 - (wg - bg)
      const ab = 1 - (wb - bb)

      const alpha = Math.max(0, Math.min(1, (ar + ag + ab) / 3))

      let r = 0
      let g = 0
      let b = 0

      if (alpha > 0.0001) {
        r = br / alpha
        g = bg / alpha
        b = bb / alpha
      }

      outData[ i ] = Math.round(Math.min(1, r) * 255)
      outData[ i + 1 ] = Math.round(Math.min(1, g) * 255)
      outData[ i + 2 ] = Math.round(Math.min(1, b) * 255)
      outData[ i + 3 ] = Math.round(alpha * 255)
    }

    const canvas = document.createElement("canvas")
    canvas.width = out.width
    canvas.height = out.height

    canvas.getContext("2d")!.putImageData(out, 0, 0)

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob!), "image/png")
    )

    const url = URL.createObjectURL(blob)

    setResult(url)
  }


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
          await convert()

          // if (blackImage && whiteImage) {


            // const resultBuffer = await convert(
            //   blackImage,
            //   whiteImage,
            // )

            // const blob = new Blob([ resultBuffer ], { type: "image/png" })
            // const url = URL.createObjectURL(blob)
            // setResult(url)
          // }
        }}>Convert</button>
      </div>

      <div className="bg-blue-800 hover:bg-blue-500 transition-all duration-200">
        <img src={result} />
      </div>
    </div>
  )
}