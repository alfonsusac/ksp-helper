const durationUnits = [ 'ms', 's' ] as const
type DurationUnit = typeof durationUnits[ number ]
type Duration = `${ number }${ DurationUnit }` | number
type Range = [ start: number, end: number ]
function range(start: number, end: number): Range { return [ start, end ] }
function dts(v: Duration) {
  if (typeof v === "number") return v
  if (v.endsWith('ms')) return parseInt(v.split('ms')[ 0 ]) * 1000
  if (v.endsWith('s')) return parseInt(v.split('s')[ 0 ])
  return NaN
}


function getNewPercent(percentage: number, [ start, end ]: Range) {
  return (percentage - start) / (end - start)
}

export function lerp(range: [ min: number, max: number ], easing?: (t: number) => number) {

  const easingFn = easing ? easing : (t: number) => t

  return (t: number) => {
    const u = range[ 0 ] + ((range[ 1 ]) - (range[ 0 ])) * easingFn(t)
    return u
  }
}

export function step<T>(range: [ min: T, max: T ], cutoff: number = 0.5) {
  return (t: number) => t < cutoff ? range[ 0 ] : range[ 1 ]
}
export function constant<T>(val: T) {
  return () => val
}

export function startStop(percentage: number, startStop: [ start: Duration, stop: Duration ], cb: (t: number) => number) {
  const start = dts(startStop[ 0 ])
  const stop = dts(startStop[ 1 ])
  if (percentage < start) return cb(0)
  if (percentage > stop) return cb(1)
  return cb(getNewPercent(percentage, range(start, stop)))
}

export function interp(fn: (t: number) => number) {
  return (t: number) => fn(t)
}

type SequencerItem = { range: Range, fn: InterpolatorFn }

export function sequencer(
  sequence: SequencerItem[]
) {
  return (t: number) => {
    let firstRange: Range = range(Infinity, Infinity)
    let firstFn: ((t: number) => number) | null = null
    let lastRange: Range = range(0, 0)
    let lastFn: ((t: number) => number) | null = null
    for (const i of sequence) {
      if (i.fn === undefined) continue
      const [ start, end ] = i.range
      if (t <= end && t > start) {
        return i.fn(getNewPercent(t, i.range))
      }
      if (end < t && end > lastRange[ 1 ]) {
        lastRange = i.range
        lastFn = i.fn
      }
      if (start < firstRange[ 0 ]) {
        firstRange = i.range
        firstFn = i.fn
      }
    }
    if (lastFn)
      return lastFn(getNewPercent(lastRange[ 1 ], lastRange))
    if (firstFn)
      return firstFn(getNewPercent(firstRange[ 0 ], firstRange))
    return 0
  }
}


// https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never

export type InterpolatorFn<T = number> = ((t: number) => T) | undefined

type PropShape = {
  [ P in string ]:
  | InterpolatorFn<any>
  // | PropShape
  // | Array<InterpolatorFn>
  // | Array<PropShape>
}

export function multiSequencer<T extends PropShape>(sequence: {
  range: Range,
  props: DeepPartial<T>,
}[]) {
  let maxRange = 0
  type MultiSequencerItem = { range: Range, fn: InterpolatorFn }
  const sequencerItemPropMap: Record<string, MultiSequencerItem[]> = {}
  for (const seq of sequence) {
    const props = seq.props
    const range = seq.range
    if (range[ 1 ] > maxRange)
      maxRange = range[ 1 ]

    for (const propsKey in props) {
      const val = props[ propsKey ] as InterpolatorFn
      (sequencerItemPropMap[ propsKey ] ??= []).push({ range, fn: val })
    }
  }
  return {
    duration: maxRange,
    fn: (t: number) => {
      t = Math.round(t * 10000) / 10000

      const resolvedItems: Record<string, number> = {}
      for (const siKey in sequencerItemPropMap) {
        const sequencerItems = sequencerItemPropMap[ siKey ]
        resolvedItems[ siKey ] = sequencer(sequencerItems)(t)
      }
      return resolvedItems as {
        [ key in keyof T ]: number
      }

    }
  }

}

export function slideshowSequencer<T extends PropShape>(slides: ({
  duration: number,
  props: DeepPartial<T>,
} | undefined)[]) {
  const stepToTimemark: Record<number, number> = {}
  stepToTimemark[ 0 ] = 0
  const multiSequencerItem: Parameters<typeof multiSequencer<T>>[ 0 ] = []
  let currTime = 0
  const fslides = slides.filter(Boolean) as {
    duration: number,
    props: DeepPartial<T>,
  }[]
  for (let i = 0; i < fslides.length; i++) {
    const slide = fslides[ i ]
    let startTime = currTime
    let endTime = currTime + slide.duration

    multiSequencerItem.push(
      { range: [ startTime, endTime ], props: slide.props }
    )
    stepToTimemark[ i + 1 ] = endTime
    currTime = startTime + slide.duration
  }

  const s = multiSequencer<T>(multiSequencerItem)

  return {
    slideLength: fslides.length,
    stepToTimemark,
    totalDuration: s.duration,
    fn: s.fn,
  }
}


export function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}
export function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}
export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
export function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2
}
export function easeOutBack(x: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}


import BezierEasing from 'bezier-easing'

export function bezier(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
) {
  // return (t: number) => t
  return BezierEasing(x1, y1, x2, y2)
}


// // https://stackoverflow.com/questions/61132262/typescript-deep-partial
type DeepPartial<T> = T extends object ? {
  [ P in keyof T ]?: DeepPartial<T[ P ]>
} : T