import { notFound } from "next/navigation"
import { SpacedockNext } from "../../_data-cache/cached-functions"
import type { Metadata } from "next"
import { Breadcrumb } from "../../_components/shared"
import { cn } from "@/ui/cn"
import { cns } from "@/design-system"
import { prettyNum } from "@/lib/pretty-num"
import { LucideArrowUpRight, LucideDownload, LucideLink, LucidePackage, LucideTerminal } from "@/ui/icons"
import Link from "next/link"
import { SearchBox } from "../../_components/search-box"

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
      <div className={cn("col-start-1 flex flex-col gap-2", cns.infoCard())}>
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
              <Link href={`https://www.reddit.com/user/${user.redditUsername}`} className={cns.cardButton("-mx-2")} target="_blank">
                <LucideLink className={cns.cardButtonIcon()} />
                <div>Reddit Profile</div>
                <LucideArrowUpRight />
              </Link>
            }
            {user.twitterUsername &&
              <Link href={`https://twitter.com/${user.twitterUsername}`} className={cns.cardButton("-mx-2")} target="_blank">
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
        {/* <div className="bg-red-500">
          Test
        </div> */}
        <SearchBox className="w-full h-0 shrink! basis-0! h-0!" />

      </div>
      {/* Extra Info */}

    </div>
  </>
}