import { getDownloadURLFileSize } from "@/lib/get-download-url-size"
import type { $$ } from "@/lib/parameter-util-type"
import { Spacedock } from "@/lib/spacedock-core/package"
import type { ResponseType } from "@/lib/spacedock-core/spacedock"
import { unstable_cache } from "next/cache"



export const SpacedockNext = {
  browseTop: unstable_cache(async (...args: $$<typeof Spacedock.browseTop>) => {
    console.log("Fetching browseTop", args)
    const res = await Spacedock.browseTop(...args)
    if (res.status !== 200) throw new SpacedockNextError(`Error browsing top mods.`, args, res)
    return res
  }),
  browseFeatured: unstable_cache(async (...args: $$<typeof Spacedock.browseNew>) => {
    console.log("Fetching browseFeatured", args)
    const res = await Spacedock.browseFeatured(...args)
    if (res.status !== 200) throw new SpacedockNextError(`Error browsing featured mods.`, args, res)
    return res
  }),
  browseNew: unstable_cache(async (...args: $$<typeof Spacedock.browseNew>) => {
    console.log("Fetching browseNew", args)
    const res = await Spacedock.browseNew(...args)
    if (res.status !== 200) throw new SpacedockNextError(`Error browsing new mods.`, args, res)
    return res
  }),
  browse: unstable_cache(async (...args: $$<typeof Spacedock.browse>) => {
    console.log("Fetching browse", args)
    const res = await Spacedock.browse(...args)
    if (res.status !== 200) throw new SpacedockNextError(`Error browsing mods.`, args, res)
    return res
  }),

  getGames: unstable_cache(async () => {
    console.log("Fetching all games")
    const res = await Spacedock.getGames()
    if (res.status !== 200) throw new SpacedockNextError("Error fetching game list", undefined, res)
    return res.payload
  }),

  findMod: unstable_cache(async (...args: $$<typeof Spacedock.getMod>) => {
    console.log("Getting one mod")
    const res = await Spacedock.getMod(...args)
    if (res.status === 404) return null
    if (res.status === 403 || res.status === 401) return "not published"
    if (res.status !== 200) throw new SpacedockNextError("Error fetching mod", args, res)
    return res.payload
  }),

  getUser: unstable_cache(async (...args: $$<typeof Spacedock.getUser>) => {
    console.log("Fetching a user")
    const res = await Spacedock.getUser(...args)
    if (res.status === 403) return "private user"
    if (res.status === 404) return null
    if (res.status !== 200) throw new SpacedockNextError("Error fetching user", args, res)
    const payload = res.payload
    const totalDownloads = payload.mods.reduce((prev, curr) => {
      prev += curr.downloads
      return prev
    }, 0)
    const hasSocials = payload.forumUsername || payload.ircNick || payload.redditUsername || payload.twitterUsername 
    return { ...res.payload, totalDownloads, hasSocials }
  }),





  getDownloadURLFileSize: unstable_cache(async (path: string) => {
    const bytes = await getDownloadURLFileSize('https://spacedock.info' + path)
    return bytes
  })
}


class SpacedockNextError extends Error {
  constructor(message: string, args: any, res: ResponseType<number, unknown>) {
    super(`${ message }\n args: ${ JSON.stringify(args) } \n\n res: ${ JSON.stringify(res) }`)
  }
}

