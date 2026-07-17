import { antennaData, antennaTypes, kscDSNdata, signalStrengthToScienceBonusLookupMap, type AntennaTypes } from "@/constants"

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
  rangeModifier: number,
  dsnModifier: number,
}) {
  const ship1directOnly = isShipOnlyHaveDirectAntenna(opts.body1)
  const ship2directOnly = isShipOnlyHaveDirectAntenna(opts.body2)
  if (ship1directOnly && ship2directOnly) return 0



  const body1rating = getPowerPowerRating(opts.body1, opts.dsnModifier)
  const body2rating = getPowerPowerRating(opts.body2, opts.dsnModifier)
  const maxRange = Math.sqrt(body1rating * body2rating)
  return maxRange * opts.rangeModifier
}


export function getStrength(maxRange: number, distance: number) {
  if (distance > maxRange) return 0
  const relativeDistanceBetweenVessels = 1 - (distance / maxRange)
  const x = relativeDistanceBetweenVessels
  const pow = Math.pow
  const strength = -2 * pow(x, 3) + 3 * pow(x, 2)
  return strength
}



export function getPowerPowerRating(input: BodyPayload, dsnModifier: number) {
  if (input.type === "ksc")
    return kscDSNdata[ input.level ].rating * dsnModifier

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

    // console.log("sumOfAntennaRatings", sumPower)
    // console.log("averageCombinabilityExponent", avgCombinabilityExponent)
    // console.log("strongestAntennaPower", strongestPower)

    const combinedCombineablePowerRatings = strongestPower * Math.pow((sumPower / strongestPower), avgCombinabilityExponent)

    if (!combinedCombineablePowerRatings) {
      console.log(input.hasCommandModule)
      if (input.hasCommandModule) return 5_000
      else return 0
    }

    // console.log("power rating", combinedCombineablePowerRatings)
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
  // console.log(directAntennaeCount, relayAntennaeCount)

  if (relayAntennaeCount === 0) return true

  return false
}


export function getScienceBonusfromSignalStrength(signalStrength: number) {
  if (signalStrength < 0 || signalStrength > 1) return { bonus: 0, bonusPercentage: 0 }
  const x = signalStrength


  // Close approximation (r = 0.9999)
  // For more details: https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8/edit?gid=0#gid=0
  const index = Math.max(0, Math.min(100, Math.round(signalStrength * 100)))
  const bonus = signalStrengthToScienceBonusLookupMap[ index ]
  const bonusPercentage = (bonus / 40)

  return {
    bonus: Math.round(bonus), bonusPercentage
  }
}

