import { notFound } from "next/navigation"
import { SpacedockNext } from "../../_data-cache/cached-functions"
import { cnr, cns } from "@/design-system"
import { LucideArrowUpRight, LucideCalendar, LucideCalendarArrowUp, LucideCircleUser, LucideDownload, LucideGlobe, LucideHandHeart, LucideHeart, LucideScale, LucideTerminal } from "@/ui/icons"
import Link from "next/link"
import { Suspense, type ReactNode } from "react"
import { cn } from "@/ui/cn"
import type { Metadata } from "next"
import { TabLink } from "@/ui/next-tab-link"
import { DownloadButton } from "../../_components/download-button"
import { DateTooltip } from "@/ui/tooltip-date"
import { TooltipSimple } from "@/ui/tooltip"
import { Breadcrumb, styles } from "../../_components/shared"
import { ExtraInfo, ExtraInfoCard, MainContent, PageDetail } from "../../_components/page-detail-components"

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

    <PageDetail>

      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: mod.game, href: `/spacedock/${ mod.game_id }` },
          { label: `${ mod.id } - ${ mod.name }` }
        ]}
      />

      {/* Image Header */}
      <div className="col-start-1 col-span-full aspect-[3.5/1] overflow-hidden rounded-xl relative ">
        {mod.background ?
          <>
            <img className="absolute size-full object-contain z-10 object-center" src={mod.background} />
            <div className="absolute size-full overflow-hidden">
              <img className="object-cover object-center size-full scale-125 min-h-0 min-w-0 dark:brightness-25 brightness-90 blur-xl" src={mod.background} />
            </div>
          </>
          : <></>
        }
      </div>

      {/* Main Content  */}
      <MainContent>
        <header className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col grow">
            <h1 className="justify-end text-xl tracking-tight font-semibold">
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
              downloadPath={mod.versions[ 0 ].download_path}
            />
            <button className={cns.buttonBase("text-base p-2 px-5")}>
              Follow
            </button>
          </div>
        </header>

        <section className="flex flex-col mt-4 shadow-[0rem_1rem_1rem_-1rem_var(--color-dark-shadow)]">
          <div className={cns.tabBase("rounded-2xl bg-transparent p-0 border-0")}>
            <TabLink href={`/spacedock/mod/${ mod.id }`}>
              Description
            </TabLink>
            <TabLink href={`/spacedock/mod/${ mod.id }/versions`}>
              Versions
            </TabLink>
            <TooltipSimple
              content={
                "To spacedock.info"
              }
              trigger={
                <TabLink
                  target={"_blank"}
                  href={`https://spacedock.info/mod/${ mod.id }#stats`}>
                  Stats <LucideArrowUpRight />
                </TabLink>
              }
            />


          </div>
        </section>

        <section className="relative grid items-start gap-2">
          <div className="min-w-0 z-10">
            {props.children}
          </div>
        </section>
      </MainContent>

      {/* Extra Info */}
      <ExtraInfo>
        {/* Mod Details Sidebar */}

        <ExtraInfoCard title="Authors">
          <AuthorRowFetched username={mod.author} />
          {mod.shared_authors.map((e, i) =>
            <Suspense key={i} fallback={<AuthorRow displayname={"Loading..."} />}>
              <AuthorRowFetched username={e.username} />
            </Suspense>
          )}
        </ExtraInfoCard>

        <ExtraInfoCard title="Links">
          {mod.source_code && <Link href={mod.source_code} className={cns.cardButton()} target="_blank">
            <LucideTerminal className={cns.cardButtonIcon()} />
            <div>View Source</div>
            <LucideArrowUpRight />
          </Link>}
          {mod.website && <Link href={mod.website} className={cns.cardButton()} target="_blank">
            <LucideGlobe className={cns.cardButtonIcon()} />
            <div>View Website</div>
            <LucideArrowUpRight />
          </Link>}
          {mod.donations && <Link href={mod.donations} className={cns.cardButton()} target="_blank">
            <LucideHandHeart className={cns.cardButtonIcon()} />
            <div>Donate</div>
            <LucideArrowUpRight />
          </Link>}
        </ExtraInfoCard>

        <ExtraInfoCard
          infos={[
            {
              icon: LucideScale,
              title: "Licence",
              value: mod.license
            },
            {
              icon: LucideCalendar,
              title: "Published",
              value: <DateTooltip value={mod.versions.at(-1)?.created} />
            },
            {
              icon: LucideCalendarArrowUp,
              title: "Updated",
              value: <DateTooltip value={mod.versions.at(0)?.created} />
            },
            ]}
        >
        </ExtraInfoCard>

        <Link href={`https://spacedock.info/mod/${ mod.id }`} className={cns.cardButton("justify-center")} target="_blank">
          <div>Open in Spacedocks</div>
          <LucideArrowUpRight />
        </Link>

      </ExtraInfo>
    </PageDetail>
  </>
}


// const cardButton = cnr(cns.buttonGhost("flex gap-2 items-center justify-start p-2 text-fg2"))
// const cardButtonIcon = cnr("size-4", cns.cardHeaderIcon())

async function AuthorRow(props: {
  displayname?: ReactNode,
  avatarSrc?: string,
  href?: string,
}) {
  const content = <>
    <div className={cns.cardButtonIcon("size-4 rounded-full")}>
      {props.avatarSrc
        ? <img className="" src={props.avatarSrc} />
        : <LucideCircleUser className="size-full text-fgBlue" />
      }
    </div>
    <div>
      {props.displayname}
    </div>
  </>

  if (props.href) {
    return <Link href={props.href} className={cns.cardButton()}>
      {content}
    </Link>
  }

  return <div className={cn(cns.cardButton(), "pointer-events-none")}>
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
    href={`/spacedock/profile/${ user.username }`}
  />
}