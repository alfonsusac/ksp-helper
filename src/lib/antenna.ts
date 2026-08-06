import { kscDSNdata, signalStrengthToScienceBonusLookupMap } from "@/constants"
import type { AntennaData } from "./get-data"

export type AntennaPayload = Map<string, number>

export type BodyPayload = {
  type: "ksc"
  level: "1" | "2" | "3"
} | {
  type: "ship"
  hasCommandModule: boolean,
  antennas: AntennaPayload,
  isRelay: boolean,
}

export function getMaximumRange(opts: {
  body1: BodyPayload,
  body2: BodyPayload,
  rangeModifier: number,
  dsnModifier: number,
  antennaData: AntennaData
}) {
  if (opts.body1.type === "ship" && opts.body1.isRelay === false && opts.body2.type === "ship" && opts.body2.isRelay === false)
    return {
      value: 0,
      zeroReason: "Two direct ship can't connect to each other. One of the ship needs to be a relay."
    }

  const mode = opts.body1.type === "ksc" ? "direct" : "relay"

  const body1rating = getPowerPowerRating(opts.body1, opts.dsnModifier, opts.antennaData)
  const body2rating = getPowerPowerRating(opts.body2, opts.dsnModifier, opts.antennaData)
  const maxRange = Math.sqrt(body1rating * body2rating)
  return {
    value: maxRange * opts.rangeModifier
  }
}


export function getStrength(maxRange: number, distance: number) {
  if (distance > maxRange) return 0
  const relativeDistanceBetweenVessels = 1 - (distance / maxRange)
  const x = relativeDistanceBetweenVessels
  const pow = Math.pow
  const strength = -2 * pow(x, 3) + 3 * pow(x, 2)
  return strength
}

export function getDistance(maxRange: number, strength: number) {
  if (strength <= 0) return maxRange
  if (strength >= 1) return 0
  const sin = Math.sin
  const asin = Math.asin
  return maxRange * (0.5 + sin(asin(1 - 2 * strength) / 3))
}



export function getPowerPowerRating(
  input: BodyPayload,
  dsnModifier: number,
  antennaData: AntennaData
) {
  if (input.type === "ksc")
    return kscDSNdata[ input.level ].rating * dsnModifier

  if (input.type === "ship") {
    const sumPower = antennaData.reduce((acc, antenna) => {
      if (input.isRelay && antenna.type === "direct") return acc
      const qty = input.antennas.get(antenna.id) ?? 0
      acc += antenna.rating * qty
      return acc
    }, 0)

    const avgCombinabilityExponent = antennaData.reduce((acc, antenna) => {
      if (input.isRelay && antenna.type === "direct") return acc
      const qty = input.antennas.get(antenna.id) ?? 0
      const hasAntenna = qty > 0
      if (!hasAntenna) return acc
      acc += (antenna.rating * antenna.combinabilityExponent * qty) / sumPower
      return acc
    }, 0)


    const strongestPower = antennaData.reduce((acc, antenna) => {
      if (input.isRelay && antenna.type === "direct") return acc
      const qty = input.antennas.get(antenna.id) ?? 0
      const hasAntenna = qty > 0
      if (!hasAntenna) return acc
      if (antenna.rating > acc) {
        acc = antenna.rating
      }
      return acc
    }, 0)

    // console.log("sumOfAntennaRatings", sumPower)
    // console.log("averageCombinabilityExponent", avgCombinabilityExponent)
    // console.log("strongestAntennaPower", strongestPower)

    const combinedCombineablePowerRatings = strongestPower * Math.pow((sumPower / strongestPower), avgCombinabilityExponent)

    if (!combinedCombineablePowerRatings && !input.isRelay) {
      // console.log(input.hasCommandModule)
      if (input.hasCommandModule) return 5_000
      else return 0
    }

    // console.log("power rating", combinedCombineablePowerRatings)
    return combinedCombineablePowerRatings
  }
  throw 0
}

// export function isShipOnlyHaveDirectAntenna(
//   input: BodyPayload,
//   antennaData: AntennaData
// ) {
//   if (input.type === "ksc") return false

//   let directAntennaeCount = 0
//   let relayAntennaeCount = 0

//   antennaData.map(antenna => {
//     const count = input.antennas.get(antenna.id) ?? 0
//     if (count < 1) return
//     if (antenna.type === "direct") directAntennaeCount += 1
//     if (antenna.type === "relay") relayAntennaeCount += 1
//   })
//   // console.log(directAntennaeCount, relayAntennaeCount)

//   if (relayAntennaeCount === 0) return true

//   return false
// }


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

