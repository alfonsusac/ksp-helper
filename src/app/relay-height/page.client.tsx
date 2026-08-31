"use client"

import { cns } from "@/design-system"
import { getDistance, getMaximumRange, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload } from "@/lib/antenna"
import { getData, type AntennaData, type PlanetData } from "@/packages/_process-packages"
import { fixedNum, ordinal, prettyNum } from "@/lib/pretty-num"
import { prettyPeriod } from "@/lib/pretty-period"
import { useRelayHeightAppState, type RelayHeightData } from "@/lib/relay-height/app-state"
import { getMaximumRelayHeightRelativeToEachOther, getMaximumRelayHeightRelativeToVessel, getMinimumRelayHeight, getResonantOrbit } from "@/lib/relay-height/math"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { ShareAppURLButton } from "@/ui/button"
import { cn } from "@/ui/cn"
import { Divider, Green, HomeButton, KSPBox } from "@/ui/common"
import { Footer } from "@/ui/footer"
import { EmojioneSatellite, GlyphsPolyRocket, LucideTriangleAlert, MdiTriangle, OpenmojiFire } from "@/ui/icons"
import { InputBlock, Slider } from "@/ui/input"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { WhatIsThisSection } from "@/ui/prose"
import { ResetSettingsIconButton, SettingsSection, useGlobalSettings, type GlobalSettings } from "@/ui/settings-section"
import SignalStrengthItems, { strengthNum } from "@/ui/signal-strength"
import { formatCss, interpolate as color_interpolate } from "culori"
import { Fragment, useEffect, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react"
import { bezier, constant, easeInOutCubic, easeInOutSine, easeOutBack, lerp, sequencer, slideshowSequencer, type InterpolatorFn, type SlideshowSequenceItem } from "@/lib/relay-height/animation"
import { FieldBlock, numberField, useField } from "@/ui/input-field"


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
    // if (r < 0) r = 0
    // if (r > 1) r = 1
    data.orbitRatio = r
    data.overrideHeight = undefined
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

          <p className={cns.textMuted("col-span-2 text-xs opacity-75")}>Setup</p>
          <div className={("flex flex-col gap-6")}>

            <InputBlock label="Celestial Body" row>
              <PlanetSelectMenu
                setting={settings}
                value={data.planet}
                onValueChange={changePlanet}
                planetData={planets}
              />
            </InputBlock>
            <Divider />
            <InputBlock label="Relay Antenna">
              <AntennaInput
                setting={settings}
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
                      className={cns.buttonPresetGroup()}
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
              {result.notlandable ? <div className={cns.textMuted("text-xs")}>
                Surface not landable
              </div> :
                <AntennaInput
                  setting={settings}
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
              data.overrideHeight = n
              setData({ ...data })
            }} />
            <OrbitInformations {...result} className="lg:hidden" />
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <OrbitInformations {...result} className="max-lg:hidden" />
          <div className="flex flex-col gap-1">
            <ShareAppURLButton data={data} className="max-lg:hidden" />
          </div>
          <DebugInformation {...result} className="max-lg:hidden" />
        </div>
      </section>

      <Divider className="my-10" />

      <TutorialSection {...result} />



      <Divider className="my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        <section>
          <h2 className="text-lg mb-6">
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
  const overrideHeight = data.overrideHeight
  const relayCount = data.relayCount
  const orbitRatio = data.orbitRatio

  const planet_data = planets.map.get(data.planet)
  if (!planet_data) return {
    status: "no planet data" as const,

    // commons
    overrideHeight,
    relayCount,
  }


  const planetlabel = data.planet
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

  const maxRelayRange = getMaximumRange({
    body1: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    body2: { type: "ship", isRelay: true, hasCommandModule: true, antennas: data.relay, },
    antennaData: antennas,
    dsnModifier: settings.dsnModifier,
    rangeModifier: settings.rangeModifier,
  }).value

  const scienceBonusOfTargetStrength = getScienceBonusfromSignalStrength(data.strength)

  if (maxRelayRange === 0) {
    return {
      status: "impossible" as const,
      reason: "no relay satellite" as const,

      // -- commons --
      overrideHeight,
      relayCount,
      // planet data
      planetlabel,
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
    suggestedRadius,
    minRadius,
    status,
    reason,
  } = (() => {
    if (maxRadiusFromRelays < minRadiusBasedOnPlanet) {
      const suggestedRadius = Math.max(maxRadiusFromRelays, minRadiusBasedOnPlanet, minimumOrbitableRadius)
      return {
        status: "impossible" as const,
        reason: "no inter-relay connection" as const,
        suggestedRadius
      }
    }
    if (Number.isNaN(maxRadiusFromVessel)) {
      const suggestedRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableRadius)
      return {
        status: "impossible" as const,
        reason: "no vessel connection" as const,
        suggestedRadius
      }
    }
    const minRadius = Math.max(minRadiusBasedOnPlanet, minimumOrbitableRadius)
    const maxRadius = Math.max(Math.min(maxRadiusFromRelays, maxRadiusFromVessel, soiRadius), minRadius)

    const suggestedRadius = ((maxRadius - minRadius) * orbitRatio) + minRadius

    return {
      status: "ok" as const,
      suggestedRadius, minRadius, maxRadius
    }
  })()

  const orbitRadius = overrideHeight ? (overrideHeight + planetRadius) : suggestedRadius

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
    const gradient = color_interpolate(
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
    overrideHeight,
    relayCount,
    // planet data
    planetlabel,
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
      <p className={cns.textMuted("col-span-2 text-xs opacity-75")}>Adjust Height</p>
      <div className="grid grid-cols-[2fr_3fr_2fr] col-span-2 items-center">
        <div className="text-sm">
          <p className={cns.textMuted()}>Min Height</p>
          <p className="">{prettyNum(props.minHeight ?? NaN).toLocaleString()}m</p>
        </div>

        <div className="text-sm text-center">
          <p className={cns.textMuted()}>Orbit Height</p>
          <p className="">{prettyNum(props.orbitHeight ?? NaN).toLocaleString()}m</p>
        </div>

        <div className="text-sm text-end">
          <p className={cns.textMuted()}>Max Height</p>
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
  onValueChange: (n: number | undefined) => void
}) {

  const [commitedValue, setCommittedValue] = useState<number>()

  const overrideField = useField(numberField({
    initialData: () => props.overrideHeight ?? props.orbitHeight ?? NaN,
    // onValidChange: props.onValueChange,
    onValidChange: setCommittedValue,
    nonnegative: true,
    validate: n => {
      if (props.minHeight && n < props.minHeight) throw "Can't be less than the minimum height"
    }
  }))

  useEffect(() => {
    overrideField.setValue(props.overrideHeight ?? props.orbitHeight ?? NaN)
  }, [ props.orbitHeight ])

  return (
    <div className="flex flex-col gap-2">
      <InputBlock label="Override Height" row>
        <FieldBlock
          field={overrideField}
          endAdornment="m"
          hideReset
        />
      </InputBlock>

      <div className="grid grid-cols-2 gap-2">
        <button className={cns.buttonBase()}
          disabled={overrideField.isInvalid}
          onClick={
            () => props.onValueChange(commitedValue)
          }
        >
          Set Height Override
        </button>
        <button className={cns.buttonBase()} onClick={() => {
          props.onValueChange(undefined)
        }}>
          Clear Override
        </button>
      </div>
    </div>
  )
}


