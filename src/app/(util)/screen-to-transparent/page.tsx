"use client"

import { useState } from "react"
import { alphaModes, canvasToBlob, CopyImageButton, fileToImageData, StatusText, useAction, useImageClipboard, useImageFileURL, type AlphaMode, type FileData } from "../common"
import { cns } from "@/design-system"
import { TabSelectRow } from "@/ui/input"

export default function ScreenToTransparent() {

  const [ image, setImage ] = useImageFileURL<FileData>()
  const [ result, setResult ] = useImageFileURL()
  const [ mode, setMode ] = useState<AlphaMode>("max")

  useImageClipboard((result) => {
    setImage(result)
    convert(result.file, mode)
  })

  const [ loading, convert ] = useAction(async (
    file: File | undefined,
    mode: AlphaMode
  ) => {
    if (file === undefined) return
    const image = await fileToImageData(file)
    const imageData = image.data
    const out = new ImageData(image.width, image.height)
    const outData = out.data
    for (let i = 0; i < imageData.length; i += 4) {
      const r1 = imageData[ i ] / 255
      const g1 = imageData[ i + 1 ] / 255
      const b1 = imageData[ i + 2 ] / 255

      const ar = r1
      const ag = g1
      const ab = b1

      const desaturatedAlpha = (() => {
        switch (mode) {
          case "avg": return (ar + ag + ab) / 3
          case "max": return Math.max(ar, ag, ab)
          case "min": return Math.min(ar, ag, ab)
          case "sum": return ar + ag + ab
        }
      })()

      const alpha = Math.max(0, Math.min(1, desaturatedAlpha))

      let r = 0
      let g = 0
      let b = 0

      if (alpha > 0.0001) {
        r = r1 / alpha
        g = g1 / alpha
        b = b1 / alpha
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
    const blob = await canvasToBlob(canvas)
    const url = URL.createObjectURL(blob)
    setResult({ url })
  })

  return (
    <>
      <TabSelectRow
        items={alphaModes.map(m => { return { label: m, value: m } })}
        itemClassName="w-22"
        value={mode}
        onValueChange={(v) => {
          convert(image?.file, v)
          setMode(v)
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-full flex flex-col gap-1">
          {image ? <>
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
        <button className={cns.buttonBase("")} onClick={async () => convert(image?.file, mode)}>
          Convert
        </button>
        <CopyImageButton url={result?.url} />
      </div>

      <StatusText loading={loading} />
      <div className="hover:bg-blue-500 transition-all duration-200">
        <img src={result?.url} />
      </div>
    </>
  )

}