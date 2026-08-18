import { cns } from "@/design-system"
import { LucideDownload } from "@/ui/icons"
import { SpacedockNext } from "../_data-cache/cached-functions"
import { humanFileSize } from "@/lib/pretty-num"

export function DownloadButton(props: {
  downloadPath: string
  className?: string
}) {
  return <>
    <a
      title="Download"
      href={'https://spacedock.info' + props.downloadPath}
      className={cns.button.base("text-base p-2 px-5", props.className)}
    >
      <LucideDownload />
      Download
    </a>
  </>
}


// export async function SpacedockDownloadURLFileSize(props: {
//   path: string
// }) {
//   const bytes = await SpacedockNext.getDownloadURLFileSize(props.path)
//   return <>
//     {humanFileSize(bytes)}
//   </>
// }