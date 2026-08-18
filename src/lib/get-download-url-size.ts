export async function getDownloadURLFileSize(url: string) {
  const res = await fetch(url, { method: "HEAD" })
  const bytes = Number(res.headers.get('Content-Length'))
  return bytes
}