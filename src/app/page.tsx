"use client"

import { useEffect, useState } from "react"
import Slider, { CheckboxRow, SelectRow, TabSelectRow } from "./ui/input"
import { GhostButton } from "./ui/button"
import { antennaData, antennaTypes, kscDSNdata, type AntennaTypes } from "@/constants"
import { getMaximumRange, getPowerPowerRating, isShipOnlyHaveDirectAntenna, type AntennaPayload, type BodyPayload } from "./lib/antenna"
import { prettyNum } from "./lib/prettier"
import { IcBaselineDiscord, LucideArrowUpRight, LucideMinus, LucidePlus, LucideX, MdiGithub } from "./ui/icons"
import { cn } from "./ui/cn"

const defaultProp = {
  level: "1",
  hasCommandModule: true,
  antennae: {
    c16: 1,
    c16s: 0,
    c88: 0,
    cdtsm1: 0,
    chg55: 0,
    hg5: 0,
    ra100: 0,
    ra15: 0,
    ra2: 0,
  }
} as const

export default function Home() {
  const [ data, setData ] = useState<{
    0: BodyPayload
    1: BodyPayload
  }>({
    '0': {
      ...defaultProp,
      type: "ksc",
    },
    '1': {
      ...defaultProp,
      type: "ship",
    },
  })

  const changeBodyType = (which: 0 | 1, type: "ksc" | "ship") => {
    data[ which ].type = type
    setData({ ...data })
  }
  const changeData = (which: 0 | 1, input: BodyPayload) => {
    data[ which ] = input
    setData({ ...data })
  }
  const maximumRange = getMaximumRange({ body1: data[ 0 ], body2: data[ 1 ] })

  const isBothDirectAntenna = (() => {
    if (data[ 0 ].type === "ksc" || data[ 1 ].type === "ksc") return false

    const ship1directOnly = isShipOnlyHaveDirectAntenna(data[ 0 ])
    const ship2directOnly = isShipOnlyHaveDirectAntenna(data[ 1 ])

    if (ship1directOnly && ship2directOnly) return true

    return false
  })()

  return (
    <div className="p-8 font-mono font-medium flex flex-col gap-4 max-w-200 w-screen">

      <header className="">
        <h1 className="text-xl tracking-tight text-slate-700 font-semibold">
          KSP Calculator: Maximum Antenna Range
        </h1>
        <div className="text-sm font-semibold text-slate-400">
          Calculate the maximum antenna range between two bodies
        </div>
      </header>

      <div className="text-sm flex flex-col gap-1">

        <h2 className="text-lg">
          Mode
        </h2>
        <TabSelectRow
          items={[
            { value: "ksc-ship", label: "KSC to Ship" },
            { value: "ship-ship", label: "Ship to Ship" },
          ]}
          value={data[ 0 ].type === "ksc" ? "ksc-ship" : "ship-ship"}
          onValueChange={(v) => {
            if (v === "ksc-ship") {
              changeBodyType(0, "ksc")
              changeBodyType(1, "ship")
            } else {
              changeBodyType(0, "ship")
              changeBodyType(1, "ship")
            }
          }}
        />
      </div>

      <hr className="my-2 border-slate-200" />

      <BodyDetailInput which={0} payload={data[ 0 ]} onChange={(n) => changeData(0, n)} />
      <hr className="my-2 border-slate-200" />
      <BodyDetailInput which={1} payload={data[ 1 ]} onChange={(n) => changeData(1, n)} />
      {/* <hr className="mt-2 border-slate-200" /> */}
      <div className="py-8 bg-background border-t border-slate-200 mt-4">

        {
          isBothDirectAntenna &&
          <div className="text-sm p-2 border border-red-300 rounded-md bg-red-50 mb-8 text-red-600 px-3">
            Warning! <br />
            <div className="text-xs">
              Both ship are only capable of direct conenctions to KSC. Either switch to "KSC to Ship" mode or add a relay antenna on one of the ship.
            </div>
          </div>
        }

        <h2 className="text-lg">
          Result
        </h2>
        <div className="">
          <div className="text-sm text-slate-400">Maximum Antenna Range:</div>
          <div className="text-2xl font-semibold text-slate-700">
            {prettyNum(maximumRange, "k", "m")}
          </div>
          <div className="">
            {maximumRange.toLocaleString() + "m"}
          </div>
          <div className=" text-sm text-slate-400 text-slate-600 mt-4 mb-2">
            Signal Strengths
          </div>
          <div className="text-sm grid grid-cols-[3rem_auto] gap-x-2">
            <div className="text-slate-400 text-end">{'≥'}95.5%</div>
            <div>{prettyNum(maximumRange * 0.0414).toLocaleString() + "m"}</div>
            <div className="text-slate-400 text-end">~90%</div>
            <div>{prettyNum(maximumRange * 0.19580).toLocaleString() + "m"}</div>
            <div className="text-slate-400 text-end">~80%</div>
            <div>{prettyNum(maximumRange * 0.28714).toLocaleString() + "m"}</div>
            <div className="text-slate-400 text-end">~70%</div>
            <div>{prettyNum(maximumRange * 0.36326).toLocaleString() + "m"}</div>
          </div>
          <div className=" text-sm text-slate-600 mt-8 mb-2">
            Strengths by Distance
          </div>
          <DistanceStrengthCalculator
            maximumRange={maximumRange}
          />

        </div>
      </div>

      <hr className="mb-2 border-slate-200" />

      <h2 className="text-lg">
        Settings
      </h2>
      {/* Todo Settings */}

      <hr className="mb-2 border-slate-200" />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm">
          What is this?
        </h2>
        <div className="text-xs max-w-160 text-slate-600">
          Maximum Antenna Range can be used to determine how high your relay orbit should
          be if you want to constraint one type of antenna (as opposed to spamming 88-88 in every ship).
        </div>
        <div className="text-xs max-w-160 text-slate-600">
          It can also be used to calculate the strength of the rating to calculate how many
          percent of science can be transmitted from a vessel.
        </div>
        <h2 className="text-xs">
          Sources
        </h2>
        <ul className="text-slate-600 text-xs list-inside list-disc">
          <li className="">https://wiki.kerbalspaceprogram.com/wiki/CommNet</li>
          <li className="">https://www.youtube.com/watch?v=hVd-WhL4tZ8</li>
        </ul>
      </div>


      <hr className="my-2 border-slate-200" />
      <footer className="text-xs text-slate-500">
        <div>Feedbacks are welcome!</div>
        <br />
        <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://github.com/alfonsusac/ksp-helper">
          Source (github) <MdiGithub /><LucideArrowUpRight />
        </a>
        <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://discord.gg/Br2bf4ar">
          My discord <IcBaselineDiscord /><LucideArrowUpRight />
        </a>
        <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://discord.gg/B9Ns6rCYm">
          r/KerbalSpaceProgram discord <IcBaselineDiscord /><LucideArrowUpRight />
        </a>
      </footer>


    </div>
  )
}


