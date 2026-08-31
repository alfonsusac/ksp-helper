import { notFound } from "next/navigation"
import { SpacedockNext } from "../../_data-cache/cached-functions"
import { cns } from "@/design-system"
import { cn } from "@/ui/cn"



export default async function ModPage(props: PageProps<'/spacedock/mod/[modid]'>) {
  const params = await props.params
  const modparam = params.modid
  const mod = await SpacedockNext.findMod(parseInt(modparam))
  if (!mod) return notFound()

  // TODO
  if (mod === "not published") return <div></div>

  return <>
    <section className={cns.infoCard("wrap-break-word min-w-0 pt-4 p-8")}>
      <div dangerouslySetInnerHTML={{ __html: mod.description_html }} className={cns.docunment()} />
    </section>
  </>
}

