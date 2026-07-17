import { antennaData, antennaTypes, kscDSNdata, type AntennaTypes } from "@/constants"

export type AntennaPayload = Record<AntennaTypes, number>

export type BodyPayload = {
  type: "ksc"
  level: "1" | "2" | "3"
} | {
  type: "ship"
  hasCommandModule: boolean,
  antennae: AntennaPayload
}

export function getMaximumRange(opts: {
  body1: BodyPayload,
  body2: BodyPayload,
}) {
  const ship1directOnly = isShipOnlyHaveDirectAntenna(opts.body1)
  const ship2directOnly = isShipOnlyHaveDirectAntenna(opts.body2)
  if (ship1directOnly && ship2directOnly) return 0



  const body1rating = getPowerPowerRating(opts.body1)
  const body2rating = getPowerPowerRating(opts.body2)
  const rating = Math.sqrt(body1rating * body2rating)
  return rating
}





export function getPowerPowerRating(input: BodyPayload) {
  if (input.type === "ksc")
    return kscDSNdata[ input.level ].rating

  if (input.type === "ship") {


    const sumPower = antennaTypes.reduce((acc, curr) => {
      acc += antennaData[ curr ].rating * input.antennae[ curr ]
      return acc
    }, 0)

    const avgCombinabilityExponent = antennaTypes.reduce((acc, curr) => {
      const hasAntenna = input.antennae[ curr ] > 0
      if (!hasAntenna) return acc
      acc += (antennaData[ curr ].rating * antennaData[ curr ].combinabilityExponent * input.antennae[ curr ]) / sumPower
      return acc
    }, 0)


    const strongestPower = antennaTypes.reduce((acc, curr) => {
      const hasAntenna = input.antennae[ curr ] > 0
      if (!hasAntenna) return acc
      if (antennaData[ curr ].rating > acc) {
        acc = antennaData[ curr ].rating
      }
      return acc
    }, 0)

    console.log("sumOfAntennaRatings", sumPower)
    console.log("averageCombinabilityExponent", avgCombinabilityExponent)
    console.log("strongestAntennaPower", strongestPower)

    const combinedCombineablePowerRatings = strongestPower * Math.pow((sumPower / strongestPower), avgCombinabilityExponent)

    if (!combinedCombineablePowerRatings) {
      console.log(input.hasCommandModule)
      if (input.hasCommandModule) return 5_000
      else return 0
    }

    console.log("power rating", combinedCombineablePowerRatings)
    return combinedCombineablePowerRatings
  }
  throw 0
}



export function isShipOnlyHaveDirectAntenna(input: BodyPayload) {
  if (input.type === "ksc") return false

  let directAntennaeCount = 0
  let relayAntennaeCount = 0

  antennaTypes.map(type => {
    const count = input.antennae[ type ]
    if (count < 1) return
    if (antennaData[ type ].type === "direct") directAntennaeCount += 1
    if (antennaData[ type ].type === "relay") relayAntennaeCount += 1
  })
  console.log(directAntennaeCount, relayAntennaeCount)

  if (relayAntennaeCount === 0) return true

  return false
}
