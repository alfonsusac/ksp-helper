

export type Package = {
  name: string
  planets: Record<string, PlanetDefinition>,
  antennas: Record<string, AntennaDefinition>,
  dsnLevels: Record<string, { rating: number }>
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
  radius?: number,
  soi?: number,
  atmHeight?: number,
}