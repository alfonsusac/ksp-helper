import { cnr, cns } from "@/design-system"
import { getGames } from "@/lib/spacedock/games"
import { browse, browseFeatured } from "@/lib/spacedock/search"
import { cn } from "@/ui/cn"
import { IcBaselineDiscord, LucideArrowRight, LucideArrowUpRight, LucideDownload, MaterialSymbolsPackage2Sharp, MdiGithub } from "@/ui/icons"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "SpaceDock",
  description: "Browse Mods from Spacedocs.",
}

const maxWidth = cnr("max-w-280 mx-auto w-full")

export default function SpaceDockPage() {

  return (
    <main className={cns.page("gap-20 max-w-none")}>

      {/* Header */}
      <nav className={maxWidth("flex justify-end w-full gap-1 -mt-4")}>
        <Link className={cns.button.ghost("px-5")} href="/spacedock/login">
          Register
        </Link>
        <Link className={cns.button.base("px-5")} href="/spacedock/login">
          Login
        </Link>
      </nav>

      <section className={("flex flex-col items-center")}>
        <header className="flex flex-col gap-0 items-center">
          <h1 className={cns.pageTitle("text-5xl font-bold")}>./spacedock</h1>
          <p className={cns.text.muted()}>Unofficial spacedock wrapper to browse mods</p>
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
      </section>

      <section className={maxWidth("flex flex-col gap-4")}>
        <h2 className="text-xl">Games</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Suspense fallback={Array.from({ length: 6 }, (_, i) => <GameListItem key={i} />)}>
            <GameList />
          </Suspense>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className={maxWidth("flex")}>
          <h2 className={"text-xl grow"}>Featured</h2>
          <Link href="/featured" className={cns.button.base(maxWidth("self-end w-fit px-4"))}>
            See all featured mods <LucideArrowRight />
          </Link>
        </div>
        <div className={cn(
          "flex gap-2 shrink-0 overflow-scroll pb-8 -mx-8",
          "px-14",
        )}>
          <Suspense fallback={Array.from({ length: 8 }, (_, i) => <FeaturedModItem key={i} />)}>
            <FeaturedModList />
          </Suspense>
        </div>

      </section>

      <section className={maxWidth("max-w-195 flex flex-col gap-8")}>
        <header className="flex flex-col gap-1">
          <h2 className={"text-xl grow"}>Get involed</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              href: "https://spacedock.info/#:~:text=Register",
              icon: <img className="size-4 mb-0.5 shrink-0" src="https://spacedock.info/static/57x57.ico" />,
              title: "Register to Spacedock",
              desc: "Visit the spacedock.info website to register an account",
              cta: "Open in spacedock"
            },
            {
              href: "https://spacedock.info/#:~:text=Register",
              icon: <IcBaselineDiscord className="size-5 mb-0.5 shrink-0" />,
              title: "Join the community",
              desc: "Chat, ask questions and share ideas.",
              cta: "Open in Discord"
            },
            {
              href: "https://spacedock.info/#:~:text=Register",
              icon: <MdiGithub className="size-5 mb-0.5 shrink-0" />,
              title: "Contribute",
              desc: "Help us improve this website and give feedbacks",
              cta: "Visit Github"
            },
          ].map((e, i) => {
            return (
              <Link key={i}
                href="https://spacedock.info/#:~:text=Register"
                className={cns.linkCard("p-4 flex flex-col gap-2 group")} >
                <div className="flex gap-2 items-center">
                  {e.icon}
                  {e.title}
                </div>
                <div className={cns.text.muted("text-sm grow")}>
                  {e.desc}
                </div>
                <div className={cns.text.muted("text-sm flex gap-1 items-center group-hover:contrast-200")}>
                  {e.cta} <LucideArrowRight />
                </div>
              </Link>
            )
          })}
        </div>


      </section>

      <footer className={maxWidth("py-8 flex gap-4 gap-y-12 flex-wrap")}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-xl">
              ./spacedock
            </div>
            <div className={cns.text.muted("text-sm text-pretty max-w-50")}>
              Unofficial spacedock wrapper to browse mods
            </div>
          </div>
          <div>
            <Link href="" target="_black" className={cns.text.link2("flex items-center text-sm")}>
              Source Code <LucideArrowUpRight />
            </Link>
            <Link href="" target="_black" className={cns.text.link2("flex items-center text-sm")}>
              Discord <LucideArrowUpRight />
            </Link>
          </div>
          <div className={cns.text.muted('text-sm max-w-60')}>
            This website is not affiliated with spacedock.info
          </div>
        </div>
        <div className="flex gap-1 justify-end grow pr-12">
          <div className="flex gap-x-8 items-baseline">
            <div className="">Spacedock's</div>
            <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
              {[
                { label: "Website", href: "https://spacedock.info/" },
                { label: "Blog", href: "https://spacedock.info/blog" },
                { label: "API", href: "https://github.com/KSP-SpaceDock/SpaceDock/blob/master/api.md" },
                { label: "Support", href: "mailto:support@spacedock.info" },
                { label: "Matrix", href: "https://im.52k.de/#/room/#spacedock:52k.de" },
                { label: "Discord", href: "https://discord.gg/htPQYqC" },
                { label: "IRC", href: "http://webchat.esper.net/?channels=spacedock" },
                { label: "Donate", href: "https://www.patreon.com/user?u=2903335&ty=p" },
                { label: "Terms & Privacy", href: "https://spacedock.info/privacy" },
              ].map((e, i) => {
                return (<Link key={i} href={e.href} target="_black"
                  className={cns.text.link2("text-sm flex items-center")}
                >
                  {e.label} <LucideArrowUpRight />
                </Link>)
              })}
            </div>
          </div>
        </div>
      </footer>

    </main >
  )
}

