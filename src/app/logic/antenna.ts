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
  const body1rating = getVesselPowerRating(opts.body1)
  const body2rating = getVesselPowerRating(opts.body2)
  const rating = Math.sqrt(body1rating * body2rating)
  return rating
}





export function getVesselPowerRating(input: BodyPayload) {
  if (input.type === "ksc")
    return kscDSNdata[ input.level ].rating
  if (input.type === "ship") {
    const sumOfAntennaRatings = antennaTypes.reduce((acc, curr) => {
      acc += antennaData[ curr ].rating * input.antennae[ curr ]
      return acc
    }, 0)
    console.log("sumOfAntennaRatings", sumOfAntennaRatings)

    const averageCombinabilityExponent = antennaTypes.reduce((acc, curr) => {
      const hasAntenna = input.antennae[ curr ] > 0
      if (!hasAntenna) return acc
      acc += (antennaData[ curr ].rating * antennaData[ curr ].combinabilityExponent * input.antennae[ curr ]) / sumOfAntennaRatings
      return acc
    }, 0)

    console.log("averageCombinabilityExponent", averageCombinabilityExponent)

    const strongestAntennaPower = antennaTypes.reduce((acc, curr) => {
      const hasAntenna = input.antennae[ curr ] > 0
      if (!hasAntenna) return acc
      if (antennaData[ curr ].rating > acc) {
        acc = antennaData[ curr ].rating
      }
      return acc
    }, 0)

    console.log("strongestAntennaPower", strongestAntennaPower)

    const combinedCombineablePowerRatings = strongestAntennaPower * Math.pow((sumOfAntennaRatings / strongestAntennaPower), averageCombinabilityExponent)

    if (!combinedCombineablePowerRatings) {
      console.log(input.hasCommandModule)
      if (input.hasCommandModule) return 5_000
      else return 0
    }
    return combinedCombineablePowerRatings
  }
  throw 0
}
