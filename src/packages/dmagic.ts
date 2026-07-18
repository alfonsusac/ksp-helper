import type { Package } from "./types"

export const dmagic: Package = {
  name: "DMagic",
  antennas: {
    "dm-usis": {
      label: "Undersize Signals Intelligence Satellite",
      image: "",
      type: "direct",
      combinabilityExponent: 0,
      rating: 10_000_000_000
    },
    "dm-osis": {
      label: "Oversize Signals Intelligence Satellite",
      image: "",
      type: "direct",
      combinabilityExponent: 0,
      rating: 1_000_000_000_000
    },

  },
  dsnLevels: {},
  planets: {},
}