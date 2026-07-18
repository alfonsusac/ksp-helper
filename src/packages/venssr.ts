import type { Package } from "./types"

export const venssr: Package = {
  name: "Vens S' R'",
  planets: {},
  antennas: {
    "vsr-hg20": {
      label: "HG-20 High Gain Antenna - Vens S' R'",
      combinabilityExponent: 0.75,
      type: "relay",
      rating: 20_000_000,
      image: "",
    }
  },
  dsnLevels: {}
}