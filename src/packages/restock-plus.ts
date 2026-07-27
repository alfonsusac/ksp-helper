import type { Package } from "./types"

// src https://docs.google.com/spreadsheets/d/1iovDBhGQEDkjVv97rK0WHBqCtq9x-lu4M36FlDJrn4I
export const restockplus: Package = {
  name: "ReStock PLus",
  dsnLevels: {},
  planets: {},
  antennas: {
    "rs-hg20": {
      label: "HG-20 High Gain Antenna", image: "/restock-plus/antenna/hg-20-hd.png",
      type: "relay", rating: 20_000_000, combinabilityExponent: 0.75,
    },
    "rs-dtsj1": {
      label: "Communotron DTS-J1", image: "/restock-plus/antenna/dts-j1-hd.png",
      type: "direct", rating: 2_000_000_000, combinabilityExponent: 0.75,
    },
    "rs-hg61": {
      label: "Communotron HG-61", image: "/restock-plus/antenna/hg-61-hd.png",
      type: "direct", rating: 15_000_000_000, combinabilityExponent: 0.75,
    },
  }
}