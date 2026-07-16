"use client"

import { useState } from "react"
import { CheckboxRow, SelectRow, TabSelectRow } from "./ui/input"
import { GhostButton } from "./ui/button"
import { antennaData, antennaTypes, kscDSNdata, type AntennaTypes } from "@/constants"
import { getMaximumRange, getVesselPowerRating, type AntennaPayload, type BodyPayload } from "./logic/antenna"
import { prettyNum } from "./logic/prettier"
import { LucideMinus, LucidePlus, LucideX } from "./ui/icons"

const defaultProp = {
  level: "1",
  hasCommandModule: false,
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

  return (
    <div className="p-8 font-mono font-medium flex flex-col gap-4">
      <h1 className="text-xl tracking-tight text-slate-400 font-semibold">
        KSP Calculator: Maximum Antenna Range
      </h1>

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
      <div className="py-8 bg-background sticky bottom-0 border-t border-slate-200">

        <h2 className="text-lg">
          Result
        </h2>
        <div className="sticky bottom-0">
          <div className="text-sm text-slate-400">Maximum Antenna Range:</div>
          <div className="text-2xl font-semibold text-slate-700">
            {prettyNum(maximumRange, "k", "m")}
          </div>
          <div className="">
            {maximumRange.toLocaleString() + "m"}
          </div>
          <div className=" text-sm text-slate-400 mt-2">Singal Strengths</div>
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
        </div>
      </div>

      <hr className="mb-2 border-slate-200" />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm">
          What is this?
        </h2>
        <div className="text-xs max-w-160 text-slate-600">
          Maximum Antenna Range can be used to determine how high your relay orbit should
          be if you want to constraint one type of antenna (as opposed to spamming 88-88 in everyship).
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
        </ul>
      </div>


      <hr className="my-2 border-slate-200" />
      <footer className="text-xs text-slate-500">
        <div>Created by alfonsusac</div>
        <div>No AI is used to create this</div>
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
        <div className="text-slate-400 text-xs">Power Rating: {prettyNum(getVesselPowerRating(props.payload))}</div>
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {antennaTypes.map(a => {
        return (
          <div key={a} className="border border-slate-200 rounded-md p-2 flex flex-col">
            <img
              className="aspect-square object-contain max-w-16"
              src={antennaData[ a ].image}
            />
            <div className="text-xs">
              {antennaData[ a ].label}
            </div>
            <div className="flex grid grid-cols-4 place-items-center">
              <GhostButton onClick={() => removeAntenna(a)} className="">
                <LucideMinus />
              </GhostButton>
              <div>{props.value[ a ]}</div>
              <GhostButton onClick={() => addAntenna(a)} className="">
                <LucidePlus />
              </GhostButton>
              <GhostButton onClick={() => clearAntenna(a)} className="">
                <LucideX />
              </GhostButton>
            </div>
          </div>
        )
      })}
    </div>
  )

}