function BodyDetailInput(props: {
  which: 0 | 1,
  payload: BodyPayload,
  onChange: (newpayload: BodyPayload) => void,
}) {

  const changeKSCLevel = (level: "1" | "2" | "3") => {
    if (props.payload.type !== "ksc") return
    props.payload.level = level
    props.onChange({ ...props.payload })
  }

  const changeHasCommandModule = (i: boolean) => {
    if (props.payload.type !== "ship") return
    props.payload.hasCommandModule = i
    props.onChange({ ...props.payload })
  }

  const changeAntennaPayload = (a: AntennaPayload) => {
    if (props.payload.type !== 'ship') return
    props.payload.antennae = a
    props.onChange({ ...props.payload })
  }

  return (
    <div className="flex flex-col gap-3">
      <header>
        <div className="text-slate-400 text-xs">Body {props.which + 1}</div>
        <h2 className="text-lg">
          {props.payload.type === "ksc" ? "KSC" : "Ship"}
        </h2>
        <div className="text-slate-400 text-xs">Power Rating: {prettyNum(getPowerPowerRating(props.payload))}</div>
      </header>
      {
        props.payload.type === "ksc" ?
          <SelectRow
            label="Tracking Station Upgrade Level"
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
            ]}
            onValueChange={changeKSCLevel}
            value={props.payload.level}
          />
          :
          <>
            <CheckboxRow
              label="Has Command Module?"
              value={props.payload.hasCommandModule}
              onValueChange={changeHasCommandModule}
            />
            <AntennaInput
              value={props.payload.antennae}
              onChange={changeAntennaPayload}
            />
          </>
      }
    </div>
  )
}