function Visualization(props: ReturnType<typeof getResult> & {
  disableAnimation: boolean,
}) {
  if (props.status === "no planet data") return <></>

  const maxViewportScale = Math.max(props.maxRadius ?? 0, props.planetRadius, props.orbitRadius ?? 0, props.resonantOrbit?.otherApsisRadius ?? 0)

  const rocketPos = getSatellitePosition(props.relayCount, 0.5)

  // Probably would've been more performant using SVG / canvas
  return <VisViewport className={cns.card(
    props.soiRadius === Infinity ? "bg-black" : "bg-zinc-900!",
  )}>
    {/* Below SOI Circle */}
    {props.soiRadius !== Infinity &&
      <Circle maxHeight={maxViewportScale} height={props.soiRadius} disableAnimation={props.disableAnimation}
        className="bg-black"
      >
        <div className="absolute text-xs left-1/2 -translate-y-full text-white/40">SOI</div>
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

    <VisViewportSkybox />

    {/* Atmosphere */}
    {props.atmHeight > 0 &&
      <Circle maxHeight={maxViewportScale} height={props.planetRadius + props.atmHeight} disableAnimation={props.disableAnimation}
        className="bg-blue-400/25"
      />
    }

    {/* Planet */}
    <VisViewportPlanet {...props} maxViewportScale={maxViewportScale} disableAnimation={props.disableAnimation}>
      {
        props.notlandable ? <></> :
          <>
            <GlyphsPolyRocket
              style={{
                left: `${ 50 + (-rocketPos.x * 50) }%`,
                top: `${ 50 + (rocketPos.y * 50) }%`,
                scale: 1.5,
              }}
              className="-translate-1/2 absolute z-10"
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
    </VisViewportPlanet>

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

          <VisViewportRelaySatellite
            phase={i / props.relayCount}
          />

        </Fragment>
      })}
    </Circle>

    {/* Resonant Orbit */}
    {
      props.resonantOrbit && props.resonantOrbit.status !== "missing data" &&
      <VisViewportOrbit
        maxViewportScale={maxViewportScale}
        orbitRadius={props.orbitRadius}
        semiMajorAxis={props.resonantOrbit.semiMajorAxis}
        semiMinorAxis={props.resonantOrbit.semiMinorAxis}
        disableAnimation={props.disableAnimation}
        className={cn(
          "border border-px border-yellow-400/50 border-dashed",
        )}
      >
      </VisViewportOrbit>
    }

  </VisViewport>
}

