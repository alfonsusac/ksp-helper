import { planetDistanceMap } from "@/constants"
import { getStrength } from "./antenna"

export function getSignalStrengthDistanceMap(from: string, maxRange: number) {

  if (from in planetDistanceMap === false) {
    return null
  }

  const map = planetDistanceMap[ from ]

  const result: {
    label: string,
    minDistance: number | null,
    maxDistance: number | null,
    minStrength: number | null,
    maxStrength: number | null,
  }[] = []

  for (const planetName in map) {
    const distanceToPlanet = map[ planetName ]
    const minDistance = distanceToPlanet?.min ?? null
    const maxDistance = distanceToPlanet?.max ?? null
    result.push({
      label: planetName,
      minDistance: distanceToPlanet?.min ?? null,
      maxDistance: distanceToPlanet?.max ?? null,
      minStrength: minDistance ? getStrength(maxRange, minDistance) : null,
      maxStrength: maxDistance ? getStrength(maxRange, maxDistance) : null,
    })
  }

  return result
}