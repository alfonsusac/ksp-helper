"use client"

import { cns } from "@/design-system"
import { getDistance, getMaximumRange, getStrength, type AntennaPayload } from "@/lib/antenna"
import { getData, type AntennaData, type PlanetData } from "@/lib/packages"
import { prettyNum } from "@/lib/prettier"
import { initialData, type RelayHeightData } from "@/lib/relay-height/app-state"
import { getMaximumRelayHeightRelativeToEachOther, getMinimumRelayHeight } from "@/lib/relay-height/math"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { Divider, HomeButton } from "@/ui/common"
import { IntegerInput, Slider } from "@/ui/input"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { useState } from "react"

export default function RelayHeight() {

  const [ data, setData ] = useState<RelayHeightData>(initialData)
  const { antennas, planets } = getData(data.settings.contents)

  function changePayload(p: RelayHeightData) {
    setData({ ...p })
  }
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


  return (
    <div className={cns.page()}>

      <HomeButton />

      <header>
        <h1 className={cns.pageTitle()}>
          KSP Calculator: Ideal Relay Height
        </h1>
        <div className={cns.pageDescription()}>
          Find the ideal relay height given antenna requirement and celestial body
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <header>
          <h2 className={cns.text.muted("text-sm")}>Inputs</h2>
        </header>

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
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={"text-sm"}>Relay Count</label>
          <div className="flex gap-2 items-center w-full gap-4">
            <Slider
              className="max-w-60 w-full"
              min={1}
              max={8}
              value={data.relayCount}
              onValueChange={changeRelayCount}
              step={1}
            />
            {data.relayCount}
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

      </section>

      <Divider className="my-4" />

      <section className="flex flex-col gap-4">
        <header>
          <h2 className={cns.text.muted("text-sm")}>Result</h2>
        </header>
      </section>

      <Result
        payload={data}
        onPayloadChange={changePayload}
        planets={planets}
        antennas={antennas}
      />



    </div>
  )
}


function Result(props: {
  payload: RelayHeightData,
  onPayloadChange: (p: RelayHeightData) => void,
  planets: PlanetData,
  antennas: AntennaData,
}) {

  const planet = props.planets.map.get(props.payload.planet)
  if (!planet) return <div className={cns.card()}>
    Can't calculate data due to missing planet data.
  </div>

  const radius = planet.radius ?? 0
  const atmHeight = planet.atmHeight ?? 0
  const relayCount = props.payload.relayCount
  const minHeight = getMinimumRelayHeight(radius, relayCount)
  const range = getMaximumRange({
    body1: {
      type: "ship",
      isRelay: true,
      hasCommandModule: true,
      antennas: props.payload.relay,
    },
    body2: {
      type: "ship",
      isRelay: true,
      hasCommandModule: true,
      antennas: props.payload.relay,
    },
    antennaData: props.antennas,
    dsnModifier: parseInt(props.payload.settings.dsnModifier),
    rangeModifier: parseInt(props.payload.settings.rangeModifier),
  })
  const maxHeightFromRelays = getMaximumRelayHeightRelativeToEachOther(
    relayCount,
    getDistance(range.value, 0.99),
    radius
  )

  const getMaxHeightRatio = (h: number) => h / maxHeightFromRelays
  const getPercentRelativeToMaxHeight = (height: number) => (getMaxHeightRatio(height) * 80) + '%'
  const minHeightCSS = getPercentRelativeToMaxHeight(minHeight + radius)
  const planetCSS = getPercentRelativeToMaxHeight(radius)
  const planetAtmCSS = getPercentRelativeToMaxHeight(radius + atmHeight)

  const midHeight = (minHeight + maxHeightFromRelays) / 2
  const midCSS = getPercentRelativeToMaxHeight((minHeight + radius + maxHeightFromRelays) / 2)



  return <div className="flex flex-col sm:flex-row gap-x-4 gap-y-8">

    <div className="flex flex-col gap-2">
      <div>
        <p className={cns.text.muted()}>Planet Radius</p>
        <p className="">{radius ? prettyNum(radius) : "-"}</p>
      </div>

      <div>
        <p className={cns.text.muted()}>Minimum Height</p>
        <p className="">{prettyNum(minHeight)}</p>
      </div>

      <div>
        <p className={cns.text.muted()}>Maximum Relay Range</p>
        <p className="">{prettyNum(range.value)}</p>
      </div>

      <div>
        <p className={cns.text.muted()}>Maximum Height based on Relay to Relay</p>
        <p className="">{prettyNum(maxHeightFromRelays)}</p>
      </div>
    </div>

    <div className={cns.card(
      "w-full aspect-square rounded-2xl",
      "bg-black",
      "grid place-items-center relative",
      "overflow-hidden",
    )}>

      {/* Max Height Circle */}
      <div style={{ width: getPercentRelativeToMaxHeight(maxHeightFromRelays) }} className="absolute bg-teal-500/25 aspect-square rounded-full transition-all" />
      {/* Min Height Circle */}
      <div style={{ width: minHeightCSS }} className="absolute bg-black aspect-square rounded-full transition-all" />

      {/* Planet Atmosphere Circle */}
      <div style={{ width: planetAtmCSS }} className="absolute bg-blue-400/20 aspect-square rounded-full transition-all" />
      {/* Planet Height Circle */}
      <div style={{ width: planetCSS }} className="absolute bg-zinc-400/80 aspect-square rounded-full transition-all" />

      {/* Midpoint Height Circle */}
      <div style={{ width: midCSS }} className="absolute border border-emerald-400/50 aspect-square rounded-full transition-all">

        {Array.from({ length: relayCount }, (_, i) => {
          const { x, y } = getSatellitePosition(relayCount, i)
          return <div style={{
            left: `${ 50 + (x * 50) }%`,
            top: `${ 50 + (y * 50) }%`,
            transform: 'translate(-50%, -50%)',
          }} key={i} className="absolute size-2 bg-emerald-400 rounded-full text-red-500 transition-all starting:left-1/2! starting:top-0!">
            {i === 0 &&
              <div className="absolute text-nowrap text-white bottom-2 left-2 text-xs">
                alt: {prettyNum(midHeight)}
              </div>
            }
          </div>
        })}

        {Array.from({ length: relayCount }, (_, i) => {

          const length = Math.sqrt(2 * 50 * 50 * (1 - Math.cos(2 * Math.PI / relayCount)))

          const { x, y } = getSatellitePosition(relayCount, i)
          return <div style={{
            left: `${ 50 + (x * 50) }%`,
            top: `${ 50 + (y * 50) }%`,
            width: `${ length }%`,
            transform: 'translate(0, -50%)',
            transformOrigin: '0 0',
            rotate: `${ Math.PI / relayCount - 2 *Math.PI / relayCount * i }rad` // lots of trial and error...
          }} key={i} className="absolute w-1/2 h-px bg-green-500 transition-all starting:opacity-0">
          </div>
        })}

      </div>
    </div>

  </div>
}



function getSatellitePosition(relayCount: number, i: number) {
  const x = Math.cos(2 * Math.PI / relayCount * i + Math.PI / 2)
  const y = -Math.sin(2 * Math.PI / relayCount * i + Math.PI / 2)
  return { x, y }
}