function VisViewportRelaySatellite(props: {
  phase: number,
  style?: CSSProperties,
}) {
  // console.log(props.phase)
  const { x, y } = getSatellitePosition(1, props.phase ?? 0)
  const left = `${ 50 + (-x * 50) }%`
  const top = `${ 50 + (y * 50) }%`
  return (
    <div style={{
      left, top,
      ...props.style,
    }} className={cn(
      "z-10",
      "absolute -translate-1/2 size-2 rounded-full text-red-500 starting:left-1/2! starting:top-0! grid place-items-center"
    )}>
      <EmojioneSatellite className="absolute z-10 scale-110" />
    </div>
  )
}

function VisViewportObjectAlongOrbit(props: {
  phase: number,
  style?: CSSProperties,
  children: ReactNode,
  className?: string,
}) {
  // console.log(props.phase)
  const { x, y } = getSatellitePosition(1, props.phase ?? 0)
  const left = `${ 50 + (-x * 50) }%`
  const top = `${ 50 + (y * 50) }%`
  return (
    <div style={{
      left, top,
      ...props.style,
    }} className={cn(
      props.className,
      "absolute -translate-1/2 size-2 rounded-full text-red-500 starting:left-1/2! starting:top-0! grid place-items-center"
    )}>
      {props.children}
    </div>
  )
}

function VisViewport(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cns.card(
      "w-full aspect-square rounded-2xl",
      "grid place-items-center relative",
      "overflow-hidden",
      props.className
    )} />
  )
}

function VisViewportSkybox(props: ComponentProps<"div">) {
  {/* Skybox (with screen blend) */ }
  return (
    <div {...props} className={cn("absolute inset-0 bg-[url(/skybox.jpeg)] bg-cover mix-blend-lighten", props.className)}>
    </div>
  )
}

function VisViewportPlanet(props: ReturnType<typeof getResult> & {
  maxViewportScale: number,
  disableAnimation: boolean,
  children?: ReactNode,
}) {
  {/* Planet */ }
  return (
    <Circle maxHeight={props.maxViewportScale} height={props.planetRadius} disableAnimation={props.disableAnimation}
      className=""
    >
      {
        props.planetimg ? <img
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
        />
      }
      {props.children}
    </Circle >
  )
}

function VisViewportOrbit(props: {
  maxViewportScale: number,
  orbitRadius: number,
  semiMinorAxis: number,
  semiMajorAxis: number,
  disableAnimation: boolean,
  className?: string,
  children?: ReactNode
}) {
  return (
    <Circle
      maxHeight={props.maxViewportScale}
      height={props.semiMinorAxis} disableAnimation={props.disableAnimation}
      className={cn(
        "border border-px border-yellow-400/50",
        props.className,
      )}
      style={{
        transform: ` scaleY(${ props.semiMajorAxis / props.semiMinorAxis }) translateY(${ ((props.semiMajorAxis - props.orbitRadius) / (props.semiMajorAxis)) * 50 }%)`,
      }}
    >
      {props.children}
    </Circle>
  )
}


