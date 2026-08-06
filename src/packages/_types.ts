

export type Package = {
  name: string,
  prefix: string,
  planets?: Record<string, PlanetDefinition>,
  antennas?: Record<string, AntennaDefinition>,
  dsnLevels?: Record<string, { rating: number }>
}

export type AntennaDefinition = {
  label: string,
  rating: number,
  type: "direct" | "relay",
  combinabilityExponent: number
  // packetSizeInMits: number,
  // bandwidthInMitsPerSec: number,
  image: string,
}

export type DistanceRange = { min: number, max: number }

export type PlanetDefinition = {
  image?: string,
  distanceToPlanets?: Record<string, DistanceRange | null>,
  radius: number,
  soiRadius?: number,
  soiHeight?: number,
  atmHeight?: number,
  highestPoint?: number,
  imageScale?: number,
  imageX?: number,
  imageY?: number,
  notLandable?: boolean,
  planetGravitationalParameter?: number, // m^3s^-2
}