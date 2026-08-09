"use client"

import { cns } from "@/design-system"
import { getDistance, getMaximumRange, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload } from "@/lib/antenna"
import { getData, type AntennaData, type PlanetData } from "@/packages/_process-packages"
import { fixedNum, prettyNum } from "@/lib/pretty-num"
import { prettyPeriod } from "@/lib/pretty-period"
import { useRelayHeightAppState, type RelayHeightData } from "@/lib/relay-height/app-state"
import { getMaximumRelayHeightRelativeToEachOther, getMaximumRelayHeightRelativeToVessel, getMinimumRelayHeight, getResonantOrbit, lawOfCosineFindAngle, lawOfCosineFindSide, mid } from "@/lib/relay-height/math"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { ShareAppURLButton } from "@/ui/button"
import { cn } from "@/ui/cn"
import { Divider, HomeButton } from "@/ui/common"
import { Footer } from "@/ui/footer"
import { EmojioneSatellite, FluentEmojiRocket, LucideTriangleAlert } from "@/ui/icons"
import { InputBlock, NumberInput, Slider } from "@/ui/input"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { WhatIsThisSection } from "@/ui/prose"
import { ResetSettingsIconButton, SettingsSection, useGlobalSettings, type GlobalSettings } from "@/ui/settings-section"
import SignalStrengthItems, { strengthNum } from "@/ui/signal-strength"
import { formatCss, interpolate } from "culori"
import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from "react"