function AntennaInput(props: {
  value: AntennaPayload,
  onChange: (a: AntennaPayload) => void,
}) {

  const addAntenna = (type: AntennaTypes) => {
    props.value[ type ] += 1
    props.onChange({ ...props.value })
  }

  const removeAntenna = (type: AntennaTypes) => {
    if (props.value[ type ] < 1) return
    props.value[ type ] -= 1
    props.onChange({ ...props.value })
  }

  const clearAntenna = (type: AntennaTypes) => {
    props.value[ type ] = 0
    props.onChange({ ...props.value })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {antennaTypes.map(a => {
        const count = props.value[ a ]
        return (
          <div key={a} className="border border-slate-200 rounded-md p-2 flex gap-2">
            <img
              className="aspect-square object-contain max-w-10"
              src={antennaData[ a ].image}
            />
            <div className="flex flex-col w-full">
              <div className="text-xs">
                {antennaData[ a ].label}
              </div>
              <div className="text-xs text-slate-400">
                {prettyNum(antennaData[ a ].rating)}
              </div>
              <div className="text-xs text-slate-400">
                {(antennaData[ a ].type)}
              </div>
              <div className="flex grid grid-cols-4 place-items-center self-end">
                <GhostButton className={count ? "opacity-100" : "opacity-0 pointer-events-none"} onClick={() => clearAntenna(a)}>
                  <LucideX />
                </GhostButton>
                <GhostButton className={count ? "opacity-100" : "opacity-0 pointer-events-none"} onClick={() => removeAntenna(a)}>
                  <LucideMinus />
                </GhostButton>
                <div className={count ? "opacity-100" : "opacity-0 pointer-events-none"}>{props.value[ a ]}</div>
                <GhostButton onClick={() => addAntenna(a)} className="">
                  <LucidePlus />
                </GhostButton>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

}


function DistanceStrengthCalculator(props: {
  maximumRange: number,
}) {
  const [ distance, setDistance ] = useState(props.maximumRange / 2)

  useEffect(() => {
    if (distance > props.maximumRange)
      setDistance(props.maximumRange)
  }, [ props.maximumRange ])

  const getStrength = (distance: number) => {
    const relativeDistanceBetweenVessels = 1 - (distance / props.maximumRange)
    const x = relativeDistanceBetweenVessels
    const pow = Math.pow
    const strength = -2 * pow(x, 3) + 3 * pow(x, 2)
    return strength
  }

  const signalStrength = getStrength(distance)

  const binCount = 25
  const bins = Array.from({ length: binCount }, (_, i) => {
    const distance = props.maximumRange / binCount * i
    const strength = getStrength(distance)
    return strength
  })

  const getSignalBarColor = (bar: 1 | 2 | 3 | 4) => {
    if (signalStrength < .25) {
      if (bar === 1) return "bg-red-400"
    }
    else if (signalStrength < .5) {
      if (bar === 1) return "bg-orange-400"
      if (bar === 2) return "bg-orange-400"
    }
    else if (signalStrength < .75) {
      if (bar === 1) return "bg-yellow-400"
      if (bar === 2) return "bg-yellow-400"
      if (bar === 3) return "bg-yellow-400"
    }
    else {
      if (bar === 1) return "bg-green-500"
      if (bar === 2) return "bg-green-500"
      if (bar === 3) return "bg-green-500"
      if (bar === 4) return "bg-green-500"
    }
  }

  return (
    <div className="flex gap-2 text-sm items-center pb-10">
      <div className="text-xs text-slate-400 font-normal pt-13 pr-2">Ship</div>

      <div className="h-20 flex flex-col">
        <div className="grow relative flex items-end -mb-3.5">
          {bins.map((str, i) => {
            return (
              <div key={i} className={cn(
                "bg-slate-200",
                str < 0.25 ? "bg-red-200" : str < 0.5 ? "bg-orange-200" : str < 0.75 ? "bg-yellow-200" : "bg-green-200"
              )} style={{
                width: `calc(1 / ${ binCount } * 100%)`,
                height: (str * 100).toFixed(2) + '%',
              }}>

              </div>
            )
          })}
        </div>
        <Slider
          min={0}
          max={props.maximumRange}
          value={distance}
          onValueChange={(e) => setDistance(e)}
          thumbChildren={
            <>
              <div className={cn(
                "size-3 rounded-full border border-slate-400 bg-slate-400 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-neutral-950",
                "active:scale-125",
              )} />
              <div className="mt-2 text-xs flex flex-col items-center w-max absolute left-1/2 -translate-x-1/2">
                <div>{prettyNum(distance)}</div>
                <div>{(signalStrength * 100).toFixed(2) + '%'}</div>
                <div className="grid grid-cols-4 gap-px size-6 items-end">
                  <div className={cn("h-1/4 bg-slate-200", getSignalBarColor(1))}></div>
                  <div className={cn("h-1/2 bg-slate-200", getSignalBarColor(2))}></div>
                  <div className={cn("h-3/4 bg-slate-200", getSignalBarColor(3))}></div>
                  <div className={cn("h-4/4 bg-slate-200", getSignalBarColor(4))}></div>
                </div>
              </div>
            </>
          }
        />
      </div>

      <div className="text-xs text-slate-400 font-normal pt-13 pl-2">Max</div>
    </div >
  )
}