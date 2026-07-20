"use client"

import { Fragment, useEffect, useState } from "react"
import { Slider, CheckboxRow, SelectRow, TabSelectRow, MenuPopup, MenuHelperText, MenuItem } from "../ui/input"
import { ShareURLButton } from "../ui/button"
import { getMaximumRange, getPowerPowerRating, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload, type BodyPayload } from "../lib/antenna"
import { prettyNum } from "../lib/prettier"
import { EmojioneMonotoneSatelliteAntenna, EosIconsPod, IcBaselineDiscord, IcRoundSatelliteAlt, LucideArrowUpRight, LucideBadgeQuestionMark, LucideCheck, LucideChevronDown, LucideMinus, LucidePlus, LucideRotateCcw, LucideShare2, LucideX, MdiGithub, StreamlineWifiAntennaRemix } from "../ui/icons"
import { cn } from "../ui/cn"
import { CitationList } from "../ui/list"
import { getSignalStrengthDistanceMap } from "../lib/distance"
import { formatCss, interpolate, oklch } from "culori"
import { Divider, SignalSymbol } from "../ui/common"
import { Menu } from '@base-ui/react/menu'
import { getData, getPackageName, packageNames, packages, type AntennaData, type PackageNames, type PlanetData } from "../lib/packages"
import { groupToList } from "@/lib/object"
import { initialData, parseAppData, type AppData } from "@/lib/app-state"
import { generateShareURL, loadFromLocalStorage, saveToLocalStorage } from "@/lib/persistance"
import { cns, menuTrigger } from "@/ui/design-system"



