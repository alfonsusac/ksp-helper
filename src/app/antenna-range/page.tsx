"use client"

import { Fragment, useEffect, useState } from "react"
import { Slider, CheckboxRow, SelectRow, TabSelectRow } from "../../ui/input"
import { ShareAppURLButton } from "../../ui/button"
import { getMaximumRange, getPowerPowerRating, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload, type BodyPayload } from "../../lib/antenna"
import { prettyNum } from "../../lib/prettier"
import { EosIconsPod, IcRoundSatelliteAlt, LucideArrowRight, LucideBadgeQuestionMark } from "../../ui/icons"
import { cn } from "../../ui/cn"
import { getSignalStrengthDistanceMap } from "../../lib/distance"
import { formatCss, interpolate } from "culori"
import { Divider, HomeButton, SignalSymbol } from "../../ui/common"
import { getData, type AntennaData, type PlanetData } from "../../lib/packages"
import { useAntennaRangeAppStateData, type AntennaCalculatorData } from "@/lib/antenna-range/app-state"
import { cns } from "@/design-system"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"
import { AntennaInput } from "@/ui/antenna-select-menu"
import { Footer } from "@/ui/footer"
import { WhatIsThisSection } from "@/ui/prose"
import SignalStrengthItems from "@/ui/signal-strength"
import { SettingsSection, useGlobalSettings } from "@/ui/settings-section"



