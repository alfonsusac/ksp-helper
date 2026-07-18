import { outerplanets } from "../packages/outer-planets-mod"
import { stock } from "../packages/stock"
import type { BaseAntennaData } from "../packages/types"
import { symmetrizePlanetDistanceMap } from "./distance"

export const packages = {
  stock,
  outerplanets
} as const

export const packageNames = Object.keys(packages)
export type PackageNames = keyof typeof packages


// Parsed
export type ParsedAntennas = Record<string, BaseAntennaData>
export type ParsedPlanetDistancedStrengthsType = Record<string, {
  image?: string,
  package: string,
  to: Record<string, { min: number, max: number } | null>
}>

export function getData(option: Record<PackageNames, boolean>) {
  const antennas = getAntennas(option)
  const planets = getPlanets(option)
  return { antennas, planets }
}

function getAntennas(option: Record<PackageNames, boolean>) {
  const antennas: ParsedAntennas = {}

  Object.entries(packages).forEach(([ name, pack ]) => {
    if (!option[ name as PackageNames ]) return

    Object.entries(pack.antennas ?? {}).forEach(([ satName, sat ]) => {
      antennas[ satName ] = sat
    })

  })

  return antennas
}

function getPlanets(option: Record<PackageNames, boolean>) {
  const planetData: ParsedPlanetDistancedStrengthsType = {}

  Object.entries(packages).forEach(([ pkName, pack ]) => {
    if (!option[ pkName as PackageNames ]) return

    Object.entries(pack.planets ?? {}).forEach(([ planetName, planet ]) => {

      planetData[ planetName ] = {
        package: pkName,
        to: planet.distanceToPlanets,
        image: planet.image
      }
    })

  })

  const symmetrized = symmetrizePlanetDistanceMap(planetData)

  Object.entries(symmetrized).forEach(([ fromName, fromPlanet ]) => {
    if (fromPlanet === null) return
    if (fromName in planetData === false) return
    planetData[ fromName ].to = fromPlanet
  })

  return planetData
}
