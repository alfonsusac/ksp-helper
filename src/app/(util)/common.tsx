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