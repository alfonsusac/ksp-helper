import { Spacedock } from "@/lib/spacedock-core/package"
import { unstable_cache } from "next/cache"

export const getGames = unstable_cache(async () => {
  const { status, payload } = await Spacedock.getGames()
  if (status !== 200) throw new Error("Error fetching game list")
  return payload
})