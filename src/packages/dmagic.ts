import type { Package } from "./_types"

export const dmagic: Package = {
  name: "DMagic",
  prefix: "dm",
  antennas: {
    "usis": {
      label: "Signal Intelligence Satellite 01T \"UnderSZ\"", image: "/dmagic/antenna/undersz.png",
      type: "direct", rating: 10_000_000_000, combinabilityExponent: 0,
    },
    "osis": {
      label: "Signal Intelligence Satellite 10T \"OverSZ\"", image: "/dmagic/antenna/oversz.png",
      type: "direct", rating: 1_000_000_000_000, combinabilityExponent: 0,
    },

  },
  dsnLevels: {},
  planets: {},
}