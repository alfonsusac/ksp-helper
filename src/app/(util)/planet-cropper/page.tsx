"use client"

import { cns } from "@/design-system"
import { Slider } from "@/ui/input"
import { useEffect, useState } from "react"
import type { FileData } from "../alpha-matt-bg-remover/page"

// thanks chatgpt
export default function PlanetCropper() {

  const [ image, setImage ] = useState<FileData>()
  const [ result, setResult ] = useState<string>()
  const [ threshold, setThreshold ] = useState<number>(1)


  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (!item.type.startsWith("image/")) continue
        const file = item.getAsFile()
        if (!file) continue
        const url = URL.createObjectURL(file)
        setImage({ file, url })
        convert(threshold, file)
        break
      }
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [ image ])

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url)
      if (result) URL.revokeObjectURL(result)
    }
  }, [ image, result ])


  const convert = async (threshold: number, file: File | undefined) => {
    if (!file) return
    async function imageToImageData(file: File) {
      const bitmap = await createImageBitmap(file)

      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      const ctx = canvas.getContext("2d")!

      ctx.drawImage(bitmap, 0, 0)

      return ctx.getImageData(0, 0, bitmap.width, bitmap.height)
    }

    if (!image) return

    const imgData = await imageToImageData(file)

    function getAlphaBounds(
      image: ImageData,
      alphaThreshold = 1,
    ) {
      const { width, height, data } = image
      let minX = width
      let minY = height
      let maxX = -1
      let maxY = -1
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const alpha = data[ (y * width + x) * 4 + 3 ]

          if (alpha >= alphaThreshold) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }

      if (maxX === -1) return null

      return {
        x: minX,
        y: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
      }
    }

    const bounds = getAlphaBounds(imgData, threshold)

    if (bounds === null) throw new Error("Bounds is null")

    const crop = new OffscreenCanvas(bounds.width, bounds.height)
    const cropCtx = crop.getContext("2d")!

    cropCtx.putImageData(
      imgData,
      -bounds.x,
      -bounds.y,
    )

    const blob = await crop.convertToBlob({
      type: "image/png",
    })

    const url = URL.createObjectURL(blob)

    setResult(url)
  }


  return (
    <div className={cns.page("")}>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-full flex flex-col gap-1">
          {image ? <>
            <div>
              <Slider
                min={1}
                max={50}
                value={threshold}
                onValueChange={(n) => {
                  convert(n, image.file)
                  setThreshold(n)
                }}
              />
              {threshold}
            </div>
            <img src={image.url} />
            <button className={cns.button.base()} onClick={() => { setImage(undefined) }}>
              Remove Black Image
            </button>
          </> : <>
            Paste Image
          </>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className={cns.button.base("")} onClick={async () => {
          await convert(threshold, image?.file)
        }}>Convert</button>
      </div>

      <div className="hover:bg-blue-500 transition-all duration-200">
        <img src={result} />
      </div>
    </div>
  )
}