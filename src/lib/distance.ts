import type { DistanceRange } from "@/packages/types"
import { getStrength } from "./antenna"
import type { PlanetData } from "./packages"

export function getSignalStrengthDistanceMap(
  from: string,
  maxRange: number,
  planetData: PlanetData
) {

  if (planetData.map.has(from) === false) {
    return null
  }

  // console.log("planetData", planetData)

  const distanceMap = planetData.map.get(from)!.to

  // console.log("distanceMap", distanceMap)

  const result: {
    label: string,
    minDistance: number | null,
    maxDistance: number | null,
    minStrength: number | null,
    maxStrength: number | null,
  }[] = []

  for (const planetName in distanceMap) {
    if (planetData.map.has(planetName) === false) continue
    const distanceToPlanet = distanceMap[ planetName ]
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

  return result ?? null
}

export function symmetrizePlanetDistanceMap(
  planetData: Map<string, {
    package: string,
    to: Record<string, DistanceRange | null>,
    image?: string,
  }>
) {
  const getSortedPair = (a: string, b: string) => {
    return [ a, b ].sort().join('|') as `${ string }|${ string }`
  }

  const planets = new Set<string>()
  const mappedRawDistanceData = new Map<`${ string }|${ string }`, { min: number, max: number }>

  for (const [ fromName, data ] of planetData) {
    planets.add(fromName)
    // const distanceData = planetData.get(fromName)?.to
    // if (!distanceData) continue
    for (const to in data.to) {
      // planets.add(to)
      const sortedPair = getSortedPair(fromName, to)
      const distanceTo = data.to[ to ]
      if (distanceTo === null) continue
      mappedRawDistanceData.set(sortedPair, distanceTo)
    }
  }

  const newLookup: Record<string, Record<string, { min: number, max: number } | null>> = {}

  planets.forEach(fromPlanet => {
    const tempLookup: Record<string, { min: number, max: number } | null> = {}
    newLookup[ fromPlanet ] = tempLookup

    planets.forEach(toPlanet => {
      if (toPlanet === fromPlanet) {
        tempLookup[ toPlanet ] = { min: 0, max: 0 }
      } else {
        const sortedPair = getSortedPair(fromPlanet, toPlanet)
        const data = mappedRawDistanceData.get(sortedPair)
        if (data) {
          tempLookup[ toPlanet ] = data
        } else {
          console.log(`Planet Distance: No data for distance between ${ fromPlanet } and ${ toPlanet }`)
          tempLookup[ toPlanet ] = null
        }
      }
    })
  })

  // console.log(planets)

  // console.log(newLookup)
  return newLookup
}



// export const planetDistanceMap = symmetrizePlanetDistanceMap(planetData)


