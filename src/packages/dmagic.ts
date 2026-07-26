import type { Package } from "./types"

export const dmagic: Package = {
  name: "DMagic",
  antennas: {
    "dm-usis": {
      label: "Signal Intelligence Satellite 01T \"UnderSZ\"",
      image: "/dmagic/antenna/undersz.png",
      type: "direct",
      combinabilityExponent: 0,
      rating: 10_000_000_000
    },
    "dm-osis": {
      label: "Signal Intelligence Satellite 10T \"OverSZ\"",
      image: "/dmagic/antenna/oversz.png",
      type: "direct",
      combinabilityExponent: 0,
      rating: 1_000_000_000_000
    },

  },
  dsnLevels: {},
  planets: {},
}