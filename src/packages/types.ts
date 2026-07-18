

export type Package = {
  name: string
  planets: Record<string, BasePlanetDistanceMap>,
  antennas: Record<string, BaseAntennaData>,
  dsnLevels: Record<string, { rating: number }>
}

export type BaseAntennaData = {
  label: string,
  rating: number,
  type: "direct" | "relay",
  combinabilityExponent: number
  packetSizeInMits: number,
  bandwidthInMitsPerSec: number,
  image: string,
}

export type BasePlanetDistanceMap = {
  image?: string,
  distanceToPlanets: Record<string, { min: number, max: number } | null>
}