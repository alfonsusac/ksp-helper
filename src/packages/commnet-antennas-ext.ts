import type { Package } from "./types"

// src https://docs.google.com/spreadsheets/d/1iovDBhGQEDkjVv97rK0WHBqCtq9x-lu4M36FlDJrn4I
export const commnetAntennasExtension: Package = {
  name: "CommNet Antennas Extension",
  dsnLevels: {},
  planets: {},
  antennas: {
    "cae-expvr2t": {
      label: "C2 Communotron EXP-VR-2T",
      type: "direct",
      rating: 5_000_000,
      combinabilityExponent: 1,
      image: ""
    },
    "cae-hg32": {
      label: "C2+ High Gain Antenna HG-32",
      type: "relay",
      rating: 32_000_000,
      combinabilityExponent: 0.75,
      image: ""
    },
    "cae-ra7": {
      label: "C3+ Relay Antenna RA-7",
      type: "relay",
      rating: 7_000_000_000,
      combinabilityExponent: 0.75,
      image: ""
    },
    "cae-ra25": {
      label: "C4+ Relay Antenna RA-25",
      type: "relay",
      rating: 25_000_000_000,
      combinabilityExponent: 0.75,
      image: ""
    },
    "cae-tigger": {
      label: "C5+ Communotron \"Tigger\"",
      type: "direct",
      rating: 500_000_000_000,
      combinabilityExponent: 1,
      image: ""
    },
    "cae-rt1": {
      label: "C5+ RelayTech One",
      type: "relay",
      rating: 500_000_000_000,
      combinabilityExponent: 1,
      image: ""
    },
  }
}