export function RelayHeight_Client() {

  const [ settings, setSettings ] = useGlobalSettings()
  const [ data, setData ] = useRelayHeightAppState()
  const [ isDraggingOrbit, setIsDraggingOrbit ] = useState(false)

  if (!data || !settings) return null

  const { antennas, planets } = getData(settings.contents, settings)

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

  return (
    <div className={cns.page("max-w-320")}>

      <HomeButton />

      <header>
        <h1 className={cns.pageTitle()}>
          KSP Calculator: Ideal Relay Height
        </h1>
        <div className={cns.pageDescription()}>
          Find the ideal relay height given antenna requirement and celestial body
        </div>
      </header>

      <section className={cn(
        "grid gap-8 items-start pt-8",
        "grid-cols-1",
        "sm:grid-cols-[15rem_auto]",
        "md:grid-cols-[15rem_auto]",
        "lg:grid-cols-[15rem_auto_24rem]",
        "xl:grid-cols-[20rem_auto_26rem]",
      )}>

        <div className={("flex flex-col gap-2 max-w-100")}>

          <p className={cns.text.muted("col-span-2 text-xs opacity-75")}>Setup</p>
          <div className={("flex flex-col gap-6")}>

            <InputBlock label="Celestial Body" row>
              <PlanetSelectMenu
                value={data.planet}
                onValueChange={changePlanet}
                planetData={planets}
              />
            </InputBlock>
            <Divider />
            <InputBlock label="Relay Antenna">
              <AntennaInput
                value={data.relay}
                onChange={changeRelayAntenna}
                antennas={antennas}
                className="flex flex-col"
                filter={a => a.type === "relay"}
              />
            </InputBlock>
            <InputBlock label="Relay Count">
              <div className="flex gap-2 items-center w-full gap-4">
                <Slider
                  className="max-w-60 w-full"
                  min={3} max={16} step={1}
                  value={data.relayCount}
                  onValueChange={changeRelayCount}
                />

                <div className="shrink-0 w-8 text-end">
                  {data.relayCount}
                </div>
              </div>
            </InputBlock>

            <InputBlock label="Target Signal Strength">
              <div>
                <div className={"text-sm flex gap-4 items-center mt-1"}>
                  <SignalStrengthItems
                    strength={data.strength}
                    size="sm"
                  />
                </div>
                <div className={"flex gap-2 items-center w-full gap-4"}>
                  <Slider
                    className="max-w-60 w-full"
                    min={0} max={0.99} step={0.01}
                    value={data.strength}
                    onValueChange={(n) => {
                      setIsDraggingOrbit(true)
                      changeTargetStrength(n)
                    }}
                    onValueCommitted={() => {
                      setIsDraggingOrbit(false)
                    }}
                  />
                  <div className="shrink-0 w-8 text-end">
                    {Math.round(data.strength * 100) + '%'}
                  </div>
                </div>
                <div className="flex gap-px mt-1">
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
            </InputBlock>
            <Divider />
            <InputBlock label="Surface Vessel Antenna">
              {result.notlandable ? <div className={cns.text.muted("text-xs")}>
                Surface not landable
              </div> :
                <AntennaInput
                  value={data.vessel}
                  onChange={changeVesselAntenna}
                  antennas={antennas}
                  className="flex flex-col"
                />
              }
            </InputBlock>
            <WarningsSection {...result} />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Visualization {...result} disableAnimation={isDraggingOrbit} />
          <div className="px-4 flex flex-col gap-6 max-w-140 w-full mx-auto">
            <AdjustHeight {...result}
              onOrbitRatioChange={changeResultOrbitRatio}
              setIsDraggingORbit={setIsDraggingOrbit}
            />
            <OverrideHeight {...result} onValueChange={(n) => {
              if (result.minHeight === undefined || result.maxHeight === undefined) return
              const newRatio = (n - result.minHeight) / (result.maxHeight - result.minHeight)
              data.orbitRatio = newRatio
              setData({ ...data })
            }} />
            <OrbitInformations {...result} className="lg:hidden" />
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <OrbitInformations {...result} className="max-lg:hidden" />
          <ShareAppURLButton data={data} className="max-lg:hidden" />
          <DebugInformation {...result} className="max-lg:hidden" />
        </div>
      </section>

      <Divider className="my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        <section>
          <h2 className="text-lg">
            Settings
          </h2>

          <SettingsSection settings={settings} onSettingsChange={setSettings} />
        </section>

        <section>
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
              {
                title: "Relay Network Calculator",
                author: "GrParrot",
                href: "https://grparrot.github.io/KSP-Relay-Calculator/",
              },
              {
                title: "Satellite Network Spacer-out-er",
                author: "James Warner",
                href: "https://jwarner3412.github.io/kerbility/",
              },
              {
                title: "KSP Artificial Satellite Placement",
                author: "EnsG (twitch)",
                href: "https://docs.google.com/spreadsheets/d/10ba8mrHmFVnjWnCaoyTgPB3pY1S4ab8ydDKO8q36sD4",
              },
              {
                title: "Resonance orbit calculator",
                href: "https://www.ksp.interrutt.com/",
              },

            ]}
          />
        </section>

      </div>






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
  const planet_data = planets.map.get(data.planet)
  if (!planet_data) return {
    status: "no planet data" as const
  }

  const planetimg = planet_data.image
  const planetimgscale = planet_data.imageScale
  const planetimgx = planet_data.imageX
  const planetimgy = planet_data.imageY
  const notlandable = planet_data.notLandable
  const planetRadius = planet_data.radius ?? 0
  const highestPoint = planet_data.highestPoint ?? 0
  const atmHeight = planet_data.atmHeight ?? 0
  const soiRadius = planet_data.soiRadius ?? 0

  const lowestLKO = planetRadius + atmHeight
  const minimumOrbitableRadius = Math.max(planetRadius + atmHeight, planetRadius + highestPoint)
  const effectiveOccludedPlanetRadius = (() => {
    if (planet_data.atmHeight === 0) {
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

  const orbitRatio = data.orbitRatio
  const scienceBonusOfTargetStrength = getScienceBonusfromSignalStrength(data.strength)

  if (maxRelayRange === 0) {
    return {
      status: "impossible" as const,
      reason: "no relay satellite" as const,

      // -- commons --
      // planet data
      planetimg,
      planetRadius,
      planetimgscale,
      planetimgx,
      planetimgy,
      notlandable,
      atmHeight,
      soiRadius,

      // derived from planet data
      maxRelayRange,
      relayCount,
      effectiveOccludedPlanetRadius,
      highestPoint,
      minimumOrbitableRadius,
      lowestLKO,

      // from input + planet data
      scienceBonusOfTargetStrength,
      orbitRatio,
    }
  }

  const minRadiusBasedOnPlanet = getMinimumRelayHeight(effectiveOccludedPlanetRadius, relayCount) + effectiveOccludedPlanetRadius
  const maxRadiusFromRelays = getMaximumRelayHeightRelativeToEachOther(data.relayCount, getDistance(maxRelayRange, data.strength), effectiveOccludedPlanetRadius) + effectiveOccludedPlanetRadius

  const antennaRangeToVessel = getMaximumRange({
    body1: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    body2: { type: "ship", isRelay: false, hasCommandModule: true, antennas: data.vessel, },
    antennaData: antennas,
    dsnModifier: settings.dsnModifier,
    rangeModifier: settings.rangeModifier,
  }).value
  const maxRadiusFromVessel =
    notlandable ? Infinity :
      getMaximumRelayHeightRelativeToVessel(relayCount, getDistance(antennaRangeToVessel, data.strength), effectiveOccludedPlanetRadius) + effectiveOccludedPlanetRadius


  // Get min, max, mid, status, and reason
  const {
    maxRadius,
    orbitRadius,
    minRadius,
    status,
    reason,
  } = (() => {
    if (maxRadiusFromRelays < minRadiusBasedOnPlanet) {
      const orbitRadius = Math.max(maxRadiusFromRelays, minRadiusBasedOnPlanet, minimumOrbitableRadius)
      return {
        status: "impossible" as const,
        reason: "no inter-relay connection" as const,
        orbitRadius
      }
    }
    if (Number.isNaN(maxRadiusFromVessel)) {
      const orbitRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableRadius)
      return {
        status: "impossible" as const,
        reason: "no vessel connection" as const,
        orbitRadius
      }
    }
    const minRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableRadius)
    const maxRadius = Math.max(Math.min(maxRadiusFromRelays, maxRadiusFromVessel, soiRadius), minRadius)

    // const orbitRadius = mid(minRadius, maxRadius)
    const orbitRadius = ((maxRadius - minRadius) * orbitRatio) + minRadius

    return {
      status: "ok" as const,
      orbitRadius, minRadius, maxRadius
    }
  })()

  const maxHeightFromRelays = maxRadiusFromRelays + effectiveOccludedPlanetRadius
  const minHeightBasedOnPlanet = minRadiusBasedOnPlanet + effectiveOccludedPlanetRadius
  const distanceBetweenRelays = (orbitRadius) * Math.sin(Math.PI / relayCount) * 2
  const relayStrength = getStrength(maxRelayRange, distanceBetweenRelays)

  const distanceFromVesselToRelay = (() => {
    const a = (orbitRadius) * Math.sin(Math.PI / relayCount)
    const b = (orbitRadius) * Math.cos(Math.PI / relayCount) - effectiveOccludedPlanetRadius
    const c = Math.sqrt(a * a + b * b)
    return c
  })()

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
  const relayLinkColor = getLinkColor(relayStrength)


  const vessel = (() => {
    if (notlandable === true) return undefined
    const vesselStrength = getStrength(antennaRangeToVessel, distanceFromVesselToRelay)
    const vesselLinkColor = getLinkColor(vesselStrength)
    return {
      strength: vesselStrength,
      linkColor: vesselLinkColor,
    }
  })()



  const minHeight = (minRadius ?? NaN) - planetRadius
  const orbitHeight = (orbitRadius) - planetRadius
  const maxHeight = (maxRadius ?? NaN) - planetRadius


  const resonantOrbit = (() => {
    const gravParam = planet_data.gravParam

    // TODO : allow control for peaking/diving

    if (gravParam === undefined) {
      return {
        status: "missing data" as const,
      }
    }
    let resonantOrbit = getResonantOrbit(
      orbitRadius, gravParam, relayCount, "peaking",
    )

    if (resonantOrbit.otherApsisRadius > soiRadius) {
      resonantOrbit = getResonantOrbit(
        orbitRadius, gravParam, relayCount, "diving",
      )
      if (resonantOrbit.otherApsisRadius < minimumOrbitableRadius) {
        return {
          status: "impossible" as const,
          reason: "no safe solution" as const,
          orbitalPeriod: resonantOrbit.period,
          semiMinorAxis: resonantOrbit.semiMinorAxis,
          semiMajorAxis: resonantOrbit.semiMajorAxis,
          focusOffset: resonantOrbit.focusOffset,
          resonantPeriod: resonantOrbit.resonantPeriod,
          otherApsisRadius: resonantOrbit.otherApsisRadius,
          injectioDeltaV: resonantOrbit.injectioDeltaV,
          mode: resonantOrbit.mode,
          apsisLabel: resonantOrbit.apsisLabel
        }
      }
    }

    // Check for impossible resonant orbit OR check for "diving"
    return {
      status: "ok" as const,
      orbitalPeriod: resonantOrbit.period,
      semiMinorAxis: resonantOrbit.semiMinorAxis,
      semiMajorAxis: resonantOrbit.semiMajorAxis,
      focusOffset: resonantOrbit.focusOffset,
      resonantPeriod: resonantOrbit.resonantPeriod,
      otherApsisRadius: resonantOrbit.otherApsisRadius,
      injectioDeltaV: resonantOrbit.injectioDeltaV,
      mode: resonantOrbit.mode,
      apsisLabel: resonantOrbit.apsisLabel
    }
  })()

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
    vessel,
    relayLinkColor,

    minHeight,
    orbitHeight,
    maxHeight,

    resonantOrbit,

    // -- commons --
    // planet data
    planetimg,
    planetRadius,
    planetimgscale,
    planetimgx,
    planetimgy,
    notlandable,
    atmHeight,
    soiRadius,

    // derived from planet data
    maxRelayRange,
    relayCount,
    effectiveOccludedPlanetRadius,
    highestPoint,
    minimumOrbitableRadius,
    lowestLKO,

    // from input + planet data
    scienceBonusOfTargetStrength,
    orbitRatio,
  }
}

