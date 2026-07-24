"use client"

import { cns } from "@/design-system"
import { getDistance, getMaximumRange, type AntennaPayload } from "@/lib/antenna"
import { getData, type AntennaData, type PlanetData, type PlanetItemData } from "@/lib/packages"
import { prettyNum } from "@/lib/prettier"
import { initialData, type RelayHeightData } from "@/lib/relay-height/app-state"
import { getMaximumRelayHeightRelativeToEachOther, getMinimumRelayHeight, lawOfCosineFindAngle, lawOfCosineFindSide } from "@/lib/relay-height/math"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { cn } from "@/ui/cn"
import { HomeButton } from "@/ui/common"
import { EmojioneSatellite, FluentEmojiRocket } from "@/ui/icons"
import { Slider } from "@/ui/input"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { Fragment, useState, type ReactNode } from "react"

export default function RelayHeight() {

  const [ data, setData ] = useState<RelayHeightData>(initialData)
  const { antennas, planets } = getData(data.settings.contents)

  function changePlanet(planet: string) {
    data.planet = planet
    setData({ ...data })
  }
  function changeVesselAntenna(a: AntennaPayload) {
    data.vessel = a
    setData({ ...data })
  }
  function changeRelayAntenna(a: AntennaPayload) {
    data.relay = a
    setData({ ...data })
  }
  function changeRelayCount(n: number) {
    data.relayCount = n
    setData({ ...data })
  }
  function changeTargetStrength(str: number) {
    data.strength = str
    setData({ ...data })
  }

  const result = getResult(data, antennas, planets)


  return (
    <div className={cns.page("max-w-240")}>

      <HomeButton />

      <header>
        <h1 className={cns.pageTitle()}>
          KSP Calculator: Ideal Relay Height
        </h1>
        <div className={cns.pageDescription()}>
          Find the ideal relay height given antenna requirement and celestial body
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-[10rem_auto] md:grid-cols-[16rem_auto] gap-8 pt-8 ">

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Celestial Body</label>
            <PlanetSelectMenu
              value={data.planet}
              onValueChange={changePlanet}
              planetData={planets}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Relay Antenna</label>
            <AntennaInput
              value={data.relay}
              onChange={changeRelayAntenna}
              antennas={antennas}
              className="flex flex-col"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Relay Count</label>
            <div className="flex gap-2 items-center w-full gap-4">
              <Slider
                className="max-w-60 w-full"
                min={3} max={16} step={1}
                value={data.relayCount}
                onValueChange={changeRelayCount}
              />
              {data.relayCount}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Target Signal Strength</label>
            <div className="flex gap-2 items-center w-full gap-4">
              <Slider
                className="max-w-60 w-full"
                min={0} max={1} step={0.01}
                value={data.strength}
                onValueChange={changeTargetStrength}
              />
              <div className="shrink-0 w-8">
                {data.strength}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Surface Vessel Antenna</label>
            <AntennaInput
              value={data.vessel}
              onChange={changeVesselAntenna}
              antennas={antennas}
            />
          </div>




        </div>

        <div className="flex flex-col gap-8">
          <Visualization {...result} />
          <ResultInfo {...result} />
        </div>


      </section>
    </div>
  )
}

function getResult(
  data: RelayHeightData,
  antennas: AntennaData,
  planets: PlanetData,
) {
  const planet = planets.map.get(data.planet)
  if (!planet) return {
    status: "no planet data" as const
  }

  const planetRadius = planet.radius ?? 0
  const atmHeight = planet.atmHeight ?? 0
  const soiHeight = planet.soi ?? 0
  const relayCount = data.relayCount
  const maxRelayRange = getMaximumRange({
    body1: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    body2: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    antennaData: antennas,
    dsnModifier: parseInt(data.settings.dsnModifier),
    rangeModifier: parseInt(data.settings.rangeModifier),
  }).value
  const maxHeightFromRelays = getMaximumRelayHeightRelativeToEachOther(
    data.relayCount,
    getDistance(maxRelayRange, data.strength),
    planetRadius
  )
  const minHeightFromPlanet = getMinimumRelayHeight(planetRadius, relayCount)
  const minRadius = Math.max(planetRadius + atmHeight, minHeightFromPlanet + planetRadius)
  const maxRadius = Math.min(maxHeightFromRelays)
  const midRadius = (minRadius + maxRadius) / 2

  return {
    status: "ok" as const,
    maxRelayRange,
    maxHeightFromRelays,
    minHeightFromPlanet,
    planetRadius,
    soiHeight,
    maxRadius,
    minRadius,
    atmHeight,
    midRadius,
    relayCount,
  }
}

function ResultInfo(props: ReturnType<typeof getResult>) {

  if (props.status === "no planet data") return <></>

  return <div className="flex flex-col gap-2">
    <div>
      <p className={cns.text.muted()}>Planet Radius</p>
      <p className="">{props.planetRadius ? prettyNum(props.planetRadius) : "-"}</p>
    </div>

    <div>
      <p className={cns.text.muted()}>Minimum Height</p>
      <p className="">{prettyNum(props.minHeightFromPlanet)}</p>
    </div>

    <div>
      <p className={cns.text.muted()}>Maximum Relay Range</p>
      <p className="">{prettyNum(props.maxRelayRange)}</p>
    </div>

    <div>
      <p className={cns.text.muted()}>Maximum Height based on Relay to Relay</p>
      <p className="">{prettyNum(props.maxHeightFromRelays)}</p>
    </div>
  </div>
}


