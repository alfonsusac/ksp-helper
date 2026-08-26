"use client"

import { cns } from "@/design-system"
import { Slider } from "@/ui/input"
import { useState } from "react"
import { CopyImageButton, StatusText, useAction, useImageClipboard, useImageFileURL, type FileData } from "../common"

// thanks chatgpt
export default function PlanetCropper() {

  const [ image, setImage ] = useImageFileURL<FileData>()
  const [ result, setResult ] = useImageFileURL()
  const [ threshold, setThreshold ] = useState<number>(1)

  useImageClipboard((result) => {
    setImage(result)
    convert(threshold, result.file)
  })

  const [ loading, convert ] = useAction(async (threshold: number, file: File | undefined) => {
    if (!file) return
    async function imageToImageData(file: File) {
      const bitmap = await createImageBitmap(file)

      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      const ctx = canvas.getContext("2d")!

      ctx.drawImage(bitmap, 0, 0)

      return ctx.getImageData(0, 0, bitmap.width, bitmap.height)
    }

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
    const blob = await crop.convertToBlob({ type: "image/png", })
    const url = URL.createObjectURL(blob)
    setResult({ url })
  })


  return (
    <>
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
            <div>width: {image.dimension.w} | height: {image.dimension.h}</div>
            <button className={cns.buttonBase()} onClick={() => { setImage(undefined) }}>
              Remove Black Image
            </button>
          </> : <>
            Paste Image
          </>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className={cns.buttonBase("")} onClick={async () => {
          await convert(threshold, image?.file)
        }}>Convert</button>
        <CopyImageButton url={result?.url} />
      </div>

      <StatusText loading={loading} />
      <div className="hover:bg-blue-500 transition-all duration-200">
        <img src={result?.url} />
      </div>
    </>
  )
}