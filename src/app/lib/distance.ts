import { planetData } from "@/constants"
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



export const planetDistanceMap = (() => {

  const getSortedPair = (a: string, b: string) => {
    return [ a, b ].sort().join('|') as `${ string }|${ string }`
  }

  const planets = new Set<string>()
  const mappedRawDistanceData = new Map<`${ string }|${ string }`, { min: number, max: number }>

  for (const from in planetData) {
    planets.add(from)
    const distanceData = planetData[ from as keyof typeof planetData ].to
    for (const to in distanceData) {
      planets.add(to)
      const sortedPair = getSortedPair(from, to)
      mappedRawDistanceData.set(sortedPair, distanceData[ to as keyof typeof distanceData ])
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

  // console.log(newLookup)
  return newLookup
})()


