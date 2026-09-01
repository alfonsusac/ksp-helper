import { notFound } from "next/navigation"
import { SpacedockNext } from "../../_data-cache/cached-functions"
import type { Metadata } from "next"
import { Breadcrumb, Lorem } from "../../_components/shared"
import { cn } from "@/ui/cn"
import { cns } from "@/design-system"
import { prettyNum } from "@/lib/pretty-num"
import { LucideArrowUpRight, LucideDownload, LucideHeart, LucideLink, LucidePackage, LucideTerminal } from "@/ui/icons"
import Link from "next/link"
import { SearchBox } from "../../_components/search-box"
import { DateTooltip } from "@/ui/tooltip-date"

export async function generateMetadata(props: PageProps<'/spacedock/profile/[userid]'>) {
  const params = await props.params
  const modparam = params.userid
  const user = await SpacedockNext.getUser(modparam)
  if (!user) return notFound()
  if (user === "private user") return notFound()
  return {
    title: user.username
  } satisfies Metadata
}


export default async function ModPageLayout(props: PageProps<'/spacedock/profile/[userid]'>) {
  const params = await props.params
  const modparam = params.userid
  const user = await SpacedockNext.getUser(modparam)
  console.log(user)
  if (!user) return notFound()
  if (user === "private user") return notFound() // TODO

  // - User
  // totalDownloads
  // username
  // description
  // forumUsername
  // ircNick
  // twitterUsername
  // redditUsername
  // mods []

  return <>
    <div className="grid lg:grid-cols-[20rem_auto] grid-cols-1 grid-flow-row gap-4">

      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "User" },
          { label: `${ user.username }` }
        ]}
      />

      {/* User Profile Card */}
      <div className={cn("col-start-1 flex flex-col gap-2 self-start", cns.infoCard())}>
        <div className="-mx-5 -mt-5 rounded-t-xl aspect-[3.5/1] bg-dark/50 relative">
          {/* Umm..... No API for user background? */}
        </div>
        <div className={cn("text-lg mt-3 leading-4")}>
          {user.username}
          <div className={cns.textFaint("text-sm")}>
            on spacedock
          </div>
        </div>
        <div className="text-sm">
          {user.description}
        </div>

        <hr className={cns.divider("my-2")} />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <LucideDownload className={cns.textFaint("mr-1")} />
            <div>{prettyNum(user.totalDownloads)} downloads</div>
          </div>
          <div className="flex items-center gap-1">
            <LucidePackage className={cns.textFaint("mr-1")} />
            <div>{user.mods.length} mods</div>
          </div>
        </div>

        {user.hasSocials && <>
          <hr className={cns.divider("my-2")} />

          <div className="flex flex-col">
            {user.forumUsername &&
              <Link href={user.forumUsername} className={cns.cardButton("-mx-2")} target="_blank">
                <LucideLink className={cns.cardButtonIcon()} />
                <div>KSP Forum Profile</div>
                <LucideArrowUpRight />
              </Link>
            }
            {user.ircNick &&
              <Link href={user.ircNick} className={cns.cardButton("-mx-2")} target="_blank">
                <LucideLink className={cns.cardButtonIcon()} />
                <div>IRC</div>
                <LucideArrowUpRight />
              </Link>
            }
            {user.redditUsername &&
              <Link href={`https://www.reddit.com/user/${ user.redditUsername }`} className={cns.cardButton("-mx-2")} target="_blank">
                <LucideLink className={cns.cardButtonIcon()} />
                <div>Reddit Profile</div>
                <LucideArrowUpRight />
              </Link>
            }
            {user.twitterUsername &&
              <Link href={`https://twitter.com/${ user.twitterUsername }`} className={cns.cardButton("-mx-2")} target="_blank">
                <LucideLink className={cns.cardButtonIcon()} />
                <div>Twitter Profile</div>
                <LucideArrowUpRight />
              </Link>
            }
          </div>
        </>
        }

      </div>

      {/* Mod List */}
      <div className="col-start-2 flex flex-col gap-2 max-w-180 mx-auto w-full">
        {/* <input
          className={cns.inputBox("grow-0")}
          placeholder={`Search ${ user.username }'s mods`}
        /> */}

        {user.mods.map((m, i) => {
          m.downloads
          m.followers
          return (
            <Link key={m.id}
              href={`/spacedock/mod/${ m.id }`}
              className={cns.linkCard("h-26 overflow-hidden flex gap-3")}>
              <div className="h-26 aspect-video bg-dark/50 -ml-3 -my-2">
                {m.background && <img src={m.background} className={"size-full object-cover"} />}
              </div>
              <div className="flex gap-2 w-full">
                <div className="flex flex-col items-start grow">
                  <div className="col-start-1 row-start-1">
                    <div className="line-clamp-1">
                      {/* <Lorem /> */}
                      {m.name}
                    </div>
                  </div>
                  <div className="col-start-1 row-start-2 line-clamp-2 text-sm grow">
                    <div className={cns.textMuted("line-clamp-2")}>
                      {/* <Lorem /> */}
                      {m.short_description}
                    </div>
                  </div>
                  <div className={cns.badge()}>{m.game}</div>
                </div>
                <div className="flex flex-col shrink-0 text-sm">
                  <div className="flex gap-2.5">
                    <div className="flex gap-1.5 items-center">
                      <LucideDownload className={cns.textMuted()} />
                      {prettyNum(m.downloads, '', undefined, 0)}
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <LucideHeart className={cns.textMuted()} />
                      {prettyNum(m.followers, '', undefined, 0)}
                    </div>
                  </div>
                  <div>
                    {/* <div className="flex gap-1.5 items-center">
                      <LucideHeart className={cns.textMuted()} />
                      <DateTooltip value={m..at(0)?.created} />
                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

      </div>
      {/* Extra Info */}

    </div>
  </>
}