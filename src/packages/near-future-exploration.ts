import type { Package } from "./types"

export const nearfutureexpansion: Package = {
  name: "Near Future Exploration",
  antennas: {
    "nfex-antenna-feeder-direct-1":   { label: "F-DA Direct Antenna Feed",          type: "direct", rating:            5_000, combinabilityExponent: 0.5, image: "" },
    "nfex-antenna-rover-1":           { label: "AX-4 Pointable Helical Antenna",    type: "direct", rating:           40_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-phased-single-1":   { label: "PH-1 Phased Array Antenna Element", type: "direct", rating:          125_000, combinabilityExponent: 1, image: "" },
    "nfex-antenna-rover-2":           { label: "AX-5 Aerial Micro-Antenna",         type: "direct", rating:          150_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-phased-single-2":   { label: "PH-2 Phased Array Antenna Element", type: "direct", rating:          200_000, combinabilityExponent: 1, image: "" },
    "nfex-antenna-rover-3":           { label: "AX-30 High Gain Micro-Antenna",     type: "direct", rating:          300_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-static-mini-1":     { label: "DR-1 High Gain Antenna",            type: "direct", rating:          300_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-deploy-wv3-1":      { label: "DR-3 Deployable High Gain Antenna", type: "direct", rating:          500_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-phased-single-3":   { label: "PH-3 Phased Array Antenna Element", type: "direct", rating:          800_000, combinabilityExponent: 1, image: "" },
    "nfex-antenna-top-dish-1":        { label: "D-2 Spot Antenna",                  type: "direct", rating:        2_000_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-top-dish-2":        { label: "D-50 Large Spot Antenna",           type: "direct", rating:       50_000_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-feeder-relay-1":    { label: "F-RA Relay Antenna Feed",           type: "relay", rating:            5_000, combinabilityExponent: 0.5, image: "" },
    "nfex-antenna-relay-tiny-1":      { label: "RA-00-2 Micro-Relay Antenna",       type: "relay", rating:        2_000_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-phased-array-1":    { label: "RA-X1 Phased Relay Antenna",        type: "relay", rating:        6_000_000, combinabilityExponent: 0.25, image: "" },
    "nfex-antenna-phased-array-2":    { label: "RA-X2 Phased Relay Antenna",        type: "relay", rating:       10_000_000, combinabilityExponent: 0.25, image: "" },
    "nfex-antenna-relay-tdrs-1":      { label: "RA-0-8 Relay Antenna",              type: "relay", rating:       85_000_000, combinabilityExponent: 0.75, image: "" },
    "nfex-antenna-phased-array-3":    { label: "RA-X3 Phased Relay Antenna",        type: "relay", rating:      10_0000_000, combinabilityExponent: 0.25, image: "" },
    "nfex-antenna-relay-tdrs-2":      { label: "RA-5B Advanced Relay Antenna",      type: "relay", rating:      500_000_000, combinabilityExponent: 0.75, image: "" },
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
















































