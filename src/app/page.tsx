"use client"

import { Fragment, useEffect, useState } from "react"
import { Slider, CheckboxRow, SelectRow, TabSelectRow, MenuPopup, MenuHelperText, MenuItem } from "../ui/input"
import { CopyButton, GhostButton } from "../ui/button"
import { getMaximumRange, getPowerPowerRating, getScienceBonusfromSignalStrength, getStrength, type AntennaPayload, type BodyPayload } from "../lib/antenna"
import { prettyNum } from "../lib/prettier"
import { EmojioneMonotoneSatelliteAntenna, EosIconsPod, IcBaselineDiscord, IcRoundSatelliteAlt, LucideArrowUpRight, LucideBadgeQuestionMark, LucideChevronDown, LucideMinus, LucidePlus, LucideRotateCcw, LucideX, MdiGithub, StreamlineWifiAntennaRemix } from "../ui/icons"
import { cn } from "../ui/cn"
import { CitationList } from "../ui/list"
import { getSignalStrengthDistanceMap } from "../lib/distance"
import { formatCss, interpolate } from "culori"
import { SignalSymbol } from "../ui/common"
import { Menu } from '@base-ui/react/menu'
import { getData, getPackageName, packageNames, packages, type AntennaData, type PackageNames, type PlanetData } from "../lib/packages"
import { groupToList } from "@/lib/object"
import { initialData, parseAppData, type AppData } from "@/lib/app-state"
import { generateShareURL, loadFromLocalStorage, saveToLocalStorage } from "@/lib/persistance"


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
      window.history.replaceState({}, "", url);
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
            {
              value: "ksc-ship", label: <div className="flex flex-col">
                <div>KSC to Ship</div>
                <div className="text-xs text-slate-500">Direct Mode</div>
              </div>
            },
            {
              value: "ship-ship", label: <div className="flex flex-col">
                <div>Ship to Ship</div>
                <div className="text-xs text-slate-500">Relay Mode</div>
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

      <hr className="my-2 border-slate-200" />

      <BodyDetailInput which={0} payload={data[ 0 ]} onChange={(n) => changeData(0, n)} dsnModifier={dsnModifier} mode={mode} antennas={antennas} />
      <hr className="my-2 border-slate-200" />
      <BodyDetailInput which={1} payload={data[ 1 ]} onChange={(n) => changeData(1, n)} dsnModifier={dsnModifier} mode={mode} antennas={antennas} />

      <hr className="mt-2 border-slate-200" />

      {
        zeroReason &&
        <div className="text-sm p-2 border border-red-300 rounded-md bg-red-50 mb-8 text-red-600 px-3">
          <div className="flex gap-1 items-center">
            <LucideBadgeQuestionMark />
            <div className="text-red-600">Reason why its zero</div>
          </div>
          <div className="text-xs text-red-500">
            {zeroReason}
            {/* Both ship are only capable of direct conenctions to KSC. Either switch to "KSC to Ship" mode or add a relay antenna on one of the ship. */}
          </div>
        </div>
      }

      <header>
        <div className="text-slate-400 text-xs">Output</div>
        <h2 className="text-lg">
          Result
        </h2>
      </header>
      <div className="pb-10 flex flex-col sm:flex-row gap-6">
        <div className="min-w-50">

          <div className="text-sm text-slate-400">Maximum Antenna Range</div>
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

          <CopyButton value={generateShareURL(data)} />
        </div>

        <div className="h-auto self-stretch w-px border-l border-slate-200" />

        <div className="flex flex-col gap-6 grow">
          <div className="self-stretch w-full border-t sm:border-none border-slate-200 sm:hidden" />

          <div className="flex flex-col">
            <div className=" text-sm text-slate-400 mb-2">
              Strengths by Distance + Science Bonus
            </div>
            <DistanceStrengthCalculator maximumRange={maximumRange} mode={mode} />
          </div>
          <div className="self-stretch w-full border-t border-slate-200" />
          <div>
            <div className=" text-sm text-slate-400 mb-2">
              Will it reach?
            </div>
            <PlanetDistanceTableView maximumRange={maximumRange} mode={mode} planetData={planets} />
          </div>
        </div>

      </div>

      <hr className="mb-2 border-slate-200" />

      <h2 className="text-lg">
        Settings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-slate-500">Additional Contents</label>
          <div className="flex flex-col gap-0 mt-2">
            {packageNames.map(pack => {
              if (pack === "stock") return
              const pkg = packages[ pack as PackageNames ]
              const antennaCount = Object.keys(pkg.antennas).length
              const planetCount = Object.keys(pkg.planets).length
              return (
                <CheckboxRow
                  key={pack}
                  className="w-full"
                  label={<div className="flex flex-col leading-4">
                    <div>{pkg.name}</div>
                    <div className="text-xs text-slate-400 leading-5 ">
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
            <label className="text-xs text-slate-500">Range Modifier</label>
            <div className="flex gap-2 items-center">
              <input className="p-2 text-sm focus:outline-none border border-slate-200 rounded-md max-w-60 px-3" type="number"
                value={data.settings.rangeModifier}
                onChange={(e) => {
                  changeModifier("rangeModifier", e.target.value)
                }} />
              <GhostButton icon onClick={() => changeModifier("rangeModifier", "1")}>
                <LucideRotateCcw />
              </GhostButton>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs text-slate-500">DSN Modifier</label>
            <div className="flex gap-2 items-center">
              <input className="p-2 text-sm focus:outline-none border border-slate-200 rounded-md max-w-60 px-3" type="number"
                value={data.settings.dsnModifier}
                onChange={(e) => changeModifier("dsnModifier", e.currentTarget.value)} />
              <GhostButton icon onClick={() => changeModifier("dsnModifier", "1")}>
                <LucideRotateCcw />
              </GhostButton>
            </div>
          </div>
          <GhostButton
            className={cn("mt-4 text-sm gap-2 bg-slate-50 justify")}
            onClick={() => setData(initialData)}
          >
            <LucideRotateCcw />
            Reset All Data
          </GhostButton >
        </div>



      </div>

      <hr className="my-2 border-slate-200" />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm">
          What is this?
        </h2>
        <div className="text-xs max-w-160 text-slate-600">
          This calculator helps determine the Maximum Antenna Range in the game Kerbal Space Program which can be used to determine how high your relay orbit should
          be if you want to constraint to one type of antenna (as opposed to spamming 88-88 in every ship).
        </div>
        <div className="text-xs max-w-160 text-slate-600">
          It can also be used to calculate the strength of the rating to calculate how many
          percent of science can be transmitted from a vessel.
        </div>
        <h2 className="text-xs mt-2">
          Sources
        </h2>
        <ul className="text-slate-600 text-xs list-outside pl-4 list-disc">
          <CitationList title="KSP Wiki - Comnet" href="https://wiki.kerbalspaceprogram.com/wiki/CommNet" />
          <CitationList title="Ranges and Signal Strength | KSP Let's Do The Math" author="Mike Ruben" href="https://www.youtube.com/watch?v=hVd-WhL4tZ8" />
          <CitationList title="Science transmission relation to signal strength" href="https://forum.kerbalspaceprogram.com/topic/200317-science-transmission-relation-to-signal-strength" />
          <CitationList title="Signal Strength vs Science Bonus (Redone)" href="https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8" />
          <CitationList title="Min and Max Distance between Planets" href="https://forum.kerbalspaceprogram.com/topic/100439-min-max-distances-betwen-planets/" />
        </ul>
        <h2 className="text-xs mt-2">
          Prior work
        </h2>
        <ul className="text-slate-600 text-xs list-outside pl-4 list-disc">
          <CitationList title="KSP CommNet Signal Strength Calculator & Antenna Selector" author="poodmund" href="https://docs.google.com/spreadsheets/d/1qIgFB8OXnlgpPCGsxv7JYUYQq5O671IcZXpumVaStek/htmlview" />
          <CitationList title="Comnet Planner" author="blaarkies" href="https://ksp-visual-calculator.blaarkies.com/commnet-planner" />
          <CitationList title="KSP Signal Strength Calculator" author="Westbrooke117" href="https://westbrooke117.github.io/KSPSSC/" />
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
        <div className="text-slate-400 text-xs">Body {props.which + 1}</div>
        <h2 className="text-lg">
          {props.payload.type === "ksc" ? "KSC" : "Ship"}
        </h2>
        <div className="text-slate-400 text-xs">Power Rating: {prettyNum(getPowerPowerRating(props.payload, props.dsnModifier, props.antennas))}</div>
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
                  Is a it relay?
                </>}
                value={props.payload.isRelay}
                onValueChange={changeIsRelay}
              />
              <div className="grow" />
              <GhostButton className="text-sm p-2 px-3 rounded-md w-fit" onClick={() => {
                props.antennas.forEach(antenna => clearAntenna(antenna.id))
              }}>Reset All</GhostButton>
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
              <div className={cn(
                "grow h-full",
                "border rounded-md p-2 flex gap-2 text-[0.7em] tracking-tight",
                qty ? "border-slate-200" : "border-transparent",
                "hover:border-slate-400",
                "cursor-pointer select-none",
              )}
              >
                <div className="aspect-square object-contain max-w-14 max-h-14 shrink-0 w-full">
                  {antenna.image ?
                    <img
                      className="aspect-square object-contain"
                      src={antenna.image}
                    /> : <EmojioneMonotoneSatelliteAntenna className="size-full text-slate-300 p-2" />
                  }
                </div>
                <div className="flex flex-col grow">
                  <div className="text-pretty leading-4 shrink-0">
                    {antenna.label}
                  </div>
                  <div className=" text-slate-400 grow shrink-0">
                    {prettyNum(antenna.rating)} <span className="capitalize">({(antenna.type)})</span>
                  </div>
                  <div className="flex text-sm items-center shrink-0">
                    <div className="grow">{!!qty && `x${ qty }`}</div>
                    <GhostButton icon className={cn("size-7 shrink-0", qty ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => clearAntenna(antenna.id)}>
                      <LucideX />
                    </GhostButton>
                    <GhostButton icon className={cn("size-7 shrink-0", qty ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={() => removeAntenna(antenna.id)}>
                      <LucideMinus />
                    </GhostButton>
                    <GhostButton icon className={cn("size-7 shrink-0")} onClick={() => addAntenna(antenna.id)} >
                      <LucidePlus />
                    </GhostButton>
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
            <GhostButton className="text-sm p-2 px-3 rounded-md justify-start gap-2">
              <LucidePlus />
              <StreamlineWifiAntennaRemix className="size-4 mr-1" />
              Add Antenna
            </GhostButton>
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
                        <MenuItem key={antenna.id}
                          onClick={() => addAntenna(antenna.id)}
                        >
                          <div className="size-10 rounded-full shrink-0">
                            {antenna.image === undefined ? <>
                              <div className="bg-slate-300 size-full rounded-full shadow-[inset_0.25rem_0_10px_#0045]"></div>
                            </> : <>
                              <div className="aspect-square max-w-14 max-h-14">
                                {antenna.image ?
                                  <img
                                    className="aspect-square object-contain"
                                    src={antenna.image}
                                  /> : <EmojioneMonotoneSatelliteAntenna className="size-9 text-slate-300" />
                                }
                              </div>
                            </>}
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs">{antenna.label}</div>
                            <div className="capitalize text-[0.8em] text-slate-400">{prettyNum(antenna.rating)}</div>
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
        <div className="border-l border-slate-300 h-6" />
        <div className="flex gap-2 grow max-w-20">
          <SignalSymbol strength={signalStrength} />
          <div className="grow max-w-13">
            {(signalStrength * 100).toFixed(2)}%
          </div>
        </div>
        <div className="border-l border-slate-300 h-6" />
        <div className="flex gap-2 items-center">
          <SignalSymbol barClassname="bg-blue-200" />
          <div className="text-blue-500 text-[0.9em]">
            +{scienceBonus.bonus}%
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-sm items-center">
        <div className="text-xs text-slate-400 font-normal pt-13 pr-2 capitalize">{props.mode}</div>

        <div className="h-20 flex flex-col grow">
          <div className="grow relative flex items-end -mb-3.5">
            {bins.map((str, i) => {
              return (
                <div key={i} className="h-full relative" style={{ width: `calc(1 / ${ binCount } * 100%)` }}>
                  <div className={cn(
                    "bg-slate-200 absolute w-full bottom-0",
                    str < 0.25 ? "bg-red-200" : str < 0.5 ? "bg-orange-200" : str < 0.75 ? "bg-yellow-200" : "bg-green-200"
                  )} style={{
                    height: (str * 100).toFixed(2) + '%',
                  }} />
                  <div className={cn(
                    "bg-blue-200/50 absolute w-full bottom-0",
                  )} style={{
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

        <div className="text-xs text-slate-400 font-normal pt-13 pl-2">Max</div>
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
        {props.mode === "direct" ?
          <>
          </>
          :
          <>
            <PlanetSelectMenu
              value={from}
              onValueChange={setFrom}
              planetData={props.planetData}
            />
          </>
        }
      </div>
      {
        !result ?
          <div className="text-xs p-2 px-3 bg-slate-100 text-slate-600 border border-slate-200 rounded-md">
            No data for this planet
          </div>
          :
          <div className="grid grid-cols-[6rem_auto_auto] text-xs gap-1">
            {
              props.mode === "direct" ?
                <div className="pb-2">From KSC to my ship in:</div>
                :
                <div className="pb-2">My other ship is in:</div>
            }
            <div className="pb-2 place-self-center text-slate-600 text-pretty max-w-34 text-center">Strength at Closest Distance</div>
            <div className="pb-2 place-self-center text-slate-600 text-pretty max-w-34 text-center">Strength at Fruthest Distance</div>
            {result.map((row, i) => {
              return <Fragment key={i}>
                <div className="h-6">{row.label}</div>
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
        "oklch(88.5% 0.062 18.334)",
        "oklch(90.1% 0.076 70.697)",
        "oklch(94.5% 0.129 101.54)",
        "oklch(90.5% 0.093 164.15)"
      ],
      "oklch"
    )
    return formatCss(gradient(strength))
  }

  const scienceBonus = getScienceBonusfromSignalStrength(props.strength ?? 0)

  return (
    <div className="h-6 p-1 bg-slate-100 w-full rounded-md flex gap-2 items-center justify-center"
      style={{
        background: props.strength !== null ? getStrengthColor(props.strength) : undefined
      }}
    >
      <SignalSymbol strength={props.strength ?? undefined} />
      {props.strength === null ? <></> : Math.round(props.strength * 100) + "%"}
      {props.strength !== null &&
        <>
          <div className="border-l border-slate-600/30 h-full" />
          <SignalSymbol barClassname="bg-blue-500/20" />
          <div className="text-blue-500 text-[0.9em]">
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
      <div className="text-sm flex gap-2 items-center text-slate-500">
        I am in
        <Menu.Trigger className={cn(
          "border border-slate-200 p-1 px-3 text-sm text-slate-700 rounded-md",
          "hover:bg-slate-100/75 active:bg-slate-100",
          "flex items-center text-start",
          "w-32 cursor-pointer"
        )}>
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
                            <div className="bg-slate-300 size-full rounded-full shadow-[inset_0.25rem_0_10px_#0045]"></div>
                          </> : <>
                            <img src={planet.image} />
                          </>}
                        </div>
                        <div className="flex flex-col">
                          <div>{planet.id}</div>
                          <div className="capitalize text-[0.8em] text-slate-400">{packageLabel}</div>
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