export default function Home() {
  const [ data, setData ] = useState<AppData | undefined>(undefined)

  useEffect(() => {
    saveToLocalStorage(data)
  }, [ data ])

  useEffect(() => {
    const fromSp = new URLSearchParams(window.location.search).get('data')
    if (fromSp) {
      setData(parseAppData(fromSp, initialData))
      const url = new URL(window.location.href)
      url.searchParams.delete("data")
      window.history.replaceState({}, "", url)
    } else {
      setData(loadFromLocalStorage())
    }
  }, [])

  if (!data) return null

  const mode = data[ 0 ].type === "ksc" ? "direct" : "relay"
  const rangeModifier = parseInt(data.settings.rangeModifier) || 1
  const dsnModifier = parseInt(data.settings.dsnModifier) || 1

  const changeBodyType = (which: 0 | 1, type: "ksc" | "ship") => {
    data[ which ].type = type
    setData({ ...data })
  }
  const changeData = (which: 0 | 1, input: BodyPayload) => {
    data[ which ] = input
    setData({ ...data })
  }
  const changeModifier = (setting: "rangeModifier" | "dsnModifier", value: string) => {
    data.settings[ setting ] = value
    setData({ ...data })
  }
  const changeContentToggle = (which: PackageNames, value: boolean) => {
    data.settings.contents[ which ] = value
    setData({ ...data })
  }

  const { antennas, planets } = getData(data.settings.contents)

  const { value: maximumRange, zeroReason } = getMaximumRange({ body1: data[ 0 ], body2: data[ 1 ], dsnModifier, rangeModifier, antennaData: antennas })

  return (
    <div className={cns.text.base("p-8 flex flex-col gap-4 max-w-200 w-screen")}>

      <header>
        <h1 className="text-xl tracking-tight font-semibold">
          KSP Calculator: Maximum Antenna Range
        </h1>
        <div className={cns.text.muted("text-sm font-semibold")}>
          Calculate the maximum antenna range between two bodies
        </div>
      </header>

      <div className="text-sm flex flex-col gap-1">

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
        <div className={cns.errorCard("text-sm mb-8")}>
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
      <div className="pb-10 flex flex-col sm:flex-row gap-6">
        <div className="min-w-50">

          <div className={cns.text.muted("text-sm")}>
            Maximum Antenna Range
          </div>
          <div className="text-2xl font-semibold">
            {prettyNum(maximumRange, "k", "m")}
          </div>
          <div>
            {maximumRange.toLocaleString() + "m"}
          </div>
          <div className={cns.text.muted("text-sm mt-4 mb-2")}>
            Signal Strengths
          </div>
          <div className="text-sm grid grid-cols-[3rem_auto] gap-x-2">
            <div className={cns.text.muted("text-end")}>{'≥'}95.5%</div>
            <div>{prettyNum(maximumRange * 0.0414).toLocaleString() + "m"}</div>
            <div className={cns.text.muted("text-end")}>~90%</div>
            <div>{prettyNum(maximumRange * 0.19580).toLocaleString() + "m"}</div>
            <div className={cns.text.muted("text-end")}>~80%</div>
            <div>{prettyNum(maximumRange * 0.28714).toLocaleString() + "m"}</div>
            <div className={cns.text.muted("text-end")}>~70%</div>
            <div>{prettyNum(maximumRange * 0.36326).toLocaleString() + "m"}</div>
          </div>

          <ShareURLButton
            value={generateShareURL(data)}
            className={cns.button.base("text-sm w-full mt-4")}
            label={<>
              <LucideShare2 />
              Share URL</>}
            copied={<>
              <LucideCheck />
              Link Copied
            </>}
          />
        </div>

        <Divider className="hidden sm:block" />

        <div className="flex flex-col gap-6 grow">
          <Divider className="sm:hidden" />

          <div className="flex flex-col">
            <div className={cns.text.muted("text-sm mb-2")}>
              Strengths by Distance + Science Bonus
            </div>
            <DistanceStrengthCalculator maximumRange={maximumRange} mode={mode} />
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

      <Divider className="mb-2" />

      <h2 className="text-lg">
        Settings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-0.5">
          <label className={cns.text.base("text-xs")}>Additional Contents</label>
          <div className="flex flex-col gap-0 mt-2">
            {packageNames.map(pack => {
              if (pack === "stock") return
              const pkg = packages[ pack as PackageNames ]
              const antennaCount = Object.keys(pkg.antennas).length
              const planetCount = Object.keys(pkg.planets).length
              return (
                <CheckboxRow
                  key={pack}
                  className="w-full justify-start"
                  label={<div className="flex flex-col leading-4">
                    <div>{pkg.name}</div>
                    <div className={cns.text.muted("text-xs leading-5")}>
                      {[
                        !!antennaCount && `${ antennaCount } antennas`,
                        !!planetCount && `${ planetCount } planets`
                      ].filter(Boolean).join(' + ')}
                    </div>
                  </div>}
                  onValueChange={(val) => changeContentToggle(pack as PackageNames, val)}
                  value={data.settings.contents[ pack as PackageNames ]}
                />
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <label className="text-xs">Range Modifier</label>
            <div className="flex gap-2 items-center">
              <input className={cns.input.box("text-sm max-w-60")} type="number"
                value={data.settings.rangeModifier}
                onChange={(e) => {
                  changeModifier("rangeModifier", e.target.value)
                }} />
              <button className={cns.button.iconGhost()} onClick={() => changeModifier("dsnModifier", "1")}>
                <LucideRotateCcw />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs">DSN Modifier</label>
            <div className="flex gap-2 items-center">
              <input className={cns.input.box("text-sm max-w-60")} type="number"
                value={data.settings.dsnModifier}
                onChange={(e) => changeModifier("dsnModifier", e.currentTarget.value)} />
              <button className={cns.button.iconGhost()} onClick={() => changeModifier("dsnModifier", "1")}>
                <LucideRotateCcw />
              </button>
            </div>
          </div>
          <button
            className={cns.button.base("mt-4 text-sm")}
            onClick={() => setData(initialData)}
          >
            <LucideRotateCcw />
            Reset All Data
          </button>
        </div>



      </div>

      <Divider className="my-2" />

      <div className="flex flex-col gap-2">
        <h2 className={cns.text.muted("text")}>
          What is this?
        </h2>
        <div className={("text-xs max-w-160")}>
          This calculator helps determine the Maximum Antenna Range in the game Kerbal Space Program which can be used to determine how high your relay orbit should
          be if you want to constraint to one type of antenna (as opposed to spamming 88-88 in every ship).
        </div>
        <div className={("text-xs max-w-160")}>
          It can also be used to calculate the strength of the rating to calculate how many
          percent of science can be transmitted from a vessel.
        </div>
        <h2 className={cns.text.muted("text-sm mt-2")}>
          Sources
        </h2>
        <ul className={"text-xs list-outside pl-4 list-disc"}>
          <CitationList title="KSP Wiki - Comnet" href="https://wiki.kerbalspaceprogram.com/wiki/CommNet" />
          <CitationList title="Ranges and Signal Strength | KSP Let's Do The Math" author="Mike Ruben" href="https://www.youtube.com/watch?v=hVd-WhL4tZ8" />
          <CitationList title="Science transmission relation to signal strength" href="https://forum.kerbalspaceprogram.com/topic/200317-science-transmission-relation-to-signal-strength" />
          <CitationList title="Signal Strength vs Science Bonus (Redone)" href="https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8" />
          <CitationList title="Min and Max Distance between Planets" href="https://forum.kerbalspaceprogram.com/topic/100439-min-max-distances-betwen-planets/" />
        </ul>
        <h2 className={cns.text.muted("text-sm mt-2")}>
          Prior work
        </h2>
        <ul className={"text-xs list-outside pl-4 list-disc"}>
          <CitationList title="KSP CommNet Signal Strength Calculator & Antenna Selector" author="poodmund" href="https://docs.google.com/spreadsheets/d/1qIgFB8OXnlgpPCGsxv7JYUYQq5O671IcZXpumVaStek/htmlview" />
          <CitationList title="Comnet Planner" author="blaarkies" href="https://ksp-visual-calculator.blaarkies.com/commnet-planner" />
          <CitationList title="KSP Signal Strength Calculator" author="Westbrooke117" href="https://westbrooke117.github.io/KSPSSC/" />
        </ul>
      </div>


      <Divider className="my-2" />
      <footer className="text-xs">
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
        <h2 className="text-lg">
          {props.payload.type === "ksc" ? "KSC" : "Ship"}
        </h2>
        <div className={cns.text.muted("text-xs")}>Power Rating: {prettyNum(getPowerPowerRating(props.payload, props.dsnModifier, props.antennas))}</div>
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
                className={cns.button.ghost("text-sm w-fit")}
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


function AntennaInput(props: {
  value: AntennaPayload,
  onChange: (a: AntennaPayload) => void,
  antennas: AntennaData
}) {

  const addAntenna = (type: string) => {
    const qty = props.value.get(type) ?? 0
    props.value.set(type, qty + 1)
    props.onChange(props.value)
  }

  const removeAntenna = (type: string) => {
    const qty = props.value.get(type) ?? 0
    if (qty < 1) return
    props.value.set(type, qty - 1)
    props.onChange(props.value)
  }

  const clearAntenna = (type: string) => {
    props.value.set(type, 0)
    props.onChange(props.value)
  }

  const groupedAntennas = groupToList(props.antennas, e => e.package)

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {props.antennas.map((antenna) => {
          const qty = props.value.get(antenna.id) ?? 0
          if (qty === 0) return null
          return (
            <div key={antenna.id} className="flex items-start">
              <div className={cns.card(
                "grow h-full",
                "p-2 flex gap-2 text-[0.7em] tracking-tight",
              )}
              >
                <div className="aspect-square object-contain max-w-14 max-h-14 shrink-0 w-full">
                  {antenna.image ?
                    <img
                      className="aspect-square object-contain"
                      src={antenna.image}
                    /> : <EmojioneMonotoneSatelliteAntenna className={cns.text.muted("size-full p-2")} />
                  }
                </div>
                <div className="flex flex-col grow">
                  <div className="text-pretty leading-4 shrink-0">
                    {antenna.label}
                  </div>
                  <div className={cns.text.muted("grow shrink-0")}>
                    {prettyNum(antenna.rating)} <span className="capitalize">({(antenna.type)})</span>
                  </div>
                  <div className="flex text-sm items-center shrink-0">
                    <div className="grow">{!!qty && `x${ qty }`}</div>
                    <button className={cns.button.iconGhost("shrink-0", qty ? "" : "opacity-0 pointer-events-none")} onClick={() => clearAntenna(antenna.id)}>
                      <LucideX />
                    </button>
                    <button className={cns.button.iconGhost("shrink-0", qty ? "" : "opacity-0 pointer-events-none")} onClick={() => removeAntenna(antenna.id)}>
                      <LucideMinus />
                    </button>
                    <button className={cns.button.iconGhost("shrink-0")} onClick={() => addAntenna(antenna.id)} >
                      <LucidePlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Menu.Root>
        <Menu.Trigger
          render={
            <button className={cns.button.ghost("text-sm justify-start")}>
              <LucidePlus />
              <StreamlineWifiAntennaRemix className="size-4 mr-1" />
              Add Antenna
            </button>
          }
        >
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Backdrop />
          <Menu.Positioner side="top" sideOffset={4}>
            <MenuPopup>
              {groupedAntennas.map((pkg) => {
                const packageLabel = getPackageName(pkg.key)
                return <div key={pkg.key} className="flex flex-col gap-1">
                  <MenuHelperText>{packageLabel}</MenuHelperText>
                  <div className="grid grid-cols-3 gap-3">
                    {pkg.list.map(antenna => {
                      return (
                        <MenuItem
                          key={antenna.id}
                          onClick={() => addAntenna(antenna.id)}
                        >
                          <div className="size-10 rounded-full shrink-0">
                            {<>
                              <div className="aspect-square max-w-14 max-h-14">
                                {antenna.image ?
                                  <img
                                    className="aspect-square object-contain"
                                    src={antenna.image}
                                  /> : <EmojioneMonotoneSatelliteAntenna className={cns.text.muted("size-9")} />
                                }
                              </div>
                            </>}
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">{antenna.label}</div>
                            <div className={cns.text.muted("capitalize text-[0.8em]")}>{prettyNum(antenna.rating)}</div>
                          </div>
                        </MenuItem>
                      )
                    })}
                  </div>
                </div>
              })}
            </MenuPopup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>


    </div>
  )

}


function DistanceStrengthCalculator(props: {
  maximumRange: number,
  mode: "relay" | "direct"
}) {
  const [ distance, setDistance ] = useState(props.maximumRange / 2)

  useEffect(() => {
    if (distance > props.maximumRange)
      setDistance(props.maximumRange)
  }, [ props.maximumRange ])

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

      <div className="flex text-xs gap-4 items-center">
        <div className="place-items-end min-w-34">Distance: {prettyNum(distance, "k", "m")}</div>
        <Divider className={cns.dividerStrong("h-6")} />
        <div className="flex gap-2 grow max-w-20">
          <SignalSymbol strength={signalStrength} />
          <div className="grow max-w-13">
            {(signalStrength * 100).toFixed(2)}%
          </div>
        </div>
        <Divider className={cns.dividerStrong("h-6")} />
        <div className="flex gap-2 items-center">
          <SignalSymbol barClassname={cns.bgScience()} />
          <div className={cns.textScience("text-[0.9em]")}>
            +{scienceBonus.bonus}%
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-sm items-center">
        <div className={cns.text.muted("text-xs font-normal pt-13 pr-2 capitalize")}>
          {props.mode}
        </div>

        <div className="h-20 flex flex-col grow">
          <div className="grow relative flex items-end -mb-3.5">
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
        <div className={cns.text.muted("text-xs font-normal pt-13 pl-2")}>Max</div>
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
        {props.mode === "relay" && <PlanetSelectMenu
          value={from}
          onValueChange={setFrom}
          planetData={props.planetData}
        />}
      </div>
      {
        !result ?
          <div className={cns.card("text-xs p-2 px-3")}>
            No data for this planet
          </div>
          :
          <div className="grid grid-cols-[6rem_auto_auto] text-xs gap-1">
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


function PlanetSelectMenu(props: {
  value: string,
  onValueChange: (planet: string) => void,
  planetData: PlanetData
}) {

  const groupedPlanet = groupToList(props.planetData.list, e => e.package)

  return (
    <Menu.Root>
      <div className="text-sm flex gap-2 items-center">
        I am in
        <Menu.Trigger className={menuTrigger()}>
          <div className="grow">
            {props.value}
          </div>
          <div><LucideChevronDown /></div>
        </Menu.Trigger>
      </div>
      <Menu.Portal>
        <Menu.Backdrop />
        <Menu.Positioner side="top" sideOffset={4}>
          <MenuPopup>
            {groupedPlanet.map((pkg) => {
              const packageLabel = packages[ pkg.key as keyof typeof packages ].name
              return <div key={pkg.key} className="flex flex-col gap-1">
                <MenuHelperText>{packageLabel}</MenuHelperText>
                <div className="grid grid-cols-3 gap-3">
                  {pkg.list.map(planet => {
                    return (<Fragment key={planet.id}>
                      <MenuItem key={planet.id}
                        onClick={() => props.onValueChange(planet.id)}
                      >
                        <div className="size-10 rounded-full shrink-0">
                          {planet.image === undefined ? <>
                            <div className={cns.planet()}></div>
                          </> : <>
                            <img src={planet.image} />
                          </>}
                        </div>
                        <div className="flex flex-col">
                          <div>{planet.id}</div>
                          <div className={cns.text.muted("capitalize text-[0.8em]")}>{packageLabel}</div>
                        </div>
                      </MenuItem>
                    </Fragment>)
                  })}
                </div>
              </div>
            })}
          </MenuPopup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}