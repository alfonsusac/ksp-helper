import { commnetAntennasExtension } from "@/packages/commnet-antennas-ext"
import { outerplanets } from "../packages/outer-planets-mod"
import { stock } from "../packages/stock"
import type { AntennaDefinition, DistanceRange } from "../packages/_types"
import { symmetrizePlanetDistanceMap } from "./distance"
import { mapToListWithId } from "./object"
import { restockplus } from "@/packages/restock-plus"
import { dmagic } from "@/packages/dmagic"
import { probesplus } from "@/packages/probesplus"
import { jsx2antenna } from "@/packages/jx2antenna"
import { venssr } from "@/packages/venssr"
import { nearfutureexpansion } from "@/packages/near-future-exploration"
import { realSolarSystem } from "@/packages/rss"
import { kcalbeloh } from "@/packages/kcalbeloh"
import { gpp } from "@/packages/gpp"
import type { GlobalSettings } from "@/ui/settings-section"

export const packages = {
  stock,
  outerplanets,
  restockplus,
  commnetAntennasExtension,
  dmagic,
  venssr,
  jsx2antenna,
  probesplus,
  nearfutureexpansion,
  realSolarSystem,
  kcalbeloh,
  gpp,
} as const

export const packageNames = Object.keys(packages)
export type PackageNames = keyof typeof packages

export function getPackageName(id: string) {
  if (id === "Custom") return "Custom"
  if (id in packages === false) return null
  return packages[ id as keyof typeof packages ].name
}

// Parsed
export type AntennaData = ReturnType<typeof getAntennaData>
export type AntennaItemData = AntennaData[ number ]
export type PlanetData = ReturnType<typeof getPlanetData>
export type PlanetItemData = PlanetData[ 'map' ] extends Map<any, infer V> ? V : never

export function getData(option: Record<PackageNames, true | undefined>, settings: GlobalSettings) {
  const antennas = getAntennaData(option, settings)
  const planets = getPlanetData(option, settings)
  return { antennas, planets }
}

// Process Antenna
function getAntennaData(option: Record<PackageNames, true | undefined>, settings: GlobalSettings) {
  const map = new Map<string, AntennaDefinition & { package: string }>()

  Object.entries(packages).forEach(([ packName, pack ]) => {
    if (!option[ packName as PackageNames ]) return
    Object.entries(pack.antennas ?? {}).forEach(([ satName, sat ]) => {
      const id = pack.prefix + '.' + satName
      map.set(id, {
        ...sat,
        package: packName
      })
    })
  })

  settings.customAntennas.forEach(a => {
    map.set(a.label, {
      ...a,
      image: a.image ?? "",
      package: "Custom",
    })
  })

  const list = mapToListWithId(map)

  return list
}

// Process Planet Data
function getPlanetData(option: Record<PackageNames, true | undefined>, settings: GlobalSettings) {

  const map: Map<string, {
    package: string,
    to: Record<string, DistanceRange | null> | undefined,
    image: string | undefined,
    radius: number | undefined,
    soiRadius: number | undefined,
    atmHeight: number | undefined,
    highestPoint: number | undefined,
    imageScale: number | undefined,
    imageX: number | undefined,
    imageY: number | undefined,
    notLandable: boolean | undefined,
    planetGravitationalParameter: number | undefined
  }> = new Map()

  Object.entries(packages).forEach(([ pkName, pack ]) => {
    if (!option[ pkName as PackageNames ]) return
    Object.entries(pack.planets ?? {}).forEach(([ planetName, planet ]) => {

      const soi = (() => {
        if (planet.soiRadius) return planet.soiRadius
        if (planet.soiHeight && planet.radius) return planet.soiHeight + planet.radius
        return undefined
      })()

      map.set(planetName, {
        atmHeight: planet.atmHeight,
        highestPoint: planet.highestPoint,
        image: planet.image,
        imageScale: planet.imageScale,
        imageX: planet.imageX,
        imageY: planet.imageY,
        notLandable: planet.notLandable,
        planetGravitationalParameter: planet.planetGravitationalParameter,
        radius: planet.radius,
        soiRadius: soi,
        
        package: pkName,
        to: planet.distanceToPlanets,
      })
    })
  })

  settings.customPlanets.forEach(p => {
    const soi = p.soiHeight + p.radius
    map.set(p.label, {
      atmHeight: p.atmHeight,
      highestPoint: p.highestPoint,
      image: p.image,
      imageScale: p.imageScale,
      imageX: p.imageX,
      imageY: p.imageY,
      notLandable: false,
      planetGravitationalParameter: undefined,
      radius: p.radius,
      to: {},


      package: "Custom",
      soiRadius: soi,
    })
  })

  const symmetrized = symmetrizePlanetDistanceMap(map)

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
