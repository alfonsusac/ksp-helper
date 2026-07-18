import type { Package } from "./types"

export const jsx2antenna: Package = {
  name: "JX2Antenna",
  planets: {},
  dsnLevels: {},
  antennas: {
    "jx2-ju1": {
      label: "JU1 Medium Deployable Antenna",
      image: "",
      type: "relay",
      rating: 300_000_000_000,
      combinabilityExponent: 0.75
    },
    "jx2-jw1": {
      label: "JW1 Medium Deployable Antenna",
      image: "",
      type: "direct",
      rating: 300_000_000_000,
      combinabilityExponent: 0.75
    },
    "jx2-jx2": {
      label: "JX2 Large Deployable Antenna",
      image: "",
      type: "relay",
      rating: 1_000_000_000_000,
      combinabilityExponent: 0.75
    }
  }
}