"use client"

import { cns } from "@/design-system"
import { prettyNum } from "@/lib/prettier"
import { HomeButton, Muted } from "@/ui/common"
import { BackOrHomeButton } from "@/ui/common.client"
import { Footer } from "@/ui/footer"
import { NumberInput, TextInput } from "@/ui/input"
import { useGlobalSettings, type GlobalSettings } from "@/ui/settings-section"
import { Suspense, useEffect, useState } from "react"

export default function CustomPlanetsPage() {
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
          Manage Custom Celestial Body
        </h1>
      </header>

      <div className="flex flex-col gap-1">

        <div className="flex flex-col gap-8" key={refreshId}>
          {settings.customPlanets.length === 0 && <div className={cns.text.muted("text-xs")}>No Custom Celestial Body Added</div>}
          {settings.customPlanets.map((e, i) => {
            return (
              <CelestialBodyItem key={i} value={e}
                onDelete={() => {
                  settings.customPlanets = settings.customPlanets.filter((e, ei) => ei !== i)
                  setSettings({ ...settings })
                  setRefreshId(Math.random())
                }}
                onChange={(nv) => {
                  setSettings({ ...settings, customPlanets: settings.customPlanets.map((p, j) => i === j ? nv : p) })
                }}
                labels={settings.customPlanets.filter((_, f) => f !== i).map(p => p.label)}
              />
            )
          })}
          <button className={cns.button.base()} onClick={() => {
            settings.customPlanets.push({
              label: `New Planet ${ settings.customPlanets.length }`,
              atmHeight: 0,
              radius: 100_000,
              soiHeight: 5_000_000,
            })
            setSettings({ ...settings })
            setRefreshId(Math.random())
          }}>
            Add Celestial Body
          </button>
        </div>

      </div>
      <Footer />
    </div>
  )
}


function CelestialBodyItem(props: {
  value: GlobalSettings[ 'customPlanets' ][ number ],
  onDelete: () => void,
  onChange: (newValue: GlobalSettings[ 'customPlanets' ][ number ]) => void
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

  return <div className="flex gap-4">
    <div className={cns.planet("size-20 shrink-0")} />
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-[5rem_auto] items-baseline gap-x-2 gap-y-1 text-sm">
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

        <Muted>radius:</Muted>
        <NumberInput
          initialValue={value.radius}
          onValueChange={(n) => props.onChange(({ ...value, radius: n }))}
          onEmpty={() => "Can't be empty"}
          validate={(n) => {
            return n < 1 ? "Can't be negative" : undefined
          }}
        />
        <div className="text-end col-span-2">= {prettyNum(value.radius, 'k', 'm')}</div>

        <Muted>soi:</Muted>
        <NumberInput
          initialValue={value.soiHeight}
          onValueChange={(n) => props.onChange(({ ...value, soiHeight: n }))}
          onEmpty={() => props.onChange(({ ...value, soiHeight: Number.POSITIVE_INFINITY }))}
          validate={n => {
            return n < 1 ? "Can't be negative" : undefined
          }}
        />
        <div className="text-end col-span-2">= {prettyNum(value.soiHeight, 'k', 'm')}</div>

        <Muted>atm height:</Muted>
        <NumberInput
          initialValue={value.atmHeight}
          onValueChange={(n) => props.onChange(({ ...value, atmHeight: n }))}
          onEmpty={() => props.onChange(({ ...value, atmHeight: 0 }))}
          validate={n => {
            return n < 1 ? "Can't be negative" : undefined
          }}
        />
        <div className="text-end col-span-2">= {prettyNum(value.atmHeight, 'k', 'm')}</div>

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