function getSatellitePosition(relayCount: number, i: number) {
  const x = Math.cos(2 * Math.PI * i / relayCount + Math.PI / 2)
  const y = -Math.sin(2 * Math.PI * i / relayCount + Math.PI / 2)
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
  const heightPercent = (props.height / props.maxHeight * 90) + '%'
  return (
    <div
      style={{ width: heightPercent, ...props.style }}
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
      <p className={cns.textMuted("col-span-2 text-xs")}>Debug Informations</p>
      <div className="contents leading-3.5">
        <p className={cns.textMuted()}>Planet Radius</p>
        <p className={cns.textMuted()}>{props.planetRadius ? prettyNum(props.planetRadius, "k", "m") : "-"}</p>

        <p className={cns.textMuted()}>Maximum Relay Range</p>
        <p className={cns.textMuted()}>{prettyNum(props.maxRelayRange ?? NaN, "k", "m")}</p>

        <p className={cns.textMuted()}>Maximum Radius based on Relay to Relay (0% strength)</p>
        <p className={cns.textMuted()}>{prettyNum(props.maxRadiusFromRelays ?? NaN, "k", "m")}</p>

        <p className={cns.textMuted()}>Minimum Radius Based of Planet Radius</p>
        <p className={cns.textMuted()}>{prettyNum(props.minRadiusBasedOnPlanet ?? NaN, "k", "m")}</p>

        <p className={cns.textMuted()}>Maximum Radius based on Relay to Vessel</p>
        <p className={cns.textMuted()}>{prettyNum(props.maxRadiusFromVessel ?? NaN, "k", "m")}</p>

        <p className={cns.textMuted()}>Lowest Low Orbit Radius</p>
        <p className={cns.textMuted()}>{(props.lowestLKO ?? NaN)}m</p>

        <p className={cns.textMuted()}>Ideal / Midpoint orbits raw value</p>
        <p className={cns.textMuted()}>{props.orbitRadius ?? NaN}m</p>
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
        <p className={cns.textMuted("col-span-2 text-xs opacity-75")}>Resonant Orbit Information</p>

        <p className={cn("text-sm")}>Orbit Altitude</p>
        <p className={cns.textGreen()}>{fixedNum(props.orbitHeight ?? NaN)}m</p>

        <p className={cn("text-sm")}>Orbital Period</p>
        <p className={cns.textGreen()}>{prettyPeriod(props.resonantOrbit.orbitalPeriod).formatted}</p>

        <p className={cn("text-sm")}>Resonant Period</p>
        <p className={cns.textGreen()}>{prettyPeriod(props.resonantOrbit.resonantPeriod).formatted}</p>

        <p className={cn("text-sm")}>{props.resonantOrbit.apsisLabel}</p>
        <p className={cns.textGreen()}>{(props.resonantOrbit.otherApsisRadius - props.planetRadius).toLocaleString('en-US')}m</p>

        <p className={cn("text-sm")}>Injection Δv</p>
        <p className={cns.textGreen()}>{props.resonantOrbit.injectioDeltaV.toLocaleString('en-US')}m</p>

        <p className={cn("text-sm")}>Mode</p>
        <p className={cns.textGreen()}>{props.resonantOrbit.mode === "diving" ? "Diving (Burn Retrograde)" : "Peaking (Burn Prograde)"}</p>

      </div>}


      <Divider className="col-span-2" />

      <p className={cns.textMuted("col-span-2 text-xs opacity-75")}>Between Each Relays</p>

      <p className={cn("text-sm")}>Distance</p>
      <p className="">{prettyNum(props.distanceBetweenRelays ?? NaN, "k", "m")}</p>

      <p className={cn("text-sm")}>Relay Strength</p>
      <div className={"text-sm flex gap-4 items-center"}>
        <SignalStrengthItems size="sm" strength={props.relayStrength ?? NaN} />
      </div>


      <Divider className="col-span-2" />

      <p className={cns.textMuted("col-span-2 text-xs opacity-75")}>Vessel to Relay</p>

      <p className={cn("text-sm")}>Distance</p>
      <p className="">{prettyNum(props.distanceFromVesselToRelay ?? NaN, "k", "m")}</p>

      <p className={cn("text-sm")}>Relay Strength</p>
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
          <div className={cns.errorTextBase("text-xs flex items-center gap-1 pb-1")}>
            <LucideTriangleAlert className={cns.errorTextBase()} />
            warning
          </div>
          {result.reason === "no relay satellite" && "No Relay Satellite. Please add a relay antenna to your relay satellite."}
          {result.reason === "no inter-relay connection" && `Relay Antenna can't reach target strength (${ strengthNum(result.relayStrength) }). Upgrade relay antenna or reduce target signal.`}
          {result.reason === "no vessel connection" && `Vessel Antenna can't reach target strength (${ strengthNum(result.vessel?.strength ?? 0) }). Upgrade vessel antenna or reduce target signal.`}
        </div>
      </>}
      {result.resonantOrbit?.status === "missing data" && <>
        <div className={cns.card("text-sm text-pretty col-span-2 mb-1 starting:opacity-0 starting:-translate-y-10 transition")}>
          <div className={cns.errorTextBase("text-xs flex items-center gap-1 pb-1")}>
            <LucideTriangleAlert className={cns.errorTextBase()} />
            warning
          </div>
          Unable to calculate Resonant Orbit. The Gravitational Parameter for this planet is not provided.
        </div>
      </>}
    </>
  )
}


