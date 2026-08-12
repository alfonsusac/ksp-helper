import { cns } from "@/design-system"
import { getMod, getModDownloadCounts, getModKspAvc } from "@/lib/spacedock/mods"
import { browse, searchMod } from "@/lib/spacedock/search"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SpaceDock",
  description: "Browse KSP Mods from Spacedocs.",
}


export default async function SpaceDockPage() {

  // const res = await searchMod({
  //   query: "kerbalism"
  // })
  // const res = await getMod(1774)
  // const res = await getModKspAvc(10)
  const res = await getModDownloadCounts([1774, 10])

  return (
    <main className={cns.page()}>
      <header className="flex flex-col gap-0 items-center pt-20">
        <h1 className={cns.pageTitle("text-5xl font-bold")}>spacedock</h1>
        <p className={cns.text.muted()}>Browse mods mods from spacedock catalog</p>
      </header>

      <div className={cns.input.box("mt-8 p-1 flex items-center max-w-120 w-full self-center rounded-lg")}>
        <input
          className={cns.input.box("w-full border-none")}
          placeholder="Search mods..."
        />
        <button className={cns.button.base("px-5")}>
          Search
        </button>
      </div>

      <div>
        <pre>
          {JSON.stringify(res, null, 2)}
        </pre>
      </div>
    </main>
  )
}