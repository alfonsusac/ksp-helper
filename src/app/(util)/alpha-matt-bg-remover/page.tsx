"use client"

import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import { TabSelectRow } from "@/ui/input"
import { converter } from "culori"
import { useEffect, useRef, useState, useTransition, type Dispatch, type SetStateAction } from "react"
import { getImageDimensions, type FileData } from "../common"



export const modes = [ "min", "max", "sum", "avg" ] as const
export type Mode = typeof modes[ number ]

export default function AlphaMatteBGRemover() {

  const [ blackImage, setBlackImage ] = useState<FileData>()
  const [ whiteImage, setWhiteImage ] = useState<FileData>()
  const [ selected, setSelected ] = useState<0 | 1>(0)

  const [ matteColors, setMatteColors ] = useState<[ string, string ]>([ '#000000', '#ffffff' ])

  const [ result, setResult ] = useState<string>()

  const [ mode, setMode ] = useState<Mode>("max")

  useEffect(() => {
    return () => {
      if (blackImage?.url) URL.revokeObjectURL(blackImage.url)
      if (whiteImage?.url) URL.revokeObjectURL(whiteImage.url)
      if (result) URL.revokeObjectURL(result)
    }
  }, [ blackImage, whiteImage, result, matteColors ])

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (!item.type.startsWith("image/")) continue
        const file = item.getAsFile()
        if (!file) continue
        // Decide which slot to fill
        const url = URL.createObjectURL(file)

        const dimension = await getImageDimensions(file)

        if (selected === 0) {
          setBlackImage({ file, url, dimension })
          setSelected(1)
          if (whiteImage) convert(matteColors, file, whiteImage.file, mode)
        } else {
          setWhiteImage({ file, url, dimension })
          if (blackImage) {
            convert(matteColors, blackImage.file, file, mode)
          }
        }
        break
      }
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [ blackImage, whiteImage, selected, matteColors ])


  const [ loading, startTransition ] = useTransition()

  // thanks chatgpt
  const convert = async (
    matteColors: [ string, string ],
    file1: File | undefined,
    file2: File | undefined,
    mode: Mode
  ) => {
    startTransition(async () => {

      if (file1 === undefined || file2 === undefined) return

      async function imageToImageData(file: File) {
        const bitmap = await createImageBitmap(file)

        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
        const ctx = canvas.getContext("2d")!

        ctx.drawImage(bitmap, 0, 0)

        return ctx.getImageData(0, 0, bitmap.width, bitmap.height)
      }

      const black = await imageToImageData(file1)
      const white = await imageToImageData(file2)

      const out = new ImageData(black.width, black.height)

      const blackData = black.data
      const whiteData = white.data
      const outData = out.data

      const rgb = converter("rgb")
      const matte1 = rgb(matteColors[ 0 ]) // first image background
      const matte2 = rgb(matteColors[ 1 ]) // second image background

      if (!matte1 || !matte2) throw new Error("Invalid color")

      for (let i = 0; i < blackData.length; i += 4) {
        const br = blackData[ i ] / 255
        const bg = blackData[ i + 1 ] / 255
        const bb = blackData[ i + 2 ] / 255

        const wr = whiteData[ i ] / 255
        const wg = whiteData[ i + 1 ] / 255
        const wb = whiteData[ i + 2 ] / 255

        const ar = 1 - (wr - br) / (matte2.r - matte1.r)
        const ag = 1 - (wg - bg) / (matte2.g - matte1.g)
        const ab = 1 - (wb - bb) / (matte2.b - matte1.b)

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

        // const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

        if (alpha > 0.0001) {
          r = (br - (1 - alpha) * matte1.r) / alpha
          g = (bg - (1 - alpha) * matte1.g) / alpha
          b = (bb - (1 - alpha) * matte1.b) / alpha

          // r = lerp(br, r, alpha)
          // g = lerp(br, g, alpha)
          // b = lerp(br, b, alpha)
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
    })
  }


  return (
    <div className={cns.page("")}>
      <TabSelectRow
        items={modes.map(m => {
          return { label: m, value: m }
        })}
        value={mode}
        onValueChange={(v) => {
          convert(matteColors, blackImage?.file, whiteImage?.file, v)
          setMode(v)
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        {
          [ [ blackImage, setBlackImage ] as const, [ whiteImage, setWhiteImage ] as const ].map(([ image, setImage ], i) => {
            const isSelected = selected === i
            return <div className={cn(
              "w-full h-full flex flex-col gap-1",
              isSelected && "outline outline-blue-500 outline-offset-4"
            )} key={i}
              onClick={() => setSelected((i) as 0 | 1)}
            >
              {image ? <>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={matteColors[ i ]}
                    disabled={loading}
                    onChange={(e) => {
                      const val = e.currentTarget.value
                      matteColors[ i ] = val
                      convert(matteColors, blackImage?.file, whiteImage?.file, mode)
                      setMatteColors([ ...matteColors ])
                    }}
                  />
                  {matteColors[ i ]}
                </div>
                <img src={image.url} />
                <div>width: {image.dimension.w} | height: {image.dimension.h}</div>
                <button className={cns.button.base()} onClick={() => setImage(undefined)}>
                  Remove Image
                </button>
              </> : <div className="bg-zinc-800 p-8 text-center">
                Paste Image
              </div>}
            </div>
          })
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className={cns.button.base("")} onClick={async () => {
          await convert(matteColors, blackImage?.file, whiteImage?.file, mode)
        }}>Convert</button>
      </div>

      {loading ? <div>Loading</div> : <div>Ready</div>}
      <div className="hover:bg-blue-500 transition-all duration-200">
        <img src={result} />
      </div>
    </div>
  )
}