function TutorialSection(result: ReturnType<typeof getResult>) {

  const burnGrade = result.resonantOrbit?.mode === "diving" ? "Retrograde" : "Prograde"
  const oppositeGrade = result.resonantOrbit?.mode === "diving" ? "Prograde" : "Retrograde"


  return (
    <section className="">
      <header className="flex flex-col mb-6">
        <h2 className="text-lg">
          Tutorial
        </h2>
        <p className={cns.textMuted("text-sm")}>So what to do when I finished picking up my orbit height?</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 [&_p]:text-sm [&_li]:text-sm [&_li]:my-1">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 my-2">
            <img className="rounded-md max-w-40" src="https://preview.redd.it/ksp-relay-network-guide-v0-uv5s8cnlfyi71.png?width=594&format=png&auto=webp&s=69eba80d43235996448e92d0402fa4982287e4df" />
            <div>
              <p>This tutorial assumes your satellite payloads are on the same craft like the picture on the left</p>
              <br />
              <p className={cns.textMuted("break-all")}>Source: https://www.reddit.com/r/KerbalSpaceProgram/comments/p9k3vu/ksp_relay_network_guide/</p>
            </div>
          </div>
          <p>After you planned your orbit, tl:dr</p>
          <ol className="list-decimal pl-8 flex flex-col">
            <li>Bring your satellite carrier to circular orbit with altitude of <Green>{fixedNum(result.orbitHeight ?? NaN)}m</Green></li>
            <li>Drop your 1st satellite payload</li>
            <li>Burn <Green>{burnGrade}</Green> until your <Green>{result.resonantOrbit?.apsisLabel}</Green> reaches <Green>{((result.resonantOrbit?.otherApsisRadius ?? NaN) - (result.planetRadius ?? NaN)).toLocaleString('en-US')}m</Green></li>
            <li>Wait one full orbit</li>
            <li>Burn <Green>{oppositeGrade}</Green> until your <Green>{result.resonantOrbit?.apsisLabel}</Green> reaches back to <Green>{fixedNum(result.orbitHeight ?? NaN)}m</Green></li>
            <p>-- Repeat step 2 until all payload is deployed --</p>
            <li>Adjust each satellites orbit to make sure each have the same period</li>
          </ol>
          <h3>Tips</h3>
          <ul className="list-disc pl-8 flex flex-col">
            <li>
              <p>Set the decoupler force to 0 to prevent your satellite's orbit getting ruined.</p>
            </li>
            <li>
              <p>You can find the Period by clicking the orbit information UI (the purple tab on the bottom left GUI).</p>
              <img src="/orbitinfo.png" className="my-2 rounded-lg max-w-80" />
            </li>
            <li>
              <p>You can adjust the thrust limiter to give a more sensitive adjustments to as low as 0.5 when making sure the Period is the same for all satellites.</p>
              <img src="/thrustlimiter.png" className="my-2 rounded-lg max-w-80" />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <TutorialAnimation {...result} />
        </div>
      </div>
    </section>
  )
}

