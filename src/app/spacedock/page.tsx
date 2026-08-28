import { cnr, cns } from "@/design-system"
import { IcBaselineDiscord, LucideArrowRight, MdiGithub } from "@/ui/icons"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { registerLink } from "./_components/navbar"
import { InvisibleText } from "./_components/commons"
import { Spacedock } from "@/lib/spacedock-core/package"
import { FeaturedModSection, TopModSection } from "./_components/mod-list-row-variants"
import { SearchBox } from "./_components/search-box"
import { SpacedockNext } from "./_data-cache/cached-functions"

export const metadata: Metadata = {
  title: "SpaceDock",
  description: "Browse Mods from Spacedocs.",
}

const maxWidth = cnr("max-w-280 mx-auto w-full")

export default function SpaceDockPage() {

  return (
    <div className="flex flex-col gap-16 pt-20">

      {/* Header */}
      {/* <SpacedockNavbar hideLogo /> */}

      <section className={("flex flex-col items-center")}>
        <header className="flex flex-col gap-0 items-center">
          <h1 className={cns.pageTitle("text-5xl font-bold")}>./spacedock</h1>
          <p className={cns.textMuted()}>Unofficial spacedock wrapper to browse mods</p>
        </header>

        <SearchBox className="w-full self-center mt-8" />
      </section>

      <section className={maxWidth("flex flex-col gap-4 pt-8 pb-6")}>
        <h2 className="text-xl">Games</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Suspense fallback={Array.from({ length: 6 }, (_, i) => <GameListItem key={i} />)}>
            <GameList />
          </Suspense>
        </div>
      </section>

      <FeaturedModSection
        maxWidth={maxWidth()}
        showGameLabel
      />

      <TopModSection
        maxWidth={maxWidth()}
        showGameLabel
      />

      <section className={maxWidth("max-w-195 flex flex-col gap-4")}>
        <header className="flex flex-col gap-1">
          <h2 className={"text-xl grow"}>Get involed</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              href: registerLink,
              icon: <img width={16} height={16} className="size-4 mb-0.5 shrink-0" src="https://spacedock.info/static/57x57.ico" alt="Spacedock Logo" />,
              title: "Register to Spacedock",
              desc: "Visit the spacedock.info website to register an account",
              cta: "Open in spacedock"
            },
            {
              href: "https://discord.gg/B9Ns6rCYm",
              icon: <IcBaselineDiscord className="size-5 mb-0.5 shrink-0" />,
              title: "Join the community",
              desc: "Chat, ask questions and share ideas.",
              cta: "Open in Discord"
            },
            {
              href: "https://github.com/alfonsusac/ksp-helper",
              icon: <MdiGithub className="size-5 mb-0.5 shrink-0" />,
              title: "Contribute",
              desc: "Help us improve this website and give feedbacks",
              cta: "Visit Github"
            },
          ].map((e, i) => {
            return (
              <Link key={i}
                href={e.href}
                target="_blank"
                className={cns.linkCard("p-4 flex flex-col gap-2 group")} >
                <div className="flex gap-2 items-center">
                  {e.icon}
                  {e.title}
                </div>
                <div className={cns.textMuted("text-sm grow")}>
                  {e.desc}
                </div>
                <div className={cns.textMuted("text-sm flex gap-1 items-center group-hover:contrast-200")}>
                  {e.cta} <LucideArrowRight />
                </div>
              </Link>
            )
          })}
        </div>


      </section>


    </div >
  )
}

async function GameList() {
  const payload = await SpacedockNext.getGames()
  return <>
    {payload.map(game => {
      return <GameListItem key={game.id} game={game} />
    })}
  </>
}

function GameListItem({ game }: {
  game?: {
    id: number,
    background: string,
    name: string,
  }
}) {
  return <>
    <Link
      href={`/spacedock/${ game?.id }`}
      className={cns.linkCard(
        "block overflow-hidden group",
        game === undefined && "pointer-events-none animate-pulse bg-black/10!"
      )}
    >
      <div className="-mt-2 -mx-3 aspect-video">
        {game &&
          <img
            width={500}
            height={500}
            alt={`The background image for the mod ${ game.name }`}
            className="w-full h-full object-cover group-hover:brightness-75 duration-75 transition-all"
            src={game?.background}
          />
        }
      </div>
      <div className="-mx-3 -mb-2 p-2 px-2.5 leading-4">
        {game?.name}<br />
        <span className={cns.textMuted("text-sm")}>
          {game ?
            <Suspense fallback={"Loading..."}>
              <GameItemCount game_id={game.id} />
            </Suspense>
            : <InvisibleText />}
        </span>
      </div>
    </Link>
  </>
}

async function GameItemCount(props: { game_id: number }) {
  const { status, payload } = await Spacedock.browse({
    count: 0,
    game_id: props.game_id
  })
  if (status !== 200) throw new Error("Error fetching game item count")
  return <>{payload.total} mods</>
}