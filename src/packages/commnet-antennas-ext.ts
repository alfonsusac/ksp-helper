import type { Package } from "./types"

// src https://docs.google.com/spreadsheets/d/1iovDBhGQEDkjVv97rK0WHBqCtq9x-lu4M36FlDJrn4I
export const commnetAntennasExtension: Package = {
  name: "CommNet Antennas Extension",
  prefix: "cae",
  dsnLevels: {},
  planets: {},
  antennas: {
    "expvr2t": {
      label: "C2 Communotron EXP-VR-2T", image: "/commnet-antennas-ext/antenna/exp-vr-2t-hd.png",
      type: "direct", rating: 5_000_000, combinabilityExponent: 1,
    },
    "hg32": {
      label: "C2+ High Gain Antenna HG-32", image: "/commnet-antennas-ext/antenna/hg-32-hd.png",
      type: "relay", rating: 32_000_000, combinabilityExponent: 0.75,
    },
    "ra7": {
      label: "C3+ Relay Antenna RA-7", image: "/commnet-antennas-ext/antenna/ra-7-hd.png",
      type: "relay", rating: 7_000_000_000, combinabilityExponent: 0.75,
    },
    "ra25": {
      label: "C4+ Relay Antenna RA-25", image: "/commnet-antennas-ext/antenna/ra-25-hd.png",
      type: "relay", rating: 25_000_000_000, combinabilityExponent: 0.75,
    },
    "tigger": {
      label: "C5+ Communotron \"Tigger\"", image: "/commnet-antennas-ext/antenna/trigger-hd.png",
      type: "direct", rating: 500_000_000_000, combinabilityExponent: 1,
    },
    "rt1": {
      label: "C5+ RelayTech One", image: "/commnet-antennas-ext/antenna/rt1-hd.png",
      type: "relay", rating: 500_000_000_000, combinabilityExponent: 1,
    },
  }
}