export default function Home() {

  const [ settings, setSettings ] = useGlobalSettings()
  const [ data, setData ] = useAntennaRangeAppStateData()
  if (!data || !settings) return null

  console.log(settings)

  const mode = data[ 0 ].type === "ksc" ? "direct" : "relay"
  const rangeModifier = settings.rangeModifier || 1
  const dsnModifier = settings.dsnModifier || 1

  const { antennas, planets } = getData(settings.contents, settings)
  const { value: maximumRange, zeroReason } = getMaximumRange({ body1: data[ 0 ], body2: data[ 1 ], dsnModifier, rangeModifier, antennaData: antennas })

  const changeBodyType = (which: 0 | 1, type: "ksc" | "ship") => {
    data[ which ].type = type
    setData({ ...data })
  }
  const changeData = (which: 0 | 1, input: BodyPayload) => {
    data[ which ] = input
    setData({ ...data })
  }

  return (
    <div className={cns.page()}>

      <HomeButton />

      <header>
        <h1 className={cns.pageTitle()}>
          KSP Calculator: Maximum Antenna Range
        </h1>
        <div className={cns.pageDescription()}>
          Calculate the maximum antenna range between two bodies
        </div>
      </header>

      <div className="flex flex-col gap-1">

        <h2 className="text-lg">
          Mode
        </h2>
        <TabSelectRow
          items={[
            {
              value: "ksc-ship", label: <div className="flex flex-col">
                <div>KSC to Ship</div>
                <div className={cns.text.muted("text-xs")}>Direct Mode</div>
              </div>
            }, {
              value: "ship-ship", label: <div className="flex flex-col">
                <div>Ship to Ship</div>
                <div className={cns.text.muted("text-xs")}>Relay Mode</div>
              </div>
            },
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

      <Divider className="my-2" />
      <BodyDetailInput which={0} payload={data[ 0 ]} onChange={(n) => changeData(0, n)} dsnModifier={dsnModifier} mode={mode} antennas={antennas} />
      <Divider className="my-2" />
      <BodyDetailInput which={1} payload={data[ 1 ]} onChange={(n) => changeData(1, n)} dsnModifier={dsnModifier} mode={mode} antennas={antennas} />
      <Divider className="mt-2" />

      {
        zeroReason &&
        <div className={cns.errorCard("mb-8")}>
          <div className="flex gap-1 items-center">
            <LucideBadgeQuestionMark />
            <div>Reason why its zero</div>
          </div>
          <div className={cns.error.text.muted("text-xs")}>
            {zeroReason}
          </div>
        </div>
      }

      <header>
        <div className={cns.text.muted("text-xs")}>Output</div>
        <h2 className="text-lg">
          Result
        </h2>
      </header>

      <ResultSection
        className="pb-10"
        data={data}
        maximumRange={maximumRange}
        mode={mode}
        planets={planets}
      />

      <Divider className="mb-2" />

      <h2 className="text-lg">
        Settings
      </h2>

      <SettingsSection settings={settings} onSettingsChange={setSettings} />

      <Divider className="my-2" />

      <WhatIsThisSection
        descs={[
          `This calculator helps determine the Maximum Antenna Range in the game Kerbal Space Program which can be used to determine how high your relay orbit should
          be if you want to constraint to one type of antenna (as opposed to spamming 88-88 in every ship).`,

          `It can also be used to calculate the strength of the rating to calculate how many
          percent of science can be transmitted from a vessel.`
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
            title: "Science transmission relation to signal strength",
            href: "https://forum.kerbalspaceprogram.com/topic/200317-science-transmission-relation-to-signal-strength",
          },
          {
            title: "Signal Strength vs Science Bonus (Redone)",
            href: "https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8",
          },
          {
            title: "Min and Max Distance between Planets",
            href: "https://forum.kerbalspaceprogram.com/topic/100439-min-max-distances-betwen-planets/",
          },
        ]}
        priorWork={[
          {
            title: "KSP CommNet Signal Strength Calculator & Antenna Selector",
            author: "poodmund",
            href: "https://docs.google.com/spreadsheets/d/1qIgFB8OXnlgpPCGsxv7JYUYQq5O671IcZXpumVaStek/htmlview",
          },
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
        ]}
      />
      <Divider className="my-2" />
      <Footer />
    </div>
  )
}















function ResultSection(props: {
  className?: string,
  maximumRange: number,
  data: AntennaCalculatorData,
  planets: PlanetData,
  mode: "direct" | "relay"
}) {
  const { maximumRange, className, data, planets, mode } = props

  const [ d, setD ] = useState(props.maximumRange / 2)
  useEffect(() => {
    if (d > props.maximumRange)
      setD(props.maximumRange)
  }, [ props.maximumRange ])

  return (
    <div className={cn("flex flex-col sm:flex-row gap-6", className)}>
      <div className="min-w-50">

        <div className="flex sm:flex-col gap-x-8 gap-y-4 flex-wrap">
          <div className="">
            <div className={cns.text.muted("")}>
              Maximum Antenna Range
            </div>
            <div className="text-2xl font-semibold">
              {prettyNum(maximumRange, "k", "m")}
            </div>
            <div>
              {maximumRange.toLocaleString() + "m"}
            </div>
          </div>

          <div className="">
            <div className={cns.text.muted("mb-2")}>
              Signal Strengths
            </div>
            <div className="grid grid-cols-[3rem_auto_2rem] gap-x-2">
              <div className={cns.text.muted("text-end")}>{'≥'}95.5%</div>
              <div>{prettyNum(maximumRange * 0.0414).toLocaleString() + "m"}</div>
              <div className={cns.button.iconGhost("size-5 p-1")}
                onClick={() => setD(maximumRange * 0.0414)}
              ><LucideArrowRight /></div>

              <div className={cns.text.muted("text-end")}>~90%</div>
              <div>{prettyNum(maximumRange * 0.19580).toLocaleString() + "m"}</div>
              <div className={cns.button.iconGhost("size-5 p-1")}
                onClick={() => setD(maximumRange * 0.19580)}
              ><LucideArrowRight /></div>

              <div className={cns.text.muted("text-end")}>~80%</div>
              <div>{prettyNum(maximumRange * 0.28714).toLocaleString() + "m"}</div>
              <div className={cns.button.iconGhost("size-5 p-1")}
                onClick={() => setD(maximumRange * 0.28714)}
              ><LucideArrowRight /></div>

              <div className={cns.text.muted("text-end")}>~70%</div>
              <div>{prettyNum(maximumRange * 0.36326).toLocaleString() + "m"}</div>
              <div className={cns.button.iconGhost("size-5 p-1")}
                onClick={() => setD(maximumRange * 0.36326)}
              ><LucideArrowRight /></div>
            </div>
          </div>
        </div>

        <ShareAppURLButton data={data} className="mt-4 w-full" />
      </div>

      <Divider className="hidden sm:block" />

      <div className="flex flex-col gap-6 grow">
        <Divider className="sm:hidden" />

        <div className="flex flex-col">
          <div className={cns.text.muted("text-sm mb-2")}>
            Strengths by Distance + Science Bonus
          </div>
          <DistanceStrengthCalculator
            maximumRange={maximumRange}
            mode={mode}
            distance={d}
            setDistance={setD}
          />
        </div>
        <Divider />
        <div>
          <div className={cns.text.muted("text-sm mb-2")}>
            Will it reach?
          </div>
          <PlanetDistanceTableView maximumRange={maximumRange} mode={mode} planetData={planets} />
        </div>
      </div>

    </div>
  )
}



function BodyDetailInput(props: {
  which: 0 | 1,
  payload: BodyPayload,
  dsnModifier: number,
  mode: "relay" | "direct",
  onChange: (newpayload: BodyPayload) => void,
  antennas: AntennaData,
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

  const changeIsRelay = (v: boolean) => {
    if (props.payload.type !== "ship") return
    props.payload.isRelay = v
    props.onChange({ ...props.payload })
  }

  const changeAntennaPayload = (a: AntennaPayload) => {
    if (props.payload.type !== 'ship') return
    props.payload.antennas = a
    props.onChange({ ...props.payload })
  }

  const clearAntenna = (type: string) => {
    if (props.payload.type !== 'ship') return
    props.payload.antennas.set(type, 0)
    props.onChange({ ...props.payload })
  }

  return (
    <div className="flex flex-col gap-3">
      <header>
        <div className={cns.text.muted("text-xs")}>Body {props.which + 1}</div>
        <h2 className="text-lg -mb-0.5">
          {props.payload.type === "ksc" ? "KSC" : "Ship"}
        </h2>
        <div className={cns.text.muted()}>Power Rating: {prettyNum(getPowerPowerRating(props.payload, props.dsnModifier, props.antennas))}</div>
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-3 flex-wrap">
              <CheckboxRow
                label={<>
                  <EosIconsPod className="size-6 rotate-45 -translate-y-0.5" />
                  Has Command Module?
                </>}
                value={props.payload.hasCommandModule}
                onValueChange={changeHasCommandModule}
              />
              <CheckboxRow
                label={<>
                  <IcRoundSatelliteAlt className="size-6 -translate-y-0.5" />
                  Is it a relay?
                </>}
                value={props.payload.isRelay}
                onValueChange={changeIsRelay}
              />
              <div className="grow" />
              <button
                className={cns.button.ghost("w-fit text-sm")}
                onClick={() => {
                  props.antennas.forEach(antenna => clearAntenna(antenna.id))
                }}
              >Reset All</button>
            </div>
            <AntennaInput
              value={props.payload.antennas}
              onChange={changeAntennaPayload}
              antennas={props.antennas}
            />
          </div>
      }
    </div>
  )
}





function DistanceStrengthCalculator(props: {
  maximumRange: number,
  mode: "relay" | "direct",
  distance: number,
  setDistance: (d: number) => void,
}) {
  const { distance, setDistance } = props

  const signalStrength = getStrength(props.maximumRange, distance)
  const scienceBonus = getScienceBonusfromSignalStrength(signalStrength)

  const binCount = 50
  const bins = Array.from({ length: binCount }, (_, i) => {
    const distance = props.maximumRange / binCount * i
    const strength = getStrength(props.maximumRange, distance)
    return strength
  })

  const scienceBins = bins.map(str => {
    return getScienceBonusfromSignalStrength(str).bonusPercentage
  })

  return (
    <div className="flex flex-col gap-4">

      <div className="flex  gap-4 items-center">
        <div className="place-items-end min-w-34">Distance: {prettyNum(distance, "k", "m")}</div>
        <Divider className={cns.dividerStrong("h-6")} />
        <SignalStrengthItems
          strength={signalStrength}
        />
      </div>

      <div className="flex gap-2 text-sm items-center">
        <div className={cns.text.muted("text-xs font-normal pt-20 pr-2 capitalize")}>
          {props.mode}
        </div>

        <div className="h-20 flex flex-col grow">
          <div className="grow relative flex items-end ">
            {bins.map((str, i) => {
              return (
                <div key={i} className="h-full relative" style={{ width: `calc(1 / ${ binCount } * 100%)` }}>
                  <div className={cn(
                    "absolute w-full bottom-0",
                    str < 0.25 ? cns.graphBarBg1() : str < 0.5 ? cns.graphBarBg2() : str < 0.75 ? cns.graphBarBg3() : cns.graphBarBg4()
                  )} style={{
                    height: (str * 100).toFixed(2) + '%',
                  }} />
                  <div className={cns.graphBarScience("absolute w-full bottom-0")} style={{
                    height: (scienceBins[ i ] * 50).toFixed(2) + '%',
                  }} />
                </div>
              )
            })}
          </div>
          <Slider
            min={0}
            max={props.maximumRange}
            value={distance}
            onValueChange={(e) => setDistance(e)}
          />
        </div>
        <div className={cns.text.muted("text-xs font-normal pt-20 pl-2")}>Max</div>
      </div >
    </div>

  )
}


function PlanetDistanceTableView(props: {
  maximumRange: number,
  mode: "direct" | "relay",
  planetData: PlanetData
}) {

  const [ _from, setFrom ] = useState<"Kerbin" | string>("Kerbin")

  const from = props.mode === "direct" ? "Kerbin" : _from

  const result = getSignalStrengthDistanceMap(from, props.maximumRange, props.planetData)

  return (
    <div className="flex flex-col gap-4">
      <div>
        {props.mode === "relay" && <>
          <div className="flex gap-2 items-center">
            I am in
            <PlanetSelectMenu
              value={from}
              onValueChange={setFrom}
              planetData={props.planetData}
              filter={(planet) => {
                if (Object
                  .entries(planet.to ?? {})
                  .filter(e => e[ 1 ] !== null)
                  .length === 1) {
                  return false
                }
                return true
              }}
            />
          </div>
        </>}
      </div>
      {
        !result ?
          <div className={cns.card("text-sm p-2 px-3")}>
            No data for this planet
          </div>
          :
          <div className="grid grid-cols-[6rem_auto_auto] text-sm gap-1">
            {
              props.mode === "direct"
                ? <div className="pb-2">From KSC to my ship in:</div>
                : <div className="pb-2">My other ship is in:</div>
            }
            <div className={cns.text.muted("pb-2 place-self-center text-pretty max-w-34 text-center")}>
              Strength at Closest Distance
            </div>
            <div className={cns.text.muted("pb-2 place-self-center text-pretty max-w-34 text-center")}>
              Strength at Furthest Distance
            </div>
            {result.map((row, i) => {
              if (row.minDistance === null && row.maxDistance === null)
                return null

              console.log(row)
              return <Fragment key={i}>
                <div className={cns.text.muted("h-6")}>{row.label}</div>
                <PlanetDistanceStrengthCell strength={row.minStrength} />
                <PlanetDistanceStrengthCell strength={row.maxStrength} />
              </Fragment>
            })}
          </ div>
      }
    </div>
  )
}

function PlanetDistanceStrengthCell(props: {
  strength: number | null
}) {
  const getStrengthColor = (strength: number) => {
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
    res.alpha = 0.2
    return formatCss(res)
  }

  const scienceBonus = getScienceBonusfromSignalStrength(props.strength ?? 0)

  return (
    <div className={cns.cellNoData("h-6 p-1 w-full rounded-md flex gap-2 items-center justify-center")}
      style={{
        background: props.strength !== null ? getStrengthColor(props.strength) : undefined
      }}
    >
      <SignalSymbol strength={props.strength ?? undefined} />
      {props.strength === null ? <></> : Math.round(props.strength * 100) + "%"}
      {props.strength !== null &&
        <>
          <Divider className={cns.dividerFaded()} />
          <SignalSymbol barClassname={cns.graphBarScience2()} />
          <div className={cns.textScience("text-[0.9em]")}>
            +{scienceBonus.bonus}%
          </div>
        </>
      }
    </div>
  )
}


