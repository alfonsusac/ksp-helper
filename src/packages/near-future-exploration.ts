import type { Package } from "./_types"

export const nearfutureexpansion: Package = {
  name: "Near Future Exploration",
  prefix: "nefx",
  antennas: {
    "ax-04": {
      label: "C0+ AX-04 Pointable Helical Antenna", image: "/nfe/antenna/ax04.png",
      type: "direct", rating: 40_000, combinabilityExponent: 0.5,
    },
    "ax-05": {
      label: "C0+ AX-05 Aerial Micro-Antenna", image: "/nfe/antenna/ax05.png",
      type: "direct", rating: 150_000, combinabilityExponent: 0.75,
    },
    "ph-1": {
      label: "C0+ PH-1 Phased Array Antenna Element", image: "/nfe/antenna/ph1.png",
      type: "direct", rating: 125_000, combinabilityExponent: 1,
    },
    "ph-2": {
      label: "C0+ PH-2 Phased Array Antenna Element", image: "/nfe/antenna/ph2.png",
      type: "direct", rating: 200_000, combinabilityExponent: 1,
    },
    "ax-30": {
      label: "C0++ AX-30 High Gain Micro-Antenna", image: "/nfe/antenna/ax30.png",
      type: "direct", rating: 300_000, combinabilityExponent: 0.75
    },
    "dr01": {
      label: "C0++ DR-1 High Gain Antenna", image: "/nfe/antenna/dr01.png",
      type: "direct", rating: 300_000, combinabilityExponent: 0.75
    },
    "dr-3": {
      label: "C1 DR-3 Deployable High Gain Antenna", image: "/nfe/antenna/dr3.png",
      type: "direct", rating: 500_000, combinabilityExponent: 0.75,
    },
    "ph-3": {
      label: "C1+ PH-3 Phased Array Antenna Element", image: "/nfe/antenna/ph3.png",
      type: "direct", rating: 800_000, combinabilityExponent: 1,
    },
    "ra-00-2": {
      label: "C1++ RA-00-2 Micro-Relay Antenna", image: "/nfe/antenna/ra002.png",
      type: "relay", rating: 2_000_000, combinabilityExponent: 0.75
    },
    "d2": {
      label: "C1++ Spot Antenna D-2", image: "/nfe/antenna/d2.png",
      type: "direct", rating: 2_000_000, combinabilityExponent: 0.75
    },
    "gra-x1": {
      label: "C2+ GRA-X1 Phased Relay Antenna", image: "/nfe/antenna/grax1.png",
      type: "relay", rating: 6_000_000, combinabilityExponent: 0.25
    },
    "gra-x2": {
      label: "C2+ GRA-X2 Phased Relay Antenna", image: "/nfe/antenna/grax2.png",
      type: "relay", rating: 10_000_000, combinabilityExponent: 0.25
    },
    "d50": {
      label: "C2+ Large Spot Antenna D-50", image: "/nfe/antenna/d50.png",
      type: "direct", rating: 50_000_000, combinabilityExponent: 0.75
    },
    "ra08": {
      label: "C2+ RA-0-8 Relay Antenna", image: "/nfe/antenna/ra08.png",
      type: "relay", rating: 85_000_000, combinabilityExponent: 0.75
    },
    "grax3": {
      label: "C2++ GRA-X3 Phased Relay Antenna", image: "/nfe/antenna/grax3.png",
      type: "relay", rating: 100_000_000, combinabilityExponent: 0.25
    },
    "ra5b": {
      label: "C2++ RA-5B Advanced Relay Antenna", image: "/nfe/antenna/ra5b.png",
      type: "relay", rating: 500_000_000, combinabilityExponent: 0.75
    },
    "fda": {
      label: "F-DA Direct Antenna Feed", image: "/nfe/antenna/fda.png",
      type: "direct", rating: 5_000, combinabilityExponent: 0.5,
    },
    "fra": {
      label: "F-RA Relay Antenna Feed", image: "/nfe/antenna/fra.png",
      type: "relay", rating: 5_000, combinabilityExponent: 0.5
    },




    // "nfex-antenna-feeder-direct-1":   { label: "F-DA Direct Antenna Feed",          type: "direct", rating:            5_000, combinabilityExponent: 0.5, image: "" },
    // "nfex-antenna-rover-1":           { label: "AX-4 Pointable Helical Antenna",    type: "direct", rating:           40_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-phased-single-1":   { label: "PH-1 Phased Array Antenna Element", type: "direct", rating:          125_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-rover-2":           { label: "AX-5 Aerial Micro-Antenna",         type: "direct", rating:          150_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-phased-single-2":   { label: "PH-2 Phased Array Antenna Element", type: "direct", rating:          200_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-rover-3":           { label: "AX-30 High Gain Micro-Antenna",     type: "direct", rating:          300_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-static-mini-1":     { label: "DR-1 High Gain Antenna",            type: "direct", rating:          300_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-deploy-wv3-1":      { label: "DR-3 Deployable High Gain Antenna", type: "direct", rating:          500_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-phased-single-3":   { label: "PH-3 Phased Array Antenna Element", type: "direct", rating:          800_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-top-dish-1":        { label: "D-2 Spot Antenna",                  type: "direct", rating:        2_000_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-top-dish-2":        { label: "D-50 Large Spot Antenna",           type: "direct", rating:       50_000_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-feeder-relay-1":    { label: "F-RA Relay Antenna Feed",           type: "relay", rating:            5_000, combinabilityExponent: 0.5, image: "" },
    // "nfex-antenna-relay-tiny-1":      { label: "RA-00-2 Micro-Relay Antenna",       type: "relay", rating:        2_000_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-phased-array-1":    { label: "RA-X1 Phased Relay Antenna",        type: "relay", rating:        6_000_000, combinabilityExponent: 0.25, image: "" },
    // "nfex-antenna-phased-array-2":    { label: "RA-X2 Phased Relay Antenna",        type: "relay", rating:       10_000_000, combinabilityExponent: 0.25, image: "" },
    // "nfex-antenna-relay-tdrs-1":      { label: "RA-0-8 Relay Antenna",              type: "relay", rating:       85_000_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-phased-array-3":    { label: "RA-X3 Phased Relay Antenna",        type: "relay", rating:      10_0000_000, combinabilityExponent: 0.25, image: "" },
    // "nfex-antenna-relay-tdrs-2":      { label: "RA-5B Advanced Relay Antenna",      type: "relay", rating:      500_000_000, combinabilityExponent: 0.75, image: "" },
    // "nfex-antenna-reflector-side-1":  { label: "RFL-1 Dish Reflector",              type: "reflector", rating:        9_000_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-reflector-side-2":  { label: "RFL-2 Medium Dish Reflector",       type: "reflector", rating:       75_000_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-reflector-side-3":  { label: "RFL-3 Dish Reflector Array",        type: "reflector", rating:      850_000_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-reflector-large-1": { label: "RFL-50 Large Dish Reflector",       type: "reflector", rating:    9_000_000_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-reflector-huge-1":  { label: "RFL-100 Giant Dish Reflector",      type: "reflector", rating:  100_000_000_000, combinabilityExponent: 1, image: "" },
    // "nfex-antenna-reflector-giant-1": { label: "RFL-2000 Dish Reflector Array",     type: "reflector", rating: 5_000_000_000_000, combinabilityExponent: 1, image: "" },
  },
  dsnLevels: {},
  planets: {},
}
















































