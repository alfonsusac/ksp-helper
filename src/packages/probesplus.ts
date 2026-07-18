import type { Package } from "./types"

export const probesplus: Package = {
  name: "ProbesPlus",
  dsnLevels: {},
  planets: {},
  antennas: {
    "pp_ca_ant_gps": {
      image: "",
      label: "CA-KPS KerbNet Position System Antenna",
      type: "direct",
      rating: 400_000,
      combinabilityExponent: 1
    },
    "pp_antenna_tv": {
      image: "",
      label: "CA-A01 Ground Plane Antenna",
      type: "direct",
      rating: 500_000,
      combinabilityExponent: 1
    },
    "pp_antenna_quetzal": {
      image: "",
      label: "CA-A06 Quetzal Omni Antenna",
      type: "direct",
      rating: 500_000,
      combinabilityExponent: 0
    },
    "pp_ca_landv_omni": {
      image: "",
      label: "CA-A07 Landvermesser Omni Antenna",
      type: "direct",
      rating: 505_000,
      combinabilityExponent: 1
    },
    "pp_antenna_cone_toggle": {
      image: "",
      label: "CA-A02 Conic Antenna",
      type: "direct",
      rating: 550_000,
      combinabilityExponent: 0
    },
    "pp_ca_landv_hga": {
      image: "",
      label: "CA-AE20 HGA Antenna and Solar Panel",
      type: "direct",
      rating: 1_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_deploy_S2": {
      image: "",
      label: "CA-AD1-R Small Folding Relay Antenna",
      type: "relay",
      rating: 2_500_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_deploy_S": {
      image: "",
      label: "CA-A10 Small Folding Relay Antenna",
      type: "relay",
      rating: 5_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_xihe": {
      image: "",
      label: "CA-D02 Medium Folding Relay Antenna",
      type: "relay",
      rating: 10_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_S": {
      image: "",
      label: "CA-A100 Small Dish Antenna",
      type: "direct",
      rating: 2_500_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_tatsujin": {
      image: "",
      label: "CA-A180 Tatsujin Relay Antenna",
      type: "relay",
      rating: 15_000_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_hera": {
      image: "",
      label: "CA-A190 Hera Dish Antenna",
      type: "relay",
      rating: 30_000_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_quetzal": {
      image: "",
      label: "CA-A200 Quetzal Relay Antenna",
      type: "relay",
      rating: 50_000_000_000,
      combinabilityExponent: 0.75
    },
    "pp_dish_L": {
      image: "",
      label: "CA-A300 Torekka Relay Antenna",
      type: "relay",
      rating: 100_000_000_000,
      combinabilityExponent: 0.75
    },
  },
}