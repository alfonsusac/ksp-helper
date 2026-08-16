import { SpacedockAuth } from "./auth"
import { SpacedockGames } from "./games"
import { SpacedockMods } from "./mods"
import { SpacedockPacks } from "./pack"
import { SpacedockPublishers } from "./publishers"
import { SpacedockSearch } from "./search"
import { SpacedockUsers } from "./users"

export const Spacedock = {
  ...SpacedockGames,
  ...SpacedockAuth,
  ...SpacedockMods,
  ...SpacedockPacks,
  ...SpacedockPublishers,
  ...SpacedockSearch,
  ...SpacedockUsers,
}