async function GameList() {
  const { status, payload } = await getGames()
  if (status !== 200) return <>
    <div>
      Error loading games
    </div>
  </>

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
            className="w-full h-full object-cover group-hover:brightness-75 duration-75 transition-all"
            src={`https://spacedock.info/content/${ game?.background }`}
          />
        }
      </div>
      <div className="-mx-3 -mb-2 p-2 px-2.5 leading-4">
        {game?.name}<br />
        <span className={cns.text.muted("text-sm")}>
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
  const { status, payload } = await browse({
    count: 0,
    game_id: props.game_id
  })
  if (status !== 200) return null
  return <>{payload.total} mods</>
}

async function FeaturedModList() {
  const res = await browseFeatured({})
  if (res.status !== 200) return <>
    <div>
      Error loading games
    </div>
  </>
  return <>

    {res.payload.slice(0, 8).map(mod => {
      return (
        <FeaturedModItem key={mod.id} mod={mod} />
      )
    })}
  </>
}

function FeaturedModItem(props: {
  mod?: {
    id: number,
    versions: {
      download_path: string,
      friendly_version: string,
    }[],
    short_description: string,
    background: string | null,
    name: string,
    author: string,
    game: string,
  }
  className?: string,
}) {
  const isSkeleton = props.mod === undefined
  return (
    <div
      className={cn(
        "relative group",
        isSkeleton && "pointer-events-none animate-pulse bg-black/10!",
        props.className
      )}
    >
      <Link
        href={`#`}
        className={cns.linkCard(
          "block overflow-hidden relative w-60 shrink-0 p-0",
        )}>
        <div className="aspect-video grid place-items-center relative">
          <div className={cn(
            "absolute bg-black/75 rounded-tl-lg p-0.5 px-1.5 text-xs",
            "right-0 bottom-0",
            "z-10",
            isSkeleton && "opacity-0",
          )}>
            {props.mod?.versions[ 0 ].friendly_version ?? <InvisibleText />}
          </div>
          <div className={cn(
            "absolute inset-0 bg-black/75 backdrop-blur-md p-3",
            "text-sm group-hover:opacity-100 opacity-0",
            "transition-opacity duration-75",
          )}>
            <div className="line-clamp-5">
              {props.mod?.short_description ?? <InvisibleText />}
            </div>
          </div>
          {props.mod?.background ?
            <img
              className={cn(
                "object-cover w-full h-full aspect-video",
              )}
              src={`${ props.mod.background }`}
            /> : <MaterialSymbolsPackage2Sharp className={cns.text.muted("opacity-25 size-1/2")} />
          }
        </div>
        <div className="flex gap-0">
          <div className="p-2 px-2.5 leading-4 flex flex-col grow">
            <div className="line-clamp-1">
              {props.mod?.name ?? <InvisibleText />}
            </div>
            <div className={cns.text.muted("text-sm leading-5")}>
              {props.mod?.author ?? <InvisibleText />}
            </div>
            <div className={cns.text.muted("text-sm leading-3")}>
              {props.mod?.game ?? <InvisibleText />}
            </div>
          </div>
          <div className="size-10 shrink-0 self-end">
          </div>
        </div>
      </Link>
      <Link
        title="Download"
        href={'https://spacedock.info' + props.mod?.versions[ 0 ].download_path}
        className={cns.button.iconGhost(
          "absolute bottom-2 right-2 size-8 bg-green-500/50",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-100",
          cns.text.muted()
        )}>
        <LucideDownload className="size-full" />
      </Link>
    </div>
  )
}


function InvisibleText() {
  return <span className={"opacity-0 pointer-events-none"}>a</span>
}