function AdjustHeight(props: ReturnType<typeof getResult> & {
  setIsDraggingORbit: (val: boolean) => void,
  onOrbitRatioChange: (n: number) => void
}) {

  if (props.status === "no planet data") return <></>

  return <div className="flex flex-col gap-2">
    <div className={cns.surface("grid grid-cols-[auto_8rem] gap-2 text-sm leading-4")}>
      <p className={cns.text.muted("col-span-2 text-xs opacity-75")}>Adjust Height</p>
      <div className="grid grid-cols-[2fr_3fr_2fr] col-span-2 text-base items-center">
        <div className="text-sm">
          <p className={cns.text.muted()}>Min Height</p>
          <p className="">{prettyNum(props.minHeight ?? NaN).toLocaleString()}m</p>
        </div>

        <div className="text-sm text-center">
          <p className={cns.text.muted()}>Orbit Height</p>
          <p className="">{prettyNum(props.orbitHeight ?? NaN).toLocaleString()}m</p>
        </div>

        <div className="text-sm text-end">
          <p className={cns.text.muted()}>Max Height</p>
          <p className="">{prettyNum(props.maxHeight ?? NaN).toLocaleString()}m</p>
        </div>
      </div>
      {props.minRadius && props.maxRadius &&
        <div className="col-span-2 flex gap-2 items-center">
          <Slider
            min={0} max={1} step={0.01} className="grow"
            value={props.orbitRatio}
            onValueChange={(n) => {
              props.setIsDraggingORbit(true)
              props.onOrbitRatioChange(n)
            }}
            onValueCommitted={() => {
              props.setIsDraggingORbit(false)
            }}
          />
          <ResetSettingsIconButton onClick={() => props.onOrbitRatioChange(0.5)} />
        </div>
      }

    </div>
  </div>
}