function Visualization(props: ReturnType<typeof getResult>) {
  if (props.status === "no planet data") return <></>

  const maxViewportScale = Math.max(props.maxHeightFromRelays, props.planetRadius)

  const rocketPos = getSatellitePosition(props.relayCount, 0.5)

  return <div className={cns.card(
    "w-full aspect-square rounded-2xl",
    "bg-zinc-950",
    "grid place-items-center relative",
    "overflow-hidden",
  )}>
    <Circle
      maxHeight={maxViewportScale}
      height={props.soiHeight}
      className="bg-black"
    >
      <div className="absolute text-xs left-1/2 opacity-50">SOI</div>
    </Circle>
    <Circle
      maxHeight={maxViewportScale}
      height={props.maxRadius}
      className="bg-teal-500/25"
    >
      <div className="absolute text-xs left-1/2 text-teal-500/50">MAX</div>
    </Circle>
    <Circle
      maxHeight={maxViewportScale}
      height={props.minRadius}
      className="bg-black"
    >
      <div className="absolute text-xs left-1/2 -translate-y-full text-teal-500/50">MIN</div>
    </Circle>
    <Circle
      maxHeight={maxViewportScale}
      height={props.planetRadius + props.atmHeight}
      className="bg-blue-400/25"
    />
    <Circle
      maxHeight={maxViewportScale}
      height={props.planetRadius}
      className="bg-zinc-400/80"
    >
      <FluentEmojiRocket
        style={{
          left: `${ 50 + (-rocketPos.x * 50) }%`,
          top: `${ 50 + (rocketPos.y * 50) }%`
        }}
        className="-translate-1/2 absolute"
      />
      <div
        style={{
          left: `${ 50 + (-rocketPos.x * 50) }%`,
          top: `${ 50 + (rocketPos.y * 50) }%`,
          transformOrigin: '0 0',
          rotate: (() => {
            const a = (props.midRadius) * Math.sin(Math.PI / props.relayCount)
            const b = (props.midRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
            const c = Math.atan(b / a)
            return `${ (Math.PI / props.relayCount) - c }rad`
          })(),
          width: (() => {
            const a = (props.midRadius) * Math.sin(Math.PI / props.relayCount)
            const b = (props.midRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
            const c = Math.sqrt(a * a + b * b)
            console.log(c / props.planetRadius * 50)
            return `${ c / props.planetRadius * 50 }%`
          })()
        }}
        className="absolute w-1/2 h-px bg-green-500 transition-transform duration-75"
      >
      </div>
      <div
        style={{
          left: `${ 50 + (-rocketPos.x * 50) }%`,
          top: `${ 50 + (rocketPos.y * 50) }%`,
          transformOrigin: '0 0',
          rotate: (() => {
            const a = (props.midRadius) * Math.sin(Math.PI / props.relayCount)
            const b = (props.midRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
            const c = Math.atan(b / a)
            return `${ (Math.PI / props.relayCount) + c - Math.PI }rad`
          })(),
          width: (() => {
            const a = (props.midRadius) * Math.sin(Math.PI / props.relayCount)
            const b = (props.midRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
            const c = Math.sqrt(a * a + b * b)
            console.log(c / props.planetRadius * 50)
            return `${ c / props.planetRadius * 50 }%`
          })()
        }}
        className="absolute w-1/2 h-px bg-green-500 transition-transform duration-75"
      >
      </div>
    </Circle>
    <Circle
      maxHeight={maxViewportScale}
      height={props.midRadius}
      className="border border-px border-emerald-400/50"
    >
      {Array.from({ length: props.relayCount }, (_, i) => {

        const length = Math.sqrt(2 * 50 * 50 * (1 - Math.cos(2 * Math.PI / props.relayCount)))

        const { x, y } = getSatellitePosition(props.relayCount, i)

        const left = `${ 50 + (-x * 50) }%`
        const top = `${ 50 + (y * 50) }%`

        return <Fragment key={i}>
          <div style={{
            left, top,
            width: `${ length }%`,
            transform: 'translate(0, -50%)',
            transformOrigin: '0 0',
            rotate: `${ Math.PI / props.relayCount + 2 * Math.PI / props.relayCount * i }rad` // lots of trial and error...
          }} className="absolute w-1/2 h-px bg-green-500 transition-all starting:opacity-0">
          </div>


          <div style={{
            left, top,
          }} key={i} className="absolute -translate-1/2 size-2 rounded-full text-red-500 transition-all starting:left-1/2! starting:top-0! grid place-items-center">
            <EmojioneSatellite className="absolute" />
            {i === 1 &&
              <div className="absolute text-nowrap text-white bottom-2 left-2 text-xs">
                Alt: {prettyNum(props.midRadius)}
                MID
              </div>
            }
          </div>
        </Fragment>
      })}
    </Circle>

  </div>
}



function getSatellitePosition(relayCount: number, i: number) {
  const x = Math.cos(2 * Math.PI / relayCount * i + Math.PI / 2)
  const y = -Math.sin(2 * Math.PI / relayCount * i + Math.PI / 2)
  return { x, y }
}


function Circle(props: {
  maxHeight: number,
  height: number
  className: string,
  children?: ReactNode,
}) {
  const heightPercent = (props.height / props.maxHeight * 80) + '%'
  return (
    <div style={{ width: heightPercent }} className={cn("absolute aspect-square rounded-full transition-all", props.className)} >
      {props.children}
    </div>
  )
}

