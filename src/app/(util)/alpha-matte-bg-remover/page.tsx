"use client"

import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import { TabSelectRow } from "@/ui/input"
import { converter } from "culori"
import { useEffect, useState, useTransition } from "react"
import { CopyImageButton, DimensionData, getImageDimensions, ImagePlaceholder, alphaModes, useImageClipboard, useImageFileURL, type FileData, type AlphaMode, useAction, StatusText, fileToImageData, canvasToBlob } from "../common"





export default function AlphaMatteBGRemover() {

  const [ blackImage, setBlackImage ] = useImageFileURL<FileData>()
  const [ whiteImage, setWhiteImage ] = useImageFileURL<FileData>()
  const [ result, setResult ] = useImageFileURL()

  const [ matteColors, setMatteColors ] = useState<[ string, string ]>([ '#000000', '#ffffff' ])
  const [ selected, setSelected ] = useState<0 | 1>(0)
  const [ mode, setMode ] = useState<AlphaMode>("max")

  useImageClipboard((result) => {
    const { file, url, dimension } = result
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
  })


  const [ loading, convert ] = useAction(
    async (
      matteColors: [ string, string ],
      file1: File | undefined,
      file2: File | undefined,
      mode: AlphaMode
    ) => {
      if (file1 === undefined || file2 === undefined) return

      const black = await fileToImageData(file1)
      const white = await fileToImageData(file2)

      const out = new ImageData(black.width, black.height)

      const rgb = converter("rgb")
      const matte1 = rgb(matteColors[ 0 ]) // first image background
      const matte2 = rgb(matteColors[ 1 ]) // second image background

      if (!matte1 || !matte2) throw new Error("Invalid color")
      
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

        if (alpha > 0.0001) {
          r = (br - (1 - alpha) * matte1.r) / alpha
          g = (bg - (1 - alpha) * matte1.g) / alpha
          b = (bb - (1 - alpha) * matte1.b) / alpha
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
    }
  )



  return (
    <>
      <TabSelectRow
        items={alphaModes.map(m => {
          return { label: m, value: m }
        })}
        itemClassName="w-22"
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
                <DimensionData d={image.dimension} />
                <button className={cns.buttonBase()} onClick={() => setImage(undefined)}>
                  Remove Image
                </button>
              </> :
                <ImagePlaceholder />
              }
            </div>
          })
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button className={cns.buttonBase("")} onClick={async () => {
          await convert(matteColors, blackImage?.file, whiteImage?.file, mode)
        }}>
          Convert
        </button>
        <CopyImageButton url={result?.url} />
      </div>

      <StatusText loading={loading} />
      <div className="hover:bg-blue-500 transition-all duration-200">
        <img src={result?.url} id="result" />
      </div>
    </>
  )
}


