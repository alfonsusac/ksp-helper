"use client"

import { cns } from "@/design-system"
import { getDistance, getMaximumRange, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload } from "@/lib/antenna"
import { getData, type AntennaData, type PlanetData } from "@/lib/packages"
import { prettyNum } from "@/lib/prettier"
import { useRelayHeightAppState, type RelayHeightData } from "@/lib/relay-height/app-state"
import { getMaximumRelayHeightRelativeToEachOther, getMaximumRelayHeightRelativeToVessel, getMinimumRelayHeight, lawOfCosineFindAngle, lawOfCosineFindSide, mid } from "@/lib/relay-height/math"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { ShareAppURLButton } from "@/ui/button"
import { cn } from "@/ui/cn"
import { Divider, HomeButton } from "@/ui/common"
import { Footer } from "@/ui/footer"
import { EmojioneSatellite, FluentEmojiRocket, LucideTriangleAlert } from "@/ui/icons"
import { Slider } from "@/ui/input"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { WhatIsThisSection } from "@/ui/prose"
import { ResetSettingsIconButton, SettingsSection, useGlobalSettings, type GlobalSettings } from "@/ui/settings-section"
import SignalStrengthItems from "@/ui/signal-strength"
import { formatCss, interpolate } from "culori"
import { Fragment, type ReactNode } from "react"

export default function RelayHeight() {

  const [ settings, setSettings ] = useGlobalSettings()
  const [ data, setData ] = useRelayHeightAppState()
  if (!data || !settings) return null

  const { antennas, planets } = getData(settings.contents)

  const changePlanet = (planet: string) => {
    data.planet = planet
    data.orbitRatio = 0.5
    setData({ ...data })
  }
  const changeVesselAntenna = (a: AntennaPayload) => {
    data.vessel = a
    data.orbitRatio = 0.5
    setData({ ...data })
  }
  const changeRelayAntenna = (a: AntennaPayload) => {
    data.relay = a
    data.orbitRatio = 0.5
    setData({ ...data })
  }
  const changeRelayCount = (n: number) => {
    data.relayCount = n
    data.orbitRatio = 0.5
    setData({ ...data })
  }
  const changeTargetStrength = (str: number) => {
    data.strength = str
    data.orbitRatio = 0.5
    setData({ ...data })
  }
  const changeResultOrbitRatio = (r: number) => {
    if (r < 0) r = 0
    if (r > 1) r = 1
    data.orbitRatio = r
    setData({ ...data })
  }

  const result = getResult(data, settings, antennas, planets)

  console.log(result.planetimgscale)

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

        <div className="flex flex-col gap-6">

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
              filter={a => a.type === "relay"}
            />
          </div>

          <div className="flex flex-col gap-0">
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

          <div className="flex flex-col">
            <label className={"text-sm"}>Target Signal Strength</label>

            <div className={"text-sm flex gap-4 items-center mt-1.5"}>
              <SignalStrengthItems
                strength={data.strength}
                size="sm"
              />
            </div>

            <div className="flex gap-2 items-center w-full gap-4">
              <Slider
                className="max-w-60 w-full"
                min={0} max={0.99} step={0.01}
                value={data.strength}
                onValueChange={changeTargetStrength}
              />
              <div className="shrink-0 w-8 text-end">
                {Math.round(data.strength * 100) + '%'}
              </div>
            </div>
            <div className="flex gap-px">
              {[ 0.5, 0.75, 0.9, 0.95 ].map(e => {
                return <button key={e}
                  className={cns.button.presetGroup()}
                  onClick={() => changeTargetStrength(e)}
                >
                  {e * 100}%
                </button>
              })}
            </div>

          </div>

          <div className="flex flex-col gap-1">
            <label className={"text-sm"}>Surface Vessel Antenna</label>
            <AntennaInput
              value={data.vessel}
              onChange={changeVesselAntenna}
              antennas={antennas}
              className="flex flex-col"
            />
          </div>

          <ShareAppURLButton data={data} />

        </div>

        <div className="flex flex-col gap-4">
          <Visualization {...result} />
          <ResultInfo {...result}
            onOrbitRatioChange={changeResultOrbitRatio}
          />
        </div>

      </section>

      <Divider />

      <h2 className="text-lg">
        Settings
      </h2>

      <SettingsSection settings={settings} onSettingsChange={setSettings} />


      <Divider />

      <WhatIsThisSection
        descs={[
          `This calculator helps find the ideal orbit height between relays satellites and vessels 
          that are on the surface of a planet. It calculates the minimum and maximum orbit and
          find the middle orbit.`,
        ]}
        sources={[
          {
            title: "KSP Wiki - CommNet",
            href: "https://wiki.kerbalspaceprogram.com/wiki/CommNet",
          },
          {
            title: "Ranges and Signal Strength | KSP Let's Do The Math",
            author: "Mike Aben",
            href: "https://www.youtube.com/watch?v=hVd-WhL4tZ8",
          },
          {
            title: "The Best Relay Orbit | KSP Let's Do The Math",
            author: "Mike Aben",
            href: "https://www.youtube.com/watch?v=gpQmvwU1x8c&t=3s",
          },
          {
            title: "Science transmission relation to signal strength",
            href: "https://forum.kerbalspaceprogram.com/topic/200317-science-transmission-relation-to-signal-strength",
          },
          {
            title: "Signal Strength vs Science Bonus (Redone)",
            href: "https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8",
          },
          {
            title: "Lowest & Highest Points of Celestial Bodies",
            href: "https://forum.kerbalspaceprogram.com/topic/173446-lowest-highest-points-of-celestial-bodies/",
          },
        ]}
        priorWork={[
          {
            title: "Comnet Planner",
            author: "blaarkies",
            href: "https://ksp-visual-calculator.blaarkies.com/commnet-planner",
          },
          {
            title: "KSP Signal Strength Calculator",
            author: "Westbrooke117",
            href: "https://westbrooke117.github.io/KSPSSC/",
          },
          {
            title: "Resonant Orbit Calculator",
            author: "Eric Meyer",
            href: "https://meyerweb.com/eric/ksp/resonant-orbits/",
          },
        ]}
      />

      <Divider />

      <Footer />

    </div>
  )
}

