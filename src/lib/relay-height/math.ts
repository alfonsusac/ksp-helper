export function getMinimumRelayHeight(
  planetRadius: number,
  relayCount: number,
) {
  // N number of satellite relay is orbiting a planet with radius R
  // with equal distance to each other

  // Minimum height is when the line betwee one relay to adjacent
  // relay touches the planet's sruface, forming a 90degree point
  // to the center of the planet.

  // Therefore, we can use CAH to find height of relay given this
  // setup.

  // cos(<theta>) = <adj> / <hyp>

  // <theta> is the angle between [relay to center of planet] and
  // [ center of planet ] to 90deg. This is half of the angle
  // between two adjacent relay to the  center of the planet,
  // which is just 360/N. Therefore, theta is 360/2N or 180/N

  // <adj> is line from center of plane to the surface where
  // a straight line connecting two adjacent relay meets. Which
  // is just the radius R of the planet.

  // <hyp> is line from center of planet to a relay. Therefore it
  // is (h + r) where h is minimum height

  // cos(theta) = r / ( h + r )
  // cos(theta)(h + r) = r
  // h.cos(theta) + r.cos(theta) = r
  // h.cos(theta) = r - r.cos(theta)
  // h = r(1 - cost(theta))/(cos(theta))
  // h = r( (1/cos(theta)) - 1)
  // h = r( (1/cos( 180/n )) - 1 )

  const r = planetRadius
  const n = relayCount
  const cos = Math.cos
  const PI = Math.PI

  return r * ((1 / cos(PI / n)) - 1)
}


export function getMaximumRelayHeightRelativeToVessel(
  relayCount: number,
  maxAntennaRangeToVessel: number,
  planetRadius: number,
) {
  // Same as above, (n) number of equally spaced relay is orbiting 
  // a planet of radius(r) at certain height (h).

  // A vessel is landed on the surface of the planet in which its
  // position is furthest apart between two relays. Therefore
  // this vessel is in the "mid-point" of two adjacent relays but
  // on the surface of the planet.

  // We can use the cosine rule to determine the maximum height
  // because we know lenght of two sides and one of the angle

  // c^2 = a^2 + b^2 - 2abcos(C)
  // Where C is angle between vessel, to center of planet, to the
  // relay satellite. Same as above its 180/n
  // Where a is planet's radius (r)
  // Where b is planet's radius (r) + the maximum height (h)
  // Where c is the desired distance from vessel to satellite (d)

  // Solve for h
  // d^2 = r^2 + (r + h)^2 - 2 (r) (r + h) cos (theta))
  // 0 = r^2 - d^2 + r^2 + 2rh + h^2 - 2cos(theta)r^2 - 2rhcos(theta)
  // 0 = 2r^2 - d^2 - 2cos(theta)r^2 + 2rh + 2rhcos(theta) + h^2
  // 0 = (2r^2 - d^2 - 2cos(theta)r^2) + h(2r + 2rcos(theta)) + h^2
  // Use quadratic formula:
  // x = (-b +- sqrt(b^2 - 4ac))/2a
  // where a = 1,
  //       b = 2r - 2rcos(theta)
  //       c = 2r^2(1-cos(theta)) - d^2

  const sqrt = Math.sqrt
  const cos = Math.cos
  const PI = Math.PI

  function qdrt(a: number, b: number, c: number) {
    if (a === 0) throw new Error("Not a quadratic equation")
    const d = b * b - 4 * a * c
    if (d < 0) return [ NaN, NaN ] // or throw, or return null
    const root = sqrt(d)
    const den = 2 * a
    return [ (-b + root) / den, (-b - root) / den ]
  }

  const r = planetRadius
  const d = maxAntennaRangeToVessel
  const theta = PI / relayCount

  const res = qdrt(
    1,
    2 * r - 2 * r * cos(theta),
    2 * r * r * (1 - cos(theta)) - d * d
  )

  return Math.max(...res)

}




export function getMaximumRelayHeightRelativeToEachOther(
  relayCount: number,
  maxAntennaRange: number,
  planetRadius: number,
) {
  // Equally spaced relay network.

  // sin(theta) = 0.5d / (h + r)
  // (h + r) = 0.5d / sin(theta)
  // h = 0.5d / sin(theta) - r
  // h = 0.5d / sin(pi/n) - r (well.. or just the chord-length formula)

  const d = maxAntennaRange
  const r = planetRadius
  const n = relayCount
  const sin = Math.sin
  const PI = Math.PI

  return ((0.5 * d) / sin(PI / n)) - r
}


export function lawOfCosineFindSide(
  a: number,
  theta: number,
  b: number
) {
  const { pow, sqrt, cos } = Math
  return sqrt(pow(a, 2) + pow(b, 2) - 2 * (a) * (b) * cos(theta))
}

export function lawOfCosineFindAngle(
  a: number,
  b: number,
  c: number,
) {
  const { acos, pow } = Math
  return acos((pow(a, 2) + pow(b, 2) - pow(c, 2)) / (2 * a * b))
}

export function mid(
  a: number,
  b: number
) {
  return (a + b) / 2
}


export function getPeriodFromRadius(radius: number, gravitationalParameter: number) {
  const res = 2 * Math.PI * Math.sqrt((radius ** 3) / gravitationalParameter)
  return res
}


// Assuming single tangential orbit from a circular orbit of radius r0
export function getResonantOrbit(
  radius: number,
  gravitationalParameter: number,
  relayCount: number,
  mode: "diving" | "peaking" = "peaking"
) {
  const period = getPeriodFromRadius(radius, gravitationalParameter)
  const divingPeriod = period * (relayCount - 1) / relayCount
  const peakingPeriod = period * (relayCount + 1) / relayCount
  const resonantPeriod = mode === "diving" ? divingPeriod : peakingPeriod

  const semiMajorAxis = Math.cbrt(
    gravitationalParameter * (
      resonantPeriod / (2 * Math.PI)
    ) ** 2
  )
  const semiMinorAxis = Math.sqrt(
    radius * (2 * semiMajorAxis - radius)
  )
  const focusOffset = Math.abs(semiMajorAxis - radius)
  const otherApsisRadius = 2 * semiMajorAxis - radius
  const apsisLabel = otherApsisRadius < radius ? "Periapsis" : "Apoapsis" 


  const circularVelocity = Math.sqrt(gravitationalParameter / radius)
  const resonantVelocity = Math.sqrt(gravitationalParameter * (2 / radius - 1 / semiMajorAxis))
  const injectioDeltaV = Math.abs(resonantVelocity - circularVelocity)

  return {
    period,
    semiMinorAxis,
    semiMajorAxis,
    focusOffset,
    resonantPeriod,
    otherApsisRadius,
    injectioDeltaV,
    mode,
    apsisLabel,
  }
}
