"use client"

import { cns } from "@/design-system"
import { prettyNum } from "@/lib/prettier"
import { HomeButton, Muted } from "@/ui/common"
import { BackOrHomeButton } from "@/ui/common.client"
import { Footer } from "@/ui/footer"
import { EmojioneMonotoneSatelliteAntenna } from "@/ui/icons"
import { NumberInput, TabSelectRow, TextInput } from "@/ui/input"
import { useGlobalSettings, type GlobalSettings } from "@/ui/settings-section"
import type { Metadata } from "next"
import { Suspense, useEffect, useState } from "react"

export const metadata: Metadata = {
  title: "Manage Custom Celestial Body",
  description: "Add or remove custom celestial bodies.",
}

export default function CustomAntennaPage() {
  const [ settings, setSettings ] = useGlobalSettings()
  const [ refreshId, setRefreshId ] = useState(Math.random())

  if (!settings) return null

  return (
    <div className={cns.page("max-w-120")}>

      <Suspense fallback={<HomeButton />} >
        <BackOrHomeButton />
      </Suspense>

      <header>
        <h1 className={cns.pageTitle()}>
          Manage Custom Antena
        </h1>
      </header>

      <div className="flex flex-col gap-1">

        <div className="flex flex-col gap-8" key={refreshId}>
          {settings.customAntennas.length === 0 && <div className={cns.text.muted("text-xs")}>No Custom Antenna Added</div>}
          {settings.customAntennas.map((a, i) => {
            return (
              <AntennaItem key={i}
                value={a}
                onDelete={() => {
                  settings.customAntennas = settings.customAntennas.filter((e, ei) => ei !== i)
                  setSettings({ ...settings })
                  setRefreshId(Math.random())
                }}
                onChange={(nv) => {
                  setSettings({ ...settings, customAntennas: settings.customAntennas.map((p, j) => i === j ? nv : p) })
                }}
                labels={settings.customAntennas.filter((_, f) => f !== i).map(p => p.label)}
              />
            )
          })}
          <button className={cns.button.base()} onClick={() => {
            settings.customAntennas.push({
              label: `New Antenna ${ settings.customAntennas.length }`,
              combinabilityExponent: 0.75,
              rating: 100_000,
              type: "direct",
            })
            setSettings({ ...settings })
            setRefreshId(Math.random())
          }}>
            Add Custom Antenna
          </button>
        </div>

      </div>
      <Footer />
    </div>
  )
}


function AntennaItem(props: {
  value: GlobalSettings[ 'customAntennas' ][ number ],
  onDelete: () => void,
  onChange: (newValue: GlobalSettings[ 'customAntennas' ][ number ]) => void
  labels: string[],
}) {
  const value = props.value

  const [ confirmDelete, setConfirmDelete ] = useState(false)

  useEffect(() => {
    if (confirmDelete) {
      const timeout = setTimeout(() => setConfirmDelete(false), 1000)
      return () => clearTimeout(timeout)
    }
  }, [ confirmDelete ])

  // Antenna Type
  // ---------------------
  // label: string;
  // rating: number;
  // type: "direct" | "relay";
  // combinabilityExponent: number;
  // image?: string;

  return <div className="flex gap-4">
    <EmojioneMonotoneSatelliteAntenna className="shrink-0 size-20" />
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-[6rem_auto] items-baseline gap-x-2 gap-y-1 text-sm">
        <Muted>label:</Muted>
        <div className="flex flex-col">
          <TextInput
            initialValue={value.label}
            onValueChange={(v) => {
              props.onChange(({ ...value, label: v }))
            }}
            validate={(val) => {
              if (val === '') return "Label is required"
              return props.labels.includes(val) ? "Label already exists" : undefined
            }}
          />
        </div>

        <Muted>rating:</Muted>
        <NumberInput
          initialValue={value.rating}
          onValueChange={(n) => props.onChange(({ ...value, rating: n }))}
          onEmpty={() => "Can't be empty"}
          validate={(n) => {
            return n < 1 ? "Can't be negative" : undefined
          }}
        />
        <div className="text-end col-span-2">= {prettyNum(value.rating, 'k')}</div>

        <Muted>combinability exponent:</Muted>
        <NumberInput
          initialValue={value.combinabilityExponent}
          onValueChange={(n) => props.onChange(({ ...value, combinabilityExponent: n }))}
          onEmpty={() => "Can't be empty"}
          validate={(n) => {
            if (n < 0) return "Can't be negative"
            if (n > 1) return "Can't be more than one"
          }}
        />
        <div className="text-end col-span-2">= {prettyNum(value.combinabilityExponent, 'k')}</div>

        <Muted>type:</Muted>
        <TabSelectRow
          items={[
            { label: "Direct", value: "direct" },
            { label: "Relay", value: "relay" },
          ]}
          value={value.type}
          onValueChange={(type) => props.onChange({ ...value, type })}
          itemClassName="p-1 w-auto grow"
        />


      </div>

      {confirmDelete ? <div className="flex gap-2">
        <button className={cns.button.base("mt-2 text-xs py-1.5 w-full")} onClick={props.onDelete}>
          Confirm Delete
        </button>
        <button className={cns.button.base("mt-2 text-xs py-1.5 w-full")} onClick={() => setConfirmDelete(false)}>
          Cancel Delete
        </button>
      </div> :
        <button className={cns.button.base("mt-2 text-xs py-1.5")} onClick={() => setConfirmDelete(true)}>
          Delete
        </button>
      }
    </div>
  </div>
}
