import type { Package } from "./types"

export const probesplus: Package = {
  name: "ProbesPlus",
  dsnLevels: {},
  planets: {},
  antennas: {
    "ca-a01": {
      label: "CA-A01 Ground Plane Antenna",
      image: "/probesplus/antenna/ca-a01.png",
      type: "direct", rating: 500_000, combinabilityExponent: 1,
    },
    "ca-a02": {
      label: "CA-A02 Conic Antenna",
      image: "/probesplus/antenna/ca-a02.png",
      type: "direct", rating: 550_000, combinabilityExponent: 0,
    },
    "ca-a06": {
      label: "CA-A06 'Quetzal' Omni Antenna",
      image: "/probesplus/antenna/ca-a06.png",
      type: "direct", rating: 500_000, combinabilityExponent: 0,
    },
    "ca-a07": {
      label: "CA-A07 Landvermesser Omni Antenna",
      image: "/probesplus/antenna/ca-a07.png",
      type: "direct", rating: 505_000, combinabilityExponent: 1,
    },
    "ca-a10": {
      label: "CA-A10 Small Folding Relay Antenna",
      image: "/probesplus/antenna/ca-a10.png",
      type: "relay", rating: 5_000_000, combinabilityExponent: 0.75,
    },
    "ca-a100": {
      label: "CA-A100 Small Dish Antenna",
      image: "/probesplus/antenna/ca-a100.png",
      type: "direct", rating: 2_500_000_000, combinabilityExponent: 0.75
    },
    "ca-a180": {
      label: "CA-A180 Tatsujin Relay Antenna",
      image: "/probesplus/antenna/ca-a180.png",
      type: "relay", rating: 15_000_000_000, combinabilityExponent: 0.75,
    },
    "ca-a190": {
      label: "CA-A190 Hera Dish Antenna",
      image: "/probesplus/antenna/ca-a190.png",
      type: "relay", rating: 30_000_000_000, combinabilityExponent: 0.75,
    },
    "ca-a200": {
      label: "CA-A200 Quetzal Relay Antenna",
      image: "/probesplus/antenna/ca-a200.png",
      type: "relay", rating: 50_000_000_000, combinabilityExponent: 0.75,
    },
    "ca-a20-b": {
      label: "CA-A20-B HGA Antenna",
      image: "/probesplus/antenna/ca-a20-b.png",
      type: "direct", rating: 1_000_000, combinabilityExponent: 0.75,
    },
    "ca-a300": {
      label: "CA-A300 Torekka Relay Antenna",
      image: "/probesplus/antenna/ca-a300.png",
      type: "relay", rating: 100_000_000_000, combinabilityExponent: 0.75,
    },
    "ca-ad1-r": {
      label: "CA-AD1-R Small Folding Relay Antenna",
      image: "/probesplus/antenna/ca-ad1-r.png",
      type: "relay", rating: 2_500_000, combinabilityExponent: 0.75,
    },
    "ca-ae20": {
      label: "CA-AE20 HGA Antenna and Solar Panel",
      image: "/probesplus/antenna/ca-ae20.png",
      type: "direct", rating: 1_000_000, combinabilityExponent: 0.75,
    },
    "ca-d02": {
      label: "CA-D02 Medium Folding Relay Antenna",
      image: "/probesplus/antenna/ca-d02.png",
      type: "relay", rating: 10_000_000, combinabilityExponent: 0.75,
    },
    "cae-102": {
      label: "CAE-102 Vorona Dish Antenna",
      image: "/probesplus/antenna/cae-102.png",
      type: "relay", rating: 3_000_000_000, combinabilityExponent:0.75,
    },
    "cae-a03": {
      label: "CAE-A03 Vorona Communication Array",
      image: "/probesplus/antenna/cae-a03.png",
      type: "direct", rating: 960_000, combinabilityExponent: 0,
    },
    "ca-kps": {
      label: "CA-KPS Kerbnet Position System Antenna",
      image: "/probesplus/antenna/ca-kps.png",
      type: "direct", rating: 400_000, combinabilityExponent: 1,
    },
    "ca-mer-a400": {
      label: "CA-MER-A400 Meridiani Dish Antenna",
      image: "/probesplus/antenna/ca-mer-a400.png",
      type: "relay", rating: 100_000_000_000, combinabilityExponent: 0.75,
    }













    // "pp_ca_ant_gps": {
    //   image: "",
    //   label: "CA-KPS KerbNet Position System Antenna",
    //   type: "direct",
    //   rating: 400_000,
    //   combinabilityExponent: 1
    // },
    // "pp_antenna_tv": {
    //   image: "",
    //   label: "CA-A01 Ground Plane Antenna",
    //   type: "direct",
    //   rating: 500_000,
    //   combinabilityExponent: 1
    // },
    // "pp_antenna_quetzal": {
    //   image: "",
    //   label: "CA-A06 Quetzal Omni Antenna",
    //   type: "direct",
    //   rating: 500_000,
    //   combinabilityExponent: 0
    // },
    // "pp_ca_landv_omni": {
    //   image: "",
    //   label: "CA-A07 Landvermesser Omni Antenna",
    //   type: "direct",
    //   rating: 505_000,
    //   combinabilityExponent: 1
    // },
    // "pp_antenna_cone_toggle": {
    //   image: "",
    //   label: "CA-A02 Conic Antenna",
    //   type: "direct",
    //   rating: 550_000,
    //   combinabilityExponent: 0
    // },
    // "pp_ca_landv_hga": {
    //   image: "",
    //   label: "CA-AE20 HGA Antenna and Solar Panel",
    //   type: "direct",
    //   rating: 1_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_deploy_S2": {
    //   image: "",
    //   label: "CA-AD1-R Small Folding Relay Antenna",
    //   type: "relay",
    //   rating: 2_500_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_deploy_S": {
    //   image: "",
    //   label: "CA-A10 Small Folding Relay Antenna",
    //   type: "relay",
    //   rating: 5_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_xihe": {
    //   image: "",
    //   label: "CA-D02 Medium Folding Relay Antenna",
    //   type: "relay",
    //   rating: 10_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_S": {
    //   image: "",
    //   label: "CA-A100 Small Dish Antenna",
    //   type: "direct",
    //   rating: 2_500_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_tatsujin": {
    //   image: "",
    //   label: "CA-A180 Tatsujin Relay Antenna",
    //   type: "relay",
    //   rating: 15_000_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_hera": {
    //   image: "",
    //   label: "CA-A190 Hera Dish Antenna",
    //   type: "relay",
    //   rating: 30_000_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_quetzal": {
    //   image: "",
    //   label: "CA-A200 Quetzal Relay Antenna",
    //   type: "relay",
    //   rating: 50_000_000_000,
    //   combinabilityExponent: 0.75
    // },
    // "pp_dish_L": {
    //   image: "",
    //   label: "CA-A300 Torekka Relay Antenna",
    //   type: "relay",
    //   rating: 100_000_000_000,
    //   combinabilityExponent: 0.75
    // },
  },
}