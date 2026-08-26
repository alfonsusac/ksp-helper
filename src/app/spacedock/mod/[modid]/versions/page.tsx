import { SpacedockNext } from "@/app/spacedock/_data-cache/cached-functions"
import { marked } from "marked"
import { notFound } from "next/navigation"
import { VersionPageClientSection } from "./page.client"

export default async function ModPageVersionTab(props: PageProps<'/spacedock/mod/[modid]/versions'>) {
  const params = await props.params
  const modparam = params.modid
  const mod = await SpacedockNext.findMod(parseInt(modparam))
  if (!mod) return notFound()

  // TODO
  if (mod === "not published") return <div></div>

  const versions = mod.versions.map(v => ({
    ...v,
    html: v.changelog ? marked.parse(v.changelog) as string : null,
    sizePromise: SpacedockNext.getDownloadURLFileSize(v.download_path)
  }))


  return <>
    <VersionPageClientSection
      versions={versions}
      default_version_id={mod.default_version_id}
    />
  </>
}