function TutorialAnimation(result: ReturnType<typeof getResult>) {

  const maxViewportScale = Math.max(((result.orbitRadius) ?? 0) * 1.4, result.resonantOrbit?.otherApsisRadius ?? 0)

  const [ time, setTime ] = useState(0) // in s
  const [ targetTime, setTargetTime ] = useState(0)
  const [ isPlaying, setIsPlaying ] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const startTime = performance.now()
    const from = time
    const to = timeline.stepToTimemark[ targetTime ]
    console.log(from, to)
    const duration = Math.abs(to - from) * 500 // 1 timeline second = 1 real second
    let frame: number
    const ease = (t: number) => t
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = ease(progress)
      const nextTime =
        from + (to - from) * easedProgress
      setTime(nextTime)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTime(to)
        setIsPlaying(false)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [ isPlaying, targetTime ])


  if (!result.orbitRadius || !result.resonantOrbit.semiMajorAxis) return null

  const relayCount: number = result.relayCount

  const orbitRadius = result.orbitRadius
  const semiMajorAxis = result.resonantOrbit.semiMajorAxis
  const semiMinorAxis = result.resonantOrbit.semiMinorAxis
  const isDiving = result.resonantOrbit.mode === "diving"

  const timeline = (() => {
    const burnToResonantOrbit = {
      semiMajorAxis: lerp([ orbitRadius, semiMajorAxis ], easeInOutSine),
      semiMinorAxis: lerp([ orbitRadius, semiMinorAxis ], easeInOutSine),
    }
    const burnToNormalOrbit = {
      semiMajorAxis: lerp([ semiMajorAxis, orbitRadius ], easeInOutSine),
      semiMinorAxis: lerp([ semiMinorAxis, orbitRadius ], easeInOutSine),
    }

    const toRetrograde = lerp([ 0, 180 ], bezier(.47, .01, .9, 1.1))
    const toPrograde = lerp([ 180, 0 ], bezier(.47, .01, .9, 1.1))

    const flameSize = sequencer([
      { range: [ 0, 0.1 ], fn: lerp([ 0, 1 ]) },
      { range: [ 0.1, 0.9 ], fn: lerp([ 1, 1 ]) },
      { range: [ 0.9, 1 ], fn: lerp([ 1, 0 ]) },
    ])

    type AnimationShape = {
      semiMajorAxis: InterpolatorFn,
      semiMinorAxis: InterpolatorFn,
      rocketPhase: InterpolatorFn,
      rocketRot: InterpolatorFn,
      rocketOpacity: InterpolatorFn,
      helperText: InterpolatorFn<string>,
      timeWarp: InterpolatorFn,
      flameSize: InterpolatorFn,
      direction: InterpolatorFn<"prograde" | "retrograde">,
    } & { [ key in `satellite${ number }Scale` ]: InterpolatorFn }
      & { [ key in `satellite${ number }Phase` ]: InterpolatorFn }
      & { [ key in `satellite${ number }Opacity` ]: InterpolatorFn }

    type AnimationSequenceItem = SlideshowSequenceItem<AnimationShape>

    const burnToResonant: AnimationSequenceItem = { duration: 2, props: { helperText: constant(`Initiate Burn until ${ result.resonantOrbit.apsisLabel.slice(0, 2) } = ${ (result.resonantOrbit.otherApsisRadius - result.planetRadius).toLocaleString('en-us') }m`), ...burnToResonantOrbit, flameSize }, }
    const burnToOrbit: AnimationSequenceItem = { duration: 2, props: { helperText: constant("Circularize"), ...burnToNormalOrbit, flameSize } }
    const aimPrograde: AnimationSequenceItem = { duration: 1, props: { helperText: constant("Aim Prograde"), rocketRot: toPrograde, direction: constant("prograde") } }
    const aimRetrograde: AnimationSequenceItem = { duration: 1, props: { helperText: constant("Aim Retrograde"), rocketRot: toRetrograde, direction: constant("retrograde") } }
    const timewarpSequence = sequencer([
      { range: [ 0, 0.3 ], fn: lerp([ 0, 5 ]) },
      { range: [ 0.3, 0.7 ], fn: lerp([ 5, 5 ]) },
      { range: [ 0.7, 1 ], fn: lerp([ 5, 0 ]) },
    ])

    const slideshowSequenceRelaySteps: AnimationSequenceItem[] = []
    // Build the n-relay count step-by-step animation
    // 1 = | !drop!,
    // 2 = | !drop!, aim, burn, wait, aim, burn, | !drop!
    // 3 = | !drop!, aim, burn, wait, aim, burn, | !drop!, aim, burn, wait, aim, burn, | !drop!

    for (let i = 1; i <= relayCount; i++) {
      // console.log('i',i)
      // Build the satellite orbit animations 
      //      j1                         j2
      // i1 = [0 ,          (2/3 | 4/3)] [_, _]
      // i2 = [(2/3 | 4/3), (4/3 | 8/3)] [0, (2/3 | 4/3)]

      // Add slideshow part
      slideshowSequenceRelaySteps.push({
        duration: 1, props: {
          helperText: constant(`Drop your ${ ordinal(i) } payload`),
          [ `satellite${ i }Scale` ]: easeOutBack,
        }
      })

      if (i === relayCount) continue

      const satelliteOrbitAnim: Partial<AnimationShape> = {}
      for (let j = 1; j <= i; j++) {
        const nominatorPart = isDiving ? (relayCount - 1) : (relayCount + 1)
        const startPhase = ((i - j) * nominatorPart) / relayCount
        const endPhase = ((i - j + 1) * nominatorPart) / relayCount
        satelliteOrbitAnim[ `satellite${ j }Phase` ] = lerp([ startPhase, endPhase ], easeInOutCubic)
      }

      slideshowSequenceRelaySteps.push(
        isDiving ? aimRetrograde : i === 1 ? undefined : aimPrograde,
        burnToResonant,
        {
          duration: 4, props: {
            helperText: constant("Wait full orbit"),
            rocketPhase: lerp([ 0, 1 ], easeInOutCubic),
            ...satelliteOrbitAnim,
            timeWarp: timewarpSequence,
          }
        },
        isDiving ? aimPrograde : aimRetrograde,
        burnToOrbit,
      )

    }



    const {
      stepToTimemark,
      totalDuration,
      fn,
      slideLength,
    } = slideshowSequencer<AnimationShape>([
      {
        duration: 2, props: {
          helperText: constant("The Orbit is going this way. ➡️"),
          rocketPhase: lerp([ 0, 1 ], easeInOutCubic),
          direction: constant("prograde")
        },
      },

      ...slideshowSequenceRelaySteps,

      // Manual
      // {
      //   duration: 1, props: {
      //     helperText: constant("Drop your 1st payload"),
      //     satellite1Scale: easeOutBack,
      //   },
      // },
      // isDiving ? aimRetrograde : undefined,
      // burnToResonant,
      // {
      //   duration: 4, props: {
      //     helperText: constant("Wait full orbit"),
      //     rocketPhase: lerp([ 0, 1 ], easeInOutCubic),
      //     satellite1Phase: lerp([ 0, isDiving ? 2 / 3 : 4 / 3 ], easeInOutCubic),
      //     timeWarp: timewarpSequence,
      //   }
      // },
      // isDiving ? aimPrograde : aimRetrograde,
      // burnToOrbit,
      // {
      //   duration: 1, props: {
      //     helperText: constant("Drop 2nd payload"),
      //     satellite2Scale: easeOutBack,
      //   }
      // },
      // isDiving ? aimRetrograde : aimPrograde,
      // burnToResonant,
      // {
      //   duration: 4, props: {
      //     helperText: constant("Wait full orbit"),
      //     rocketPhase: lerp([ 0, 1 ], easeInOutCubic),
      //     satellite1Phase: lerp([ isDiving ? 2 / 3 : 4 / 3, isDiving ? 4 / 3 : 8 / 3 ], easeInOutCubic),
      //     satellite2Phase: lerp([ 0, isDiving ? 2 / 3 : 4 / 3 ], easeInOutCubic),
      //     timeWarp: timewarpSequence,
      //   }
      // },
      // isDiving ? aimPrograde : aimRetrograde,
      // burnToOrbit,
      // {
      //   duration: 1, props: {
      //     helperText: constant("Drop 3rd payload"),
      //     satellite3Scale: easeOutBack,
      //   }
      // },
      {
        duration: 1, props: {
          helperText: constant("Done! 🎉"),
          rocketRot: isDiving ? undefined : toPrograde,
          rocketOpacity: lerp([ 1, 0 ])
        }
      }
    ])

    const tl = fn(time)

    // console.log()

    return {
      slideLength,
      stepToTimemark,
      duration: totalDuration,
      ...tl,
      parts: tl,
      // helperText: tl.helperText,
      // semiMajorAxis: tl.semiMajorAxis,
      // semiMinorAxis: tl.semiMinorAxis,
      // rocketPhase: tl.rocketPhase,
      // rocketRot: tl.rocketRot,
      // rocketOpacity: tl.rocketOpacity,
      // // satellite: [
      // //   {
      // //     phase: tl.satellite1Phase,
      // //     opacity: tl.satellite1Opacity,
      // //     scale: tl.satellite1Scale
      // //   },
      // //   {
      // //     phase: tl.satellite2Phase,
      // //     opacity: tl.satellite2Opacity,
      // //     scale: tl.satellite2Scale
      // //   },
      // //   {
      // //     phase: tl.satellite3Phase,
      // //     opacity: tl.satellite3Opacity,
      // //     scale: tl.satellite3Scale
      // //   },
      // // ],
      // timeWarp: tl.timeWarp,
      // flameSize: tl.flameSize,
      // direction: tl.direction
    }
  })()

  // console.log(timeline.parts[ 'satellite1Phase' ])


  return (<>
    <div className="flex gap-4 items-center">
      <button
        disabled={targetTime === 0}
        className={cns.buttonBase("w-20")} onClick={() => {
          if (targetTime <= 0) return
          setTime(timeline.stepToTimemark[ targetTime ])
          setTargetTime(targetTime - 1)
          setIsPlaying(true)
        }}>
        Prev
      </button>
      <button
        disabled={targetTime >= timeline.slideLength}
        className={cns.buttonBase("w-20")} onClick={() => {
          if (targetTime >= timeline.duration) return
          setTime(timeline.stepToTimemark[ targetTime ])
          setTargetTime(targetTime + 1)
          setIsPlaying(true)
        }}>
        Next
      </button>

      <div className="grow">
        Step {targetTime + 1} of {timeline.slideLength + 1}
      </div>

      <button
        className={cns.buttonBase("w-20")} onClick={() => {
          setTime(0)
          setTargetTime(0)
        }}>
        Restart
      </button>
    </div>
    <VisViewport>
      <div className="z-20 absolute top-0 left-0 flex flex-col w-full">
        <KSPBox outerClassName={"min-w-1/2 w-fit"}>
          {targetTime === 0 ? "Press 'Next' to start visualization" : timeline.helperText}
        </KSPBox>
        <TimeWarpBox level={timeline.timeWarp} />
        <img src={`/${ timeline.direction }.png`} className="m-2 w-12" />
      </div>
      <VisViewportSkybox />
      <VisViewportPlanet {...result} maxViewportScale={maxViewportScale} disableAnimation={false} />

      {/* Changing Resonant Orbit */}
      <VisViewportOrbit
        maxViewportScale={maxViewportScale}
        orbitRadius={result.orbitRadius}
        semiMajorAxis={timeline.semiMajorAxis}
        semiMinorAxis={timeline.semiMinorAxis}
        disableAnimation={true}
        className={cn(
          "border-[#008C92] border-2 z-10",
        )}
      >
        {/* Plane */}
        <VisViewportObjectAlongOrbit
          phase={timeline.rocketPhase}
        >
          <div className="absolute flex items-center justify-center"
            style={{
              rotate: `${ 90 + timeline.rocketRot }deg`,
              opacity: `${ timeline.rocketOpacity }`,
              scale: `2.5`,
            }}
          >
            <GlyphsPolyRocket className="absolute z-10" />
            <OpenmojiFire
              style={{
                transformOrigin: "bottom center",
                rotate: '180deg',
                scale: `${ 0.5 * timeline.flameSize }`,
                translate: `0 -0.15rem`
              }}
            />
          </div>
        </VisViewportObjectAlongOrbit>

        {/* Apsis Marker */}
        <ApsisMarker
          apsisLabel={result.resonantOrbit.apsisLabel}
        />
      </VisViewportOrbit>
      <VisViewportOrbit
        maxViewportScale={maxViewportScale}
        orbitRadius={result.orbitRadius}
        semiMajorAxis={result.resonantOrbit.semiMajorAxis}
        semiMinorAxis={result.resonantOrbit.semiMinorAxis}
        disableAnimation={true}
        className={cn(
          "border-zinc-400/50 border-dashed -z-10",
        )}
      >
        <ApsisMarker
          apsisLabel={result.resonantOrbit.apsisLabel}
          className="text-zinc-400/50 -z-10"
        />
      </VisViewportOrbit>
      <VisViewportOrbit
        maxViewportScale={maxViewportScale}
        orbitRadius={result.orbitRadius}
        semiMajorAxis={result.orbitRadius}
        semiMinorAxis={result.orbitRadius}
        disableAnimation={true}
        className={cn(
          "border-zinc-400/50 border-dashed -z-10",
        )}
      >
        {Array.from({ length: relayCount }, (_, i) => {
          const phase = timeline.parts[ `satellite${ i + 1 }Phase` ]
          const opacity = timeline.parts[ `satellite${ i + 1 }Opacity` ]
          const scale = timeline.parts[ `satellite${ i + 1 }Scale` ]
          // console.log("sa  tellite", i + 1, phase)
          if (Number.isNaN(scale)) return null
          return (
            <VisViewportObjectAlongOrbit
              key={i}
              phase={phase}
              className={`${ i }`}
              style={{ opacity: opacity, scale: 2 * scale }}
            >
              <EmojioneSatellite className="absolute" />
            </VisViewportObjectAlongOrbit>
          )
        })}
        {/* {timeline.satellite.map((s, i) => {
          return (
            <VisViewportObjectAlongOrbit
              key={i}
              phase={s.phase}
              style={{ opacity: s.opacity, scale: 2 * s.scale }}
            >
              <EmojioneSatellite className="absolute" />
            </VisViewportObjectAlongOrbit>
          )
        })} */}
      </VisViewportOrbit>

    </VisViewport>
    <div className={cns.textMuted("text-sm")}>
      Visualizing how to drop {relayCount} equi-distant satellites in body of {result.planetlabel} with initial altitude of {result.orbitHeight.toLocaleString('en-US')} meters
    </div>
  </>)
}