function getResult(
  data: RelayHeightData,
  settings: GlobalSettings,
  antennas: AntennaData,
  planets: PlanetData,
) {
  const planet = planets.map.get(data.planet)
  if (!planet) return {
    status: "no planet data" as const
  }
  const planetimg = planet.image
  const planetimgscale = planet.imageScale
  const orbitRatio = data.orbitRatio

  const scienceBonusOfTargetStrength = getScienceBonusfromSignalStrength(data.strength)

  const planetRadius = planet.radius ?? 0
  const highestPoint = planet.highestPoint ?? 0
  const atmHeight = planet.atmHeight ?? 0
  const soiRadius = planet.soi ?? 0
  const lowestLKO = planetRadius + atmHeight
  const minimumOrbitableHeight = Math.max(planetRadius + atmHeight, planetRadius + highestPoint)

  const effectivePlanetRadius = (() => {
    if (planet.atmHeight === 0) {
      return settings.occlusionModifierVac * planetRadius
    } else {
      return settings.occlusionModifierAtm * planetRadius
    }
  })()

  const relayCount = data.relayCount
  const maxRelayRange = getMaximumRange({
    body1: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    body2: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    antennaData: antennas,
    dsnModifier: settings.dsnModifier,
    rangeModifier: settings.rangeModifier,
  }).value

  if (maxRelayRange === 0) {
    return {
      status: "impossible" as const,
      reason: "no relay satellite" as const,
      // commons
      planetimg,
      planetRadius,
      planetimgscale,
      maxRelayRange,
      relayCount,
      soiRadius,
      atmHeight,
      effectivePlanetRadius,
      scienceBonusOfTargetStrength,
      orbitRatio,
      highestPoint,
      minimumOrbitableHeight,
      lowestLKO
    }
  }

  const minRadiusBasedOnPlanet = getMinimumRelayHeight(effectivePlanetRadius, relayCount) + effectivePlanetRadius
  const maxRadiusFromRelays = getMaximumRelayHeightRelativeToEachOther(data.relayCount, getDistance(maxRelayRange, data.strength), effectivePlanetRadius) + effectivePlanetRadius

  const antennaRangeToVessel = getMaximumRange({
    body1: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    body2: { type: "ship", isRelay: false, hasCommandModule: true, antennas: data.vessel, },
    antennaData: antennas,
    dsnModifier: settings.dsnModifier,
    rangeModifier: settings.rangeModifier,
  }).value
  const maxRadiusFromVessel = getMaximumRelayHeightRelativeToVessel(relayCount, getDistance(antennaRangeToVessel, data.strength), effectivePlanetRadius) + effectivePlanetRadius


  // Get min, max, mid, status, and reason
  const {
    maxRadius,
    orbitRadius,
    minRadius,
    status,
    reason,
  } = (() => {
    if (maxRadiusFromRelays < minRadiusBasedOnPlanet) {
      const orbitRadius = Math.max(maxRadiusFromRelays, minRadiusBasedOnPlanet, minimumOrbitableHeight)
      return {
        status: "impossible" as const,
        reason: "no inter-relay connection" as const,
        orbitRadius
      }
    }
    if (Number.isNaN(maxRadiusFromVessel)) {
      const orbitRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableHeight)
      return {
        status: "impossible" as const,
        reason: "no vessel connection" as const,
        orbitRadius
      }
    }
    const minRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableHeight)
    const maxRadius = Math.max(Math.min(maxRadiusFromRelays, maxRadiusFromVessel), minRadius)

    // const orbitRadius = mid(minRadius, maxRadius)
    const orbitRadius = ((maxRadius - minRadius) * orbitRatio) + minRadius

    return {
      status: "ok" as const,
      orbitRadius, minRadius, maxRadius
    }
  })()

  const maxHeightFromRelays = maxRadiusFromRelays + effectivePlanetRadius
  const minHeightBasedOnPlanet = minRadiusBasedOnPlanet + effectivePlanetRadius
  const distanceBetweenRelays = (orbitRadius) * Math.sin(Math.PI / relayCount) * 2
  const relayStrength = getStrength(maxRelayRange, distanceBetweenRelays)

  const distanceFromVesselToRelay = (() => {
    const a = (orbitRadius) * Math.sin(Math.PI / relayCount)
    const b = (orbitRadius) * Math.cos(Math.PI / relayCount) - effectivePlanetRadius
    const c = Math.sqrt(a * a + b * b)
    return c
  })()
  const vesselStrength = getStrength(antennaRangeToVessel, distanceFromVesselToRelay)

  const getLinkColor = (strength: number) => {
    const gradient = interpolate(
      [
        cns.cellGradient1,
        cns.cellGradient2,
        cns.cellGradient3,
        cns.cellGradient4,
      ],
      "oklch"
    )
    const res = gradient(strength)
    return formatCss(res)
  }
  const vesselLinkColor = getLinkColor(vesselStrength)
  const relayLinkColor = getLinkColor(relayStrength)



  return {
    status,
    reason,
    maxRadiusFromRelays,
    maxHeightFromRelays,
    minRadiusBasedOnPlanet,
    minHeightBasedOnPlanet,
    maxRadius,
    minRadius,
    orbitRadius,
    maxRadiusFromVessel,

    relayStrength,
    distanceBetweenRelays,

    distanceFromVesselToRelay,
    vesselStrength,

    vesselLinkColor,
    relayLinkColor,

    // commons
    planetimg,
    planetRadius,
    planetimgscale,
    maxRelayRange,
    relayCount,
    soiRadius,
    atmHeight,
    effectivePlanetRadius,
    scienceBonusOfTargetStrength,
    orbitRatio,
    highestPoint,
    minimumOrbitableHeight,
    lowestLKO
  }
}

