import type { Package } from "./_types"

export const venssr: Package = {
  name: "Vens S' R'",
  prefix: "vsr",
  planets: {},
  antennas: {
    // "vsr-hg20": {
    //   label: "HG-20 High Gain Antenna - Vens S' R'",
    //   combinabilityExponent: 0.75,
    //   type: "relay",
    //   rating: 20_000_000,
    //   image: "",
    // },
    "88-88-v": {
      label: "Communotron 88-88-V", image: "/venssr/antenna/c88-88v.png",
      type: "direct", rating: 100_000_000_000, combinabilityExponent: 0.75,
    }
  },
  dsnLevels: {}
}