function OverrideHeight(props: ReturnType<typeof getResult> & {
  onValueChange: (n: number) => void
}) {
  const [ val, setVal ] = useState(props.orbitHeight ?? NaN)
  useEffect(() => {
    setVal(props.orbitHeight ?? NaN)
  }, [ props.orbitHeight ])

  return (
    <div className="flex flex-col gap-2">
      <InputBlock label="Override Height" row>
        <NumberInput
          className="max-w-none"
          key={val}
          initialValue={val}
          onValueChange={setVal}
          validate={(n) => {
            if (n < 0) return "Can't be negative"
            if (props.minHeight && n < props.minHeight) return "Can't be less than the minimum height"
            return undefined
          }}
          unit="m"
        />
      </InputBlock>
      <button className={cns.button.base()} onClick={() => props.onValueChange(val)}>
        Set Height Override
      </button>
    </div>
  )
}


function Visualization(props: ReturnType<typeof getResult> & {
  disableAnimation: boolean,
}) {
  if (props.status === "no planet data") return <></>

  const maxViewportScale = Math.max(props.maxRadius ?? 0, props.planetRadius, props.orbitRadius ?? 0)

  const rocketPos = getSatellitePosition(props.relayCount, 0.5)

  // Probably would've been more performant using SVG / canvas
  return <div className={cns.card(
    "w-full aspect-square rounded-2xl",
    props.soiRadius === Infinity ? "bg-black" : "bg-zinc-900/50!",
    "grid place-items-center relative",
    "overflow-hidden",
  )}>
    {/* Below SOI Circle */}
    {props.soiRadius !== Infinity &&
      <Circle maxHeight={maxViewportScale} height={props.soiRadius} disableAnimation={props.disableAnimation}
        className="bg-black"
      >
        <div className="absolute text-xs left-1/2 -translate-y-full opacity-50">SOI</div>
      </Circle>
    }
    {/* Max Radius */}
    <Circle maxHeight={maxViewportScale} height={props.maxRadius} disableAnimation={props.disableAnimation}
      className="bg-teal-500/25"
    >
      <div className="absolute text-xs left-1/2 text-teal-500/50">MAX</div>
    </Circle>

    {/* Min Radius */}
    <Circle maxHeight={maxViewportScale} height={props.minRadius} disableAnimation={props.disableAnimation}
      className="bg-black"
    >
      <div className="absolute text-xs left-1/2 -translate-y-full text-teal-500/50">MIN</div>
    </Circle>

    {/* Skybox (with screen blend) */}
    <div className="absolute inset-0 bg-[url(/skybox.jpeg)] bg-cover mix-blend-lighten">
    </div>

    {/* Atmosphere */}
    {props.atmHeight > 0 &&
      <Circle maxHeight={maxViewportScale} height={props.planetRadius + props.atmHeight} disableAnimation={props.disableAnimation}
        className="bg-blue-400/25"
      />
    }

    {/* Planet */}
    <Circle maxHeight={maxViewportScale} height={props.planetRadius} disableAnimation={props.disableAnimation}
      className=""
    >
      {props.planetimg ? <img
        src={props.planetimg}
        className="absolute w-full h-full object-contain rounded-full overflow-hidden"
        style={{
          scale: props.planetimgscale || undefined,
          translate: `${ (props.planetimgx ?? 0) }% ${ (props.planetimgy ?? 0) }%`
        }}
      /> : <div
        className={cns.planet("absolute w-full h-full rounded-full overflow-hidden")}
        style={{
          scale: props.planetimgscale || undefined,
        }}
      />}
      {
        props.notlandable ? <></> :
          <>
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
                  background: props.vessel?.linkColor
                }}
                className={cn(
                  props.disableAnimation ? "" : "transition-transform duration-75",
                  "absolute w-1/2 h-px bg-green-500"
                )}
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
                  background: props.vessel?.linkColor

                }}
                className={cn(
                  props.disableAnimation ? "" : "transition-transform duration-75",
                  "absolute w-1/2 h-px bg-green-500"
                )}
              >
              </div>
            </>
            }
          </>
      }
    </Circle>

    {/* Main/Selected Orbit Circle */}
    <Circle
      maxHeight={maxViewportScale}
      height={props.orbitRadius} disableAnimation={props.disableAnimation}
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
            "absolute w-1/2 h-px bg-green-500 starting:opacity-0",
            props.status === "impossible" && props.reason === "no inter-relay connection" && "bg-red-500 "
          )}>
          </div>


          <div style={{
            left, top,
          }} key={i} className={cn(
            "absolute -translate-1/2 size-2 rounded-full text-red-500 starting:left-1/2! starting:top-0! grid place-items-center"
          )}>
            <EmojioneSatellite className="absolute" />
          </div>
        </Fragment>
      })}
    </Circle>

    {/* Resonant Orbit */}
    {
      props.resonantOrbit && props.resonantOrbit.status !== "missing data" &&
      <Circle
        maxHeight={maxViewportScale}
        height={props.resonantOrbit.semiMinorAxis} disableAnimation={props.disableAnimation}
        className={cn(
          "border border-px border-yellow-400/50 border-dashed",
        )}
        style={{
          transform: ` scaleY(${ props.resonantOrbit.semiMajorAxis / props.resonantOrbit.semiMinorAxis }) translateY(${ ((props.resonantOrbit.semiMajorAxis - props.orbitRadius) / (props.resonantOrbit.semiMajorAxis)) * 50 }%)`,
          // scale: `1 ${ props.resonantOrbit.semiMajorAxis / props.resonantOrbit.semiMinorAxis }`,
          // translate: `0px ${ ((props.resonantOrbit.semiMajorAxis - props.orbitRadius) / (props.resonantOrbit.semiMajorAxis)) * 50 }%`
          // translate: `0px %`
        }}
      >
      </Circle>
    }

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
  style?: CSSProperties,
  disableAnimation: boolean,
}) {
  if (props.height === undefined) return null
  const heightPercent = (props.height / props.maxHeight * 80) + '%'
  return (
    <div
      style={{
        width: heightPercent, ...props.style,
      }}
      // transition={props.disableAnimation ? { duration: 0 } : { type: "tween", duration: 0.2 }}
      className={cn(
        "absolute aspect-square rounded-full",
        props.disableAnimation ? "" : "transition-all",
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}


function DebugInformation(props: ReturnType<typeof getResult> & {
  className?: string
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 text-xs py-6 hidden lg:grid")}>
      <p className={cns.text.muted("col-span-2 text-xs")}>Debug Informations</p>
      <div className="contents leading-3.5">
        <p className={cns.text.muted()}>Planet Radius</p>
        <p className={cns.text.muted()}>{props.planetRadius ? prettyNum(props.planetRadius, "k", "m") : "-"}</p>

        <p className={cns.text.muted()}>Maximum Relay Range</p>
        <p className={cns.text.muted()}>{prettyNum(props.maxRelayRange ?? NaN, "k", "m")}</p>

        <p className={cns.text.muted()}>Maximum Radius based on Relay to Relay (0% strength)</p>
        <p className={cns.text.muted()}>{prettyNum(props.maxRadiusFromRelays ?? NaN, "k", "m")}</p>

        <p className={cns.text.muted()}>Minimum Radius Based of Planet Radius</p>
        <p className={cns.text.muted()}>{prettyNum(props.minRadiusBasedOnPlanet ?? NaN, "k", "m")}</p>

        <p className={cns.text.muted()}>Maximum Radius based on Relay to Vessel</p>
        <p className={cns.text.muted()}>{prettyNum(props.maxRadiusFromVessel ?? NaN, "k", "m")}</p>

        <p className={cns.text.muted()}>Lowest Low Orbit Radius</p>
        <p className={cns.text.muted()}>{(props.lowestLKO ?? NaN)}m</p>

        <p className={cns.text.muted()}>Ideal / Midpoint orbits raw value</p>
        <p className={cns.text.muted()}>{props.orbitRadius ?? NaN}m</p>
      </div>
    </div>

  )
}

function OrbitInformations(props: ReturnType<typeof getResult> & {
  className?: string,
}) {
  return (
    <div className={cns.surface("grid grid-cols-[8rem_auto] gap-2 text-sm leading-4", props.className)}>
      {props.resonantOrbit && props.resonantOrbit.status !== "missing data" && <div
        className="col-span-2 grid grid-cols-[8rem_auto] gap-2"
      >
        <p className={cns.text.muted("col-span-2 text-xs opacity-75")}>Resonant Orbit Information</p>

        <p className={cns.text.base("text-sm")}>Orbit Altitude</p>
        <p className="text-emerald-600 dark:text-emerald-500">{fixedNum(props.orbitHeight ?? NaN)}m</p>

        <p className={cns.text.base("text-sm")}>Orbital Period</p>
        <p className="text-emerald-600 dark:text-emerald-500">{prettyPeriod(props.resonantOrbit.orbitalPeriod).formatted}</p>

        <p className={cns.text.base("text-sm")}>Resonant Period</p>
        <p className="text-emerald-600 dark:text-emerald-500">{prettyPeriod(props.resonantOrbit.resonantPeriod).formatted}</p>

        <p className={cns.text.base("text-sm")}>{props.resonantOrbit.apsisLabel}</p>
        <p className="text-emerald-600 dark:text-emerald-500">{(props.resonantOrbit.otherApsisRadius - props.planetRadius).toLocaleString('en-US')}m</p>

        <p className={cns.text.base("text-sm")}>Injection Δv</p>
        <p className="text-emerald-600 dark:text-emerald-500">{props.resonantOrbit.injectioDeltaV.toLocaleString('en-US')}m</p>

        <p className={cns.text.base("text-sm")}>Mode</p>
        <p className="text-emerald-600 dark:text-emerald-500">{props.resonantOrbit.mode === "diving" ? "Diving (Burn Retrograde)" : "Peaking (Burn Prograde)"}</p>

      </div>}


      <Divider className="col-span-2" />

      <p className={cns.text.muted("col-span-2 text-xs opacity-75")}>Between Each Relays</p>

      <p className={cns.text.base("text-sm")}>Distance</p>
      <p className="">{prettyNum(props.distanceBetweenRelays ?? NaN, "k", "m")}</p>

      <p className={cns.text.base("text-sm")}>Relay Strength</p>
      <div className={"text-sm flex gap-4 items-center"}>
        <SignalStrengthItems size="sm" strength={props.relayStrength ?? NaN} />
      </div>


      <Divider className="col-span-2" />

      <p className={cns.text.muted("col-span-2 text-xs opacity-75")}>Vessel to Relay</p>

      <p className={cns.text.base("text-sm")}>Distance</p>
      <p className="">{prettyNum(props.distanceFromVesselToRelay ?? NaN, "k", "m")}</p>

      <p className={cns.text.base("text-sm")}>Relay Strength</p>
      <div className={"text-sm flex gap-4 items-center"}>
        <SignalStrengthItems size="sm" strength={props.vessel?.strength ?? NaN} />
      </div>

    </div>

  )
}




function WarningsSection(result: ReturnType<typeof getResult> & {
  className?: string,
}) {
  return (
    <>
      {result.status === "impossible" && <>
        <div className={cns.card("text-sm text-pretty col-span-2 mb-1 starting:opacity-0 starting:-translate-y-10 transition")}>
          <div className={cns.error.text.base("text-xs flex items-center gap-1 pb-1")}>
            <LucideTriangleAlert className={cns.error.text.base()} />
            warning
          </div>
          {result.reason === "no relay satellite" && "No Relay Satellite. Please add a relay antenna to your relay satellite."}
          {result.reason === "no inter-relay connection" && `Relay Antenna can't reach target strength (${ strengthNum(result.relayStrength) }). Upgrade relay antenna or reduce target signal.`}
          {result.reason === "no vessel connection" && `Vessel Antenna can't reach target strength (${ strengthNum(result.vessel?.strength ?? 0) }). Upgrade vessel antenna or reduce target signal.`}
        </div>
      </>}
      {result.resonantOrbit?.status === "missing data" && <>
        <div className={cns.card("text-sm text-pretty col-span-2 mb-1 starting:opacity-0 starting:-translate-y-10 transition")}>
          <div className={cns.error.text.base("text-xs flex items-center gap-1 pb-1")}>
            <LucideTriangleAlert className={cns.error.text.base()} />
            warning
          </div>
          Unable to calculate Resonant Orbit. The Gravitational Parameter for this planet is not provided.
        </div>
      </>}
    </>
  )
}