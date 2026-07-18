import { outerplanets } from "../packages/outer-planets-mod"
import { stock } from "../packages/stock"
import type { AntennaDefinition, DistanceRange } from "../packages/types"
import { symmetrizePlanetDistanceMap } from "./distance"
import { mapToListWithId } from "./object"

export const packages = {
  stock,
  outerplanets
} as const

export const packageNames = Object.keys(packages)
export type PackageNames = keyof typeof packages


// Parsed
export type AntennaData = ReturnType<typeof getAntennaData>
export type PlanetData = ReturnType<typeof getPlanetData>

export function getData(option: Record<PackageNames, boolean>) {
  const antennas = getAntennaData(option)
  const planets = getPlanetData(option)
  return { antennas, planets }
}

function getAntennaData(option: Record<PackageNames, boolean>) {
  const map = new Map<string, AntennaDefinition>()

  Object.entries(packages).forEach(([ name, pack ]) => {
    if (!option[ name as PackageNames ]) return
    Object.entries(pack.antennas ?? {}).forEach(([ satName, sat ]) => {
      map.set(satName, sat)
    })
  })

  const list = mapToListWithId(map)

  return list
}

function getPlanetData(option: Record<PackageNames, boolean>) {

  const map: Map<string, {
    package: string,
    to: Record<string, DistanceRange | null>,
    image?: string,
  }> = new Map()

  Object.entries(packages).forEach(([ pkName, pack ]) => {
    if (!option[ pkName as PackageNames ]) return
    Object.entries(pack.planets ?? {}).forEach(([ planetName, planet ]) => {
      map.set(planetName, {
        package: pkName,
        to: planet.distanceToPlanets,
        image: planet.image
      })
    })

  })

  const symmetrized = symmetrizePlanetDistanceMap(map)

  // console.log("symetrized", symmetrized)

  Object.entries(symmetrized).forEach(([ fromName, fromPlanet ]) => {
    if (fromPlanet === null) return
    if (map.has(fromName) === false) return
    const planet = map.get(fromName)
    if (!planet) return
    planet.to = fromPlanet
  })

  const list = mapToListWithId(map)

  return { list, map }
}
