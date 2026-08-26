import { notFound } from "next/navigation"
import { SpacedockNext } from "../../_data-cache/cached-functions"
import { cnr, cns } from "@/design-system"
import { LucideArrowUpRight, LucideCalendar, LucideCalendarArrowUp, LucideDownload, LucideGlobe, LucideHandHeart, LucideHeart, LucideScale, LucideTerminal } from "@/ui/icons"
import Link from "next/link"
import { Suspense, type ReactNode } from "react"
import { cn } from "@/ui/cn"
import { relativeDate } from "@/lib/format-relative-date"
import type { Metadata } from "next"
import { TabLink } from "@/ui/next-tab-link"
import { DownloadButton } from "../../_components/download-button"

export async function generateMetadata(props: LayoutProps<'/spacedock/mod/[modid]'>) {
  const params = await props.params
  const modparam = params.modid
  const mod = await SpacedockNext.findMod(parseInt(modparam))
  if (!mod) return notFound()
  if (mod === "not published") return undefined

  return {
    title: mod.name
  } satisfies Metadata
}

export function generateStaticParams() {
  return []
}

export default async function ModPageLayout(props: LayoutProps<'/spacedock/mod/[modid]'>) {
  const params = await props.params
  const modparam = params.modid
  const mod = await SpacedockNext.findMod(parseInt(modparam))
  if (!mod) return notFound()

  // TODO
  if (mod === "not published") return <div></div>

  return <>

    <div>

      <div className="flex mb-3 gap-3 text-sm">
        <Link href={`/spacedock/${ mod.game_id }`} className={cns.navigationLink()}>
          {mod.game}
        </Link>
        <div className={cns.textFaint()}>
          {'>'}
        </div>
        <div className={cns.textMuted()}>
          {mod.id} - {mod.name}
        </div>
      </div>

      <div className="aspect-[3.5/1] overflow-hidden rounded-xl -z-10 relative">
        {mod.background ?
          <>
            <img className="absolute size-full object-contain z-10 object-center" src={mod.background} />
            <img className="absolute size-full object-cover object-center blur-lg brightness-50" src={mod.background} />
          </>
          : <></>
        }
      </div>

      <header className="flex flex-col md:flex-row pt-6 gap-4">
        <div className="flex flex-col grow">
          <h1 className="justify-end text-xl tracking-tight font-bold">
            {mod.name}
          </h1>
          <p className={cns.textMuted("text-base pt-2")}>
            {mod.short_description}
          </p>
          <div className={cns.textMuted("flex items-baseline gap-4 pt-0.5 pt-3")}>
            <span>
              <LucideDownload className="inline mr-1.5 align-[-0.1rem]" />
              {mod.downloads.toLocaleString()} <span className="">Downloads</span></span>
            <div className={cns.bgMuted("size-1.5 rounded-full")} />
            <span>
              <LucideHeart className="inline mr-1.5 align-[-0.1rem]" />
              {mod.followers.toLocaleString()} <span className="">Followers</span></span>
          </div>
        </div>
        <div className="shrink-0 flex gap-2 items-start">
          <DownloadButton
            downloadPath={mod.versions[0].download_path}
          />
          <button className={cns.buttonBase("text-base p-2 px-5")}>
            Follow
          </button>
        </div>
      </header>

      <section className="flex mt-4 -mb-2">
        <div className={("flex gap-1 border-b-0 rounded-b-none")}>
          <TabLink href={`/spacedock/mod/${ mod.id }`} className={cns.buttonGhost("text-base")}>
            Description
          </TabLink>
          <TabLink href={`/spacedock/mod/${ mod.id }/versions`} className={cns.buttonGhost("text-base")}>
            Versions
          </TabLink>
        </div>
      </section>


      <section className="grid grid-cols-[auto_18rem] items-start gap-2 my-4">

        <div className="min-w-0">
          {props.children}
        </div>

        <div className="flex flex-col gap-2">

          <div className={cns.surface2card("w-full flex flex-col gap-1")}>
            <div className={cns.textMuted()}>
              Authors
            </div>
            <div className="-mx-2 -mb-2">
              <AuthorRowFetched username={mod.author} />
              {mod.shared_authors.map((e, i) =>
                <Suspense key={i} fallback={<AuthorRow displayname={"Loading..."} />}>
                  <AuthorRowFetched username={e.username} />
                </Suspense>
              )}
            </div>
          </div>

          <div className={cns.surface2card("w-full flex flex-col gap-1")}>
            <div className={cns.textMuted()}>
              Links
            </div>
            <div className="-mx-2 -mb-2">
              {mod.source_code && <Link href={mod.source_code} className={cardButton()} target="_blank">
                <LucideTerminal className={cardButtonIcon()} />
                <div>View Source</div>
                <LucideArrowUpRight />
              </Link>}
              {mod.website && <Link href={mod.website} className={cardButton()} target="_blank">
                <LucideGlobe className={cardButtonIcon()} />
                <div>View Website</div>
                <LucideArrowUpRight />
              </Link>}
              {mod.donations && <Link href={mod.donations} className={cardButton()} target="_blank">
                <LucideHandHeart className={cardButtonIcon()} />
                <div>Donate</div>
                <LucideArrowUpRight />
              </Link>}

            </div>
          </div>

          <div className={cns.surface2card("w-full flex flex-col gap-3 text-sm")}>
            <div className="flex items-baseline gap-2">
              <LucideScale className={cardButtonIcon(cns.textMuted("self-start shrink-0"))} />
              <div className={cns.textMuted("shrink-0")}>
                License:
              </div>
              <div className="wrap-break-word">
                {mod.license}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LucideCalendar className={cardButtonIcon(cns.textMuted())} />
              <div className={cns.textMuted()}>
                Published:
              </div>
              <div className="break-all">
                {relativeDate(mod.versions.at(-1)?.created ?? "")}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LucideCalendarArrowUp className={cardButtonIcon(cns.textMuted())} />
              <div className={cns.textMuted()}>
                Updated:
              </div>
              <div className="break-all">
                {relativeDate(mod.versions.at(0)?.created ?? "")}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </>

}


const cardButton = cnr(cns.buttonGhost("flex gap-2 items-center justify-start p-2"))
const cardButtonIcon = cnr("size-4")

async function AuthorRow(props: {
  displayname?: ReactNode,
  avatarSrc?: string,
  href?: string,
}) {
  const content = <>
    <div className={cardButtonIcon("size-4 bg-current/50 rounded-full")}>
      {props.avatarSrc && <img className="" />}
    </div>
    <div>
      {props.displayname}
    </div>
  </>

  if (props.href) {
    return <Link href={props.href} className={cardButton()}>
      {content}
    </Link>
  }

  return <div className={cn(cardButton(), "pointer-events-none")}>
    {content}
  </div>
}


async function AuthorRowFetched(props: {
  username: string
}) {
  const user = await SpacedockNext.getUser(props.username)
  if (!user) return <AuthorRow displayname={props.username} />
  if (user === "private user") return <AuthorRow displayname={props.username} />
  return <AuthorRow
    displayname={user.username}
    href={`/spacedock/user/${ user.username }`}
  />
}