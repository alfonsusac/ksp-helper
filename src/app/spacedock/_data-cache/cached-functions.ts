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
}



class SpacedockNextError extends Error {
  constructor(message: string, args: any, res: ResponseType<number, unknown>) {
    super(`${ message }\n args: ${ JSON.stringify(args) } \n\n res: ${ JSON.stringify(res) }`)
  }
}

