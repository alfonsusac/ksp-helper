import { cnr, cns } from "@/design-system"
import { notFound } from "next/navigation"
import { SpacedockNavbar } from "../_components/navbar"
import { FeaturedModSection, NewestModSection } from "../_components/mod-list-row-variants"
import { Footer } from "../_components/footer"
import { SearchBox } from "../_components/search-box"
import { SpacedockNext } from "../_data-cache/cached-functions"
import { cn } from "@/ui/cn"

export async function generateStaticParams() {
  const games = await SpacedockNext.getGames()
  const res = games.map(game => {
    return [ game.id, game.name, game.short ]
  }).flat().map(i => ({ game: String(i) }))
  return res
}


// mx-auto w-full
const maxWidth = "max-w-280"

export default async function GamePage(props: PageProps<'/spacedock/[game]'>) {
  const params = await props.params
  const gameparam = params.game
  const games = await SpacedockNext.getGames()
  const game = games.find(g => {
    return g.id === Number(gameparam)
      || g.short === gameparam
      || g.name === gameparam
  })
  if (!game) return notFound()

  return <div className="flex flex-col gap-16">

    <section className={cn(maxWidth, "aspect-4/1 rounded-2xl")}>
      <img src={game.background} className="aspect-4/1 overflow-hidden object-center object-cover rounded-2xl" style={{
        objectPosition: `50% ${ game.bg_offset_y / 10 * -1 }%`
      }} />
    </section>

    <section className={("flex flex-col")}>
      <header className={cn(maxWidth, "flex flex-col gap-0")}>
        <h1 className={cns.pageTitle("text-2xl font-bold")}>{game.name}</h1>
        <p className={cns.textMuted()}>Browse mods from {game.name}</p>
        <SearchBox className="mt-4" />
      </header>
    </section>

    <FeaturedModSection
      maxWidth={maxWidth}
      gameid={game.id}
      showUpdatedAt
    />

    <NewestModSection
      maxWidth={maxWidth}
      gameid={game.id}
      showUpdatedAt
    />

  </div>

}