function ResultInfo(props: ReturnType<typeof getResult> & {
  onOrbitRatioChange: (n: number) => void
}) {

  if (props.status === "no planet data") return <></>

  return <div className="grid grid-cols-[auto_8rem] gap-2 text-sm leading-4 px-4">
    {props.status === "impossible" && <>
      <div className={cns.card("text-sm text-pretty col-span-2 mb-1 starting:opacity-0 starting:-translate-y-10 transition")}>
        <div className={cns.text.muted("text-xs flex items-center gap-1")}>
          <LucideTriangleAlert className={cns.error.text.base()} />
          warning: {props.reason}
        </div>
        {props.reason === "no relay satellite" && "Please add a relay antenna to your relay satellite."}
        {props.reason === "no inter-relay connection" && "Relay Antenna can't reach target strength."}
        {props.reason === "no vessel connection" && "Vessel Antenna can't reach target strength."}
      </div>
    </>}

    <div className="grid grid-cols-3 col-span-2 text-base items-center">
      <div className="text-sm">
        <p className={cns.text.muted()}>Min Height</p>
        <p className="">{prettyNum((props.minRadius ?? NaN) - props.planetRadius)}</p>
      </div>

      <div className="text-center">
        <p className={cns.text.muted()}>Orbit Height</p>
        <p className="">{prettyNum((props.orbitRadius ?? NaN) - props.planetRadius)}</p>
      </div>

      <div className="text-sm text-end">
        <p className={cns.text.muted()}>Max Height</p>
        <p className="">{prettyNum((props.maxRadius ?? NaN) - props.planetRadius)}</p>
      </div>
    </div>
    {props.minRadius && props.maxRadius &&
      <div className="col-span-2 flex gap-2 items-center">
        <Slider
          min={0}
          max={1}
          step={0.01}
          className="grow"
          onValueChange={props.onOrbitRatioChange}
          value={props.orbitRatio}
        />
        <ResetSettingsIconButton
          onClick={() => {
            props.onOrbitRatioChange(0.5)
          }}
        />
      </div>
    }

    <Divider className="col-span-2" />

    <p className={cns.text.muted("col-span-2 text-xs opacity-50")}>Between Each Relays</p>

    <p className={cns.text.muted()}>Distance</p>
    <p className="">{prettyNum(props.distanceBetweenRelays ?? NaN)}</p>

    <p className={cns.text.muted()}>Relay Strength Achieved @ Mid</p>
    <div className={"text-sm flex gap-4 items-center"}>
      <SignalStrengthItems
        strength={props.relayStrength ?? NaN}
        size="sm"
      />
    </div>

    <Divider className="col-span-2" />

    <p className={cns.text.muted("col-span-2 text-xs opacity-50")}>Vessel to Relay</p>

    <p className={cns.text.muted()}>Distance to Vessel</p>
    <p className="">{prettyNum(props.distanceFromVesselToRelay ?? NaN)}</p>

    <p className={cns.text.muted()}>Relay Strength Achieved @ Mid</p>
    <div className={"text-sm flex gap-4 items-center"}>
      <SignalStrengthItems
        strength={props.vesselStrength ?? NaN}
        size="sm"
      />
    </div>

    <Divider className="col-span-2" />

    <p className={cns.text.muted("col-span-2 text-xs opacity-50")}>More Informations</p>

    <p className={cns.text.muted()}>Planet Radius</p>
    <p className="">{props.planetRadius ? prettyNum(props.planetRadius) : "-"}</p>

    <p className={cns.text.muted()}>Minimum Radius Based of Planet Radius</p>
    <p className="">{prettyNum(props.minRadiusBasedOnPlanet ?? NaN)}</p>

    <p className={cns.text.muted()}>Maximum Relay Range</p>
    <p className="">{prettyNum(props.maxRelayRange)}</p>

    <p className={cns.text.muted()}>Maximum Radius based on Relay to Relay</p>
    <p className="">{prettyNum(props.maxRadiusFromRelays ?? NaN)}</p>

    <p className={cns.text.muted()}>Maximum Radius based on Relay to Vessel</p>
    <p className="">{prettyNum(props.maxRadiusFromVessel ?? NaN)}</p>

    <p className={cns.text.muted()}>Lowest Low Orbit Radius</p>
    <p className="">{(props.lowestLKO ?? NaN)}m</p>

    <div className="col-span-2">
      <p className={cns.text.muted()}>Ideal / Midpoint orbits raw value</p>
      <p className={cns.text.muted()}>{props.orbitRadius ?? NaN}m</p>
    </div>

  </div>
}