function TimeWarpBox(props: {
  level: number
}) {
  const level = Math.round(props.level)

  return (
    <KSPBox outerClassName={"w-fit"} innserClassName="flex">
      <MdiTriangle className={cn("rotate-90", level < 0 && "text-[#101C13]")} />
      <MdiTriangle className={cn("rotate-90", level < 1 && "text-[#101C13]")} />
      <MdiTriangle className={cn("rotate-90", level < 2 && "text-[#101C13]")} />
      <MdiTriangle className={cn("rotate-90", level < 3 && "text-[#101C13]")} />
      <MdiTriangle className={cn("rotate-90", level < 4 && "text-[#101C13]")} />
      <MdiTriangle className={cn("rotate-90", level < 5 && "text-[#101C13]")} />
    </KSPBox>
  )
}


function ApsisMarker(props: {
  apsisLabel: string,
  className?: string,
}) {
  return (
    <VisViewportObjectAlongOrbit
      phase={1 / 2}
    >
      <div className={cn("-translate-y-full -translate-x-1/2 flex flex-col items-center text-[0.7em] text-[#008C92] leading-3", props.className)}>
        {props.apsisLabel.slice(0, 2)}
        <MdiTriangle className="rotate-180 text-xs" />
      </div>
    </VisViewportObjectAlongOrbit>
  )
}