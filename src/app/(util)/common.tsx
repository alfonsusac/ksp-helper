import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import { useEffect, useState, useTransition, type ComponentProps } from "react"

export async function getImageDimensions(file: File) {
  const bitmap = await createImageBitmap(file)
  const dimensions = {
    w: bitmap.width,
    h: bitmap.height,
  }
  bitmap.close()
  return dimensions
}

export type FileData = { file: File, url: string, dimension: { w: number, h: number } }

export const alphaModes = [ "min", "max", "sum", "avg" ] as const
export type AlphaMode = typeof alphaModes[ number ]


// thanks chatgpt
export async function fileToImageData(file: File) {
  const bitmap = await createImageBitmap(file)

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
  const ctx = canvas.getContext("2d")!

  ctx.drawImage(bitmap, 0, 0)

  const data = ctx.getImageData(0, 0, bitmap.width, bitmap.height)
  return data
}

// thanks chatgpt
export async function canvasToBlob(canvas: HTMLCanvasElement) {
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png")
  )
  return blob
}


// Hooks

export function useImageClipboard(
  onPaste: (result: FileData) => void
) {
  useEffect(() => {
    const processEvent = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (!item.type.startsWith("image/")) continue
        const file = item.getAsFile()
        if (!file) continue
        const url = URL.createObjectURL(file)
        const dimension = await getImageDimensions(file)
        onPaste({ file, url, dimension })
        break
      }
    }
    window.addEventListener("paste", processEvent)
    return () => window.removeEventListener("paste", processEvent)
  }, [ onPaste ])
}

export function useImageFileURL<E extends { url: string } = { url: string }>() {
  const [ image, setImage ] = useState<E>()
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url)
    }
  }, [ image ])
  return [ image, setImage ] as const
}

export function useAction<T extends any[]>(action: (...args: T) => Promise<void>) {
  const [ loading, startTransition ] = useTransition()
  const invoke = async (...args: T) => {
    startTransition(async () => {
      await action(...args)
    })
  }
  return [ loading, invoke ] as const
}


// Components
export function ImagePlaceholder(props: ComponentProps<"div">) {
  return (
    <div className={cn("bg-zinc-800 p-8 text-center", props.className)}>
      Paste Image
    </div>
  )
}

export function DimensionData(props: { d: FileData[ 'dimension' ] }) {
  return (
    <div>width: {props.d.w} | height: {props.d.h}</div>
  )
}

export function CopyImageButton(props: { url?: string }) {
  if (!props.url) return null
  return (
    <button className={cns.button.base("")} onClick={async () => {
      // thanks gpt
      if (!props.url) return null
      const response = await fetch(props.url)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [ blob.type ]: blob,
        }),
      ])
    }}>
      Copy Image
    </button>
  )
}

export function StatusText(props: {
  loading: boolean
}) {
  return <>
    {props.loading ? <div>Loading</div> : <div>Ready</div>}
  </>
}