function Visualization(props: ReturnType<typeof getResult>) {
  if (props.status === "no planet data") return <></>

  const maxViewportScale = Math.max(props.maxRadius ?? 0, props.planetRadius, props.orbitRadius ?? 0)

  const rocketPos = getSatellitePosition(props.relayCount, 0.5)

  // Probably would've been more performant using SVG / canvas
  return <div className={cns.card(
    "w-full aspect-square rounded-2xl",
    "bg-zinc-900",
    "grid place-items-center relative",
    "overflow-hidden",
  )}>
    <Circle
      maxHeight={maxViewportScale}
      height={props.soiRadius}
      className="bg-black"
    >
      <div className="absolute text-xs left-1/2 -translate-y-full opacity-50">SOI</div>
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
    <div className="absolute inset-0 bg-[url(/skybox.jpeg)] bg-cover mix-blend-lighten">
    </div>
    {props.atmHeight > 0 &&
      <Circle
        maxHeight={maxViewportScale}
        height={props.planetRadius + props.atmHeight}
        className="bg-blue-400/25"
      />
    }
    {props.atmHeight === 0 &&
      // For Testing / Measuring the right image scale
      <Circle
        maxHeight={maxViewportScale}
        height={props.planetRadius + props.atmHeight}
        className="bg-white"
      />
    }

    <Circle
      maxHeight={maxViewportScale}
      height={props.planetRadius}
      className=""
    >
      <img
        src={props.planetimg}
        className="absolute w-full h-full object-contain rounded-full overflow-hidden"
        style={props.planetimgscale ? {
          scale: props.planetimgscale
        } : undefined}
      />
      <FluentEmojiRocket
        style={{
          left: `${ 50 + (-rocketPos.x * 50) }%`,
          top: `${ 50 + (rocketPos.y * 50) }%`
        }}
        className="-translate-1/2 absolute"
      />
      {props.reason !== "no relay satellite" && <>
        <div
          style={{
            left: `${ 50 + (-rocketPos.x * 50) }%`,
            top: `${ 50 + (rocketPos.y * 50) }%`,
            transformOrigin: '0 0',
            rotate: (() => {
              const a = (props.orbitRadius ?? 0) * Math.sin(Math.PI / props.relayCount)
              const b = (props.orbitRadius ?? 0) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
              const c = Math.atan(b / a)
              return `${ (Math.PI / props.relayCount) - c }rad`
            })(),
            width: (() => {
              const a = (props.orbitRadius ?? 0) * Math.sin(Math.PI / props.relayCount)
              const b = (props.orbitRadius ?? 0) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
              const c = Math.sqrt(a * a + b * b)
              return `${ c / props.planetRadius * 50 }%`
            })(),
            background: props.vesselLinkColor
          }}
          className={cn("absolute w-1/2 h-px bg-green-500 transition-transform duration-75")}
        >
        </div>
        <div
          style={{
            left: `${ 50 + (-rocketPos.x * 50) }%`,
            top: `${ 50 + (rocketPos.y * 50) }%`,
            transformOrigin: '0 0',
            rotate: (() => {
              const a = (props.orbitRadius) * Math.sin(Math.PI / props.relayCount)
              const b = (props.orbitRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
              const c = Math.atan(b / a)
              return `${ (Math.PI / props.relayCount) + c - Math.PI }rad`
            })(),
            width: (() => {
              const a = (props.orbitRadius) * Math.sin(Math.PI / props.relayCount)
              const b = (props.orbitRadius) * Math.cos(Math.PI / props.relayCount) - props.planetRadius
              const c = Math.sqrt(a * a + b * b)
              return `${ c / props.planetRadius * 50 }%`
            })(),
            background: props.vesselLinkColor

          }}
          className={cn("absolute w-1/2 h-px bg-green-500 transition-transform duration-75")}
        >
        </div>
      </>
      }
    </Circle>
    <Circle
      maxHeight={maxViewportScale}
      height={props.orbitRadius}
      className={cn(
        "border border-px border-emerald-400/50",
      )}
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
            rotate: `${ Math.PI / props.relayCount + 2 * Math.PI / props.relayCount * i }rad`, // lots of trial and error...
            background: props.relayLinkColor,
          }} className={cn(
            "absolute w-1/2 h-px bg-green-500 transition-all starting:opacity-0",
            props.status === "impossible" && props.reason === "no inter-relay connection" && "bg-red-500 "
          )}>
          </div>


          <div style={{
            left, top,
          }} key={i} className="absolute -translate-1/2 size-2 rounded-full text-red-500 transition-all starting:left-1/2! starting:top-0! grid place-items-center">
            <EmojioneSatellite className="absolute" />
            {i === 1 &&
              <div className="absolute text-nowrap text-white bottom-2 left-2 text-xs">
                Midpoint Alt: {prettyNum((props.orbitRadius ?? 0) - props.planetRadius)}
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
  height: number | undefined,
  className: string,
  children?: ReactNode,
}) {
  if (props.height === undefined) return null
  const heightPercent = (props.height / props.maxHeight * 80) + '%'
  return (
    <div style={{ width: heightPercent }} className={cn("absolute aspect-square rounded-full transition-all", props.className)} >
      {props.children}
    </div>
  )
}



