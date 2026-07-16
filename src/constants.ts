type BaseAntennaData = {
  label: string,
  rating: number,
  type: "direct" | "relay",
  combinabilityExponent: false | number
  packetSizeInMits: number,
  bandwidthInMitsPerSec: number,
  image: string,
}

export const antennaTypes = [ 'c16', 'c16s', 'c88', 'cdtsm1', 'chg55', 'hg5', 'ra100', 'ra15', 'ra2' ] as const
export type AntennaTypes = typeof antennaTypes[ number ]

export const antennaData = {
  "c16": {
    label: "Communotron 16",
    rating: 500_000, // 500k
    type: "direct",
    combinabilityExponent: 1,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 3.3333,
    image: "https://wiki.kerbalspaceprogram.com/images/4/49/Communotron_16.png",
  },
  'c16s': {
    label: "Communotron 16-S",
    rating: 500_000, // 500k
    type: "direct",
    combinabilityExponent: 0,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 3.3333,
    image: "https://wiki.kerbalspaceprogram.com/images/d/da/Communotron_16-S.png",
  },
  'c88': {
    label: "Communotron 88-88",
    rating: 100_000_000_000, // 100G
    type: "direct",
    combinabilityExponent: 0.75,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 20,
    image: "https://wiki.kerbalspaceprogram.com/images/c/cd/Communotron_88-88.png",
  },
  'cdtsm1': {
    label: "Communotron DTS-M1",
    rating: 2_000_000_000, // 2G
    type: "direct",
    combinabilityExponent: 0.75,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 5.7143,
    image: "https://wiki.kerbalspaceprogram.com/images/a/aa/Comms_DTS-M1_02.png",
  },
  'chg55': {
    label: "Communotron HG-55",
    rating: 15_000_000_000, // 15G
    type: "direct",
    combinabilityExponent: 0.75,
    packetSizeInMits: 3,
    bandwidthInMitsPerSec: 20,
    image: "https://wiki.kerbalspaceprogram.com/images/3/30/Commutron_HG-55.png",
  },
  'hg5': {
    label: "HG-5 High Gain Antenna",
    rating: 5_000_000, // 5M
    type: "relay",
    combinabilityExponent: 0.75,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 5.713,
    image: "https://wiki.kerbalspaceprogram.com/images/7/75/HG-5_High_Gain_Antenna_%28%2Bopen%29.png",
  },
  'ra100': {
    label: "RA-100 Relay Antenna",
    rating: 100_000_000_000, // 100G
    type: "relay",
    combinabilityExponent: 0.75,
    packetSizeInMits: 4,
    bandwidthInMitsPerSec: 11.4286,
    image: "https://wiki.kerbalspaceprogram.com/images/2/28/RA-100_Relay_Antenna.png",
  },
  'ra15': {
    label: "RA-15 Relay Antenna",
    rating: 15_000_000_000, // 15G
    type: "relay",
    combinabilityExponent: 0.75,
    packetSizeInMits: 2,
    bandwidthInMitsPerSec: 5.7143,
    image: "https://wiki.kerbalspaceprogram.com/images/7/7b/RA-15_Relay_Antenna.png",
  },
  'ra2': {
    label: "RA-2 Relay Antenna",
    rating: 2_000_000_000, // 2G
    type: "relay",
    combinabilityExponent: 0.75,
    packetSizeInMits: 1,
    bandwidthInMitsPerSec: 2.8571,
    image: "https://wiki.kerbalspaceprogram.com/images/e/e6/RA-2_Relay_Antenna.png"
  }
} satisfies Record<AntennaTypes, BaseAntennaData>


export const kscLevels = [ '1', '2', '3' ] as const
export type KSCLevels = typeof kscLevels[ number ]

export const kscDSNdata = {
  1: {
    rating: 2_000_000_000 // 2G
  },
  2: {
    rating: 50_000_000_000 // 50G
  },
  3: {
    rating: 250_000_000_000 // 250G
  }
} satisfies Record<KSCLevels, {
  rating: number
}>