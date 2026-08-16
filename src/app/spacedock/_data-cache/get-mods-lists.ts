import type { ModList } from "@/lib/spacedock-core/spacedock"
import { SpacedockNext } from "./cached-functions"

type SearchParameter = { game_id?: number, trim?: number }

function getFilteredList(list: ModList, opts?: SearchParameter) {
  if (opts?.game_id)
    list = list.filter(g => opts.game_id !== undefined ? opts.game_id === g.game_id : true)

  if (opts?.trim !== undefined)
    list = list.slice(0, opts.trim)

  return list
}


export async function getFeaturedMods(opts?: SearchParameter) {

  let i = 1
  let featureds: ModList = []
  while (true) {
    const res = await SpacedockNext.browseFeatured({ page: i })
    if (featureds.find(f => f.id === res.payload[ 0 ]?.id)) break
    res.payload.forEach(m => featureds.push(m))
    i++
  }

  return getFilteredList(featureds, opts)
}



export async function getTopMods(opts?: { trim?: number }) {

  let i = 1
  let limit = 30
  let tops: ModList = []
  while (true) {
    const res = await SpacedockNext.browseTop({ page: i })
    if (tops.find(f => f.id === res.payload[ 0 ]?.id)) break
    res.payload.forEach(m => {
      if (tops.length < limit) tops.push(m)
    })
    if (tops.length >= limit) break
    i++
  }

  return getFilteredList(tops, opts)

}



export async function getNewMods(opts?: { trim?: number, game_id?: number }) {
  const res = await SpacedockNext.browseNew({
    game_id: opts?.game_id,
  })

  const filtered = getFilteredList(res.payload, opts)

  return {
    ...res.payload,
    result: filtered
  }
}