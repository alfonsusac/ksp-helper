"use client"

import { cns } from "@/design-system"
import { checkDuplicates } from "@/lib/get-duplicates"
import { prettyNum } from "@/lib/pretty-num"
import { HomeButton, Muted } from "@/ui/common"
import { BackOrHomeButtonClient } from "@/ui/common.client"
import { Footer } from "@/ui/footer"
import { LucideCircleAlert } from "@/ui/icons"
import { useFieldArray, type FieldArrayItem } from "@/ui/input-array"
import { FieldBlock, numberField, textField } from "@/ui/input-field"
import { useGlobalSettings, type GlobalSettings, type GlobalSettingsSetter } from "@/ui/settings-section"
import { Suspense, useEffect, useState } from "react"

export function CustomPlanetsPage_Client() {
  const [ settings, setSettings ] = useGlobalSettings()
  if (!settings) return null

  return (
    <div className={cns.page("max-w-120")}>

      <Suspense fallback={<HomeButton />} >
        <BackOrHomeButtonClient />
      </Suspense>

      <header>
        <h1 className={cns.pageTitle()}>
          Manage Custom Celestial Body
        </h1>
      </header>

      <div className={cns.card()}>
        <div className={cns.cardHeader()}>
          <LucideCircleAlert />
          <div>Heads up!</div>
        </div>
        <div className={cns.cardDescription(cns.textMuted())}>
          Custom planets will only appear in /relay-height calculator. This is because in antenna-range, the distance between each individual planets needs to be known.
        </div>
      </div>
      
      <div className="flex flex-col gap-1 pt-4">

        <CustomPlanetsForm settings={settings} setSettings={setSettings} />

      </div>
      <Footer />
    </div>
  )
}



function CustomPlanetsForm(props: {
  settings: GlobalSettings,
  setSettings: GlobalSettingsSetter
}) {
  const { settings, setSettings } = props

  const customBodyFields = useFieldArray<GlobalSettings[ 'customPlanets' ][ number ]>({
    newItem: () => ({
      label: `New Body ${ settings?.customPlanets.length }`,
      atmHeight: 70_000,
      radius: 600_000,
      soiHeight: 84_159_286 - 600_000,
      mass: 5.2915158e22,
    }),
    initial: () => settings.customPlanets,
    onValidChange: (n) => {
      settings.customPlanets = n
      setSettings({ ...settings })
    },
    validate: (n, err) => {
      checkDuplicates(n, (t) => t.value.label,
        (t) => err.set(t.id, { label: "Duplicate Labels" })
      )
      return err
    }
  })

  return (
    <div className="flex flex-col gap-8">
      {customBodyFields.isEmpty &&
        <div className={cns.textMuted("text-xs")}>No Custom Celestial Body Added</div>}
      {customBodyFields.fields.map((field) =>
        <CelestialBodyItem key={field.id} field={field} />
      )}
      <button className={cns.buttonBase()} onClick={
        () => customBodyFields.append()
      }>
        Add Celestial Body
      </button>
    </div>
  )
}



function CelestialBodyItem(props: {
  field: FieldArrayItem<GlobalSettings[ 'customPlanets' ][ number ]>,

}) {
  const {
    value,
    errors,
    onChange,
    onDelete,
  } = props.field

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
        <FieldBlock
          fieldDef={textField({
            error: errors?.label,
            initialData: () => value.label,
            onValidChange: v => onChange(({ ...value, label: v })),
            noempty: 1,
          })}
          hideReset
        />
        {/* <div className="flex flex-col">
          <TextInput
            initialValue={value.label}

            validate={(val) => {
              if (val === '') return "Label is required"
              return props.labels.includes(val) ? "Label already exists" : undefined
            }}
          />
        </div> */}

        <Muted>radius:</Muted>
        <FieldBlock
          fieldDef={numberField({
            initialData: () => value.radius,
            onValidChange: v => onChange(({ ...value, radius: v })),
            noempty: 1,
            nonnegative: 1
          })}
          hideReset
          endAdornment={<>m</>}
        />
        {/* <UnitInputWrapper unit="m">
          <NumberInput
            initialValue={value.radius}
            onValueChange={(n) => props.onChange(({ ...value, radius: n }))}
            onEmpty={() => "Can't be empty"}
            validate={(n) => {
              return n < 0 ? "Can't be negative" : undefined
            }}
          />
      </UnitInputWrapper> */}

        <div className="text-end col-span-2">= {prettyNum(value.radius, 'k', 'm')}</div>

        <Muted>soi:</Muted>
        <FieldBlock
          fieldDef={numberField({
            initialData: () => value.soiHeight,
            onValidChange: v => onChange(({ ...value, soiHeight: v })),
            onEmpty: () => Infinity,
            nonnegative: 1
          })}
          hideReset
          endAdornment={<>m</>}
        />
        {/* <UnitInputWrapper unit="m"> */}
        {/* <NumberInput
            initialValue={value.soiHeight}
            onValueChange={(n) => props.onChange(({ ...value, soiHeight: n }))}
            onEmpty={() => props.onChange(({ ...value, soiHeight: Number.POSITIVE_INFINITY }))}
            validate={n => {
              return n < 0 ? "Can't be negative" : undefined
            }}
          /> */}
        {/* </UnitInputWrapper> */}

        <div className="text-end col-span-2">= {prettyNum(value.soiHeight, 'k', 'm')}</div>

        <Muted>atm height:</Muted>
        <FieldBlock
          fieldDef={numberField({
            initialData: () => value.atmHeight,
            onValidChange: v => onChange(({ ...value, atmHeight: v })),
            onEmpty: () => 0,
            nonnegative: 1
          })}
          hideReset
          endAdornment={<>m</>}
        />
        {/* <UnitInputWrapper unit="m"> */}
        {/* <NumberInput
            initialValue={value.atmHeight}
            onValueChange={(n) => props.onChange(({ ...value, atmHeight: n }))}
            onEmpty={() => props.onChange(({ ...value, atmHeight: 0 }))}
            validate={n => {
              return n < 0 ? "Can't be negative" : undefined
            }}
          /> */}
        {/* </UnitInputWrapper> */}

        <div className="text-end col-span-2">= {prettyNum(value.atmHeight, 'k', 'm')}</div>

        <Muted>mass:</Muted>
        <FieldBlock
          fieldDef={numberField({
            initialData: () => value.mass,
            onValidChange: v => onChange(({ ...value, mass: v })),
            onEmpty: () => 0,
            nonnegative: 1
          })}
          hideReset
          endAdornment={<>kg</>}
        />
        {/* <UnitInputWrapper unit="kg"> */}

        {/* <NumberInput
            initialValue={value.mass}
            onValueChange={(n) => props.onChange(({ ...value, mass: n }))}
            onEmpty={() => props.onChange(({ ...value, mass: 0 }))}
            validate={n => {
              return n < 0 ? "Can't be negative" : undefined
            }}
          /> */}
        {/* </UnitInputWrapper> */}

        <div className="text-end col-span-2">= {prettyNum(value.mass, 'k', 'g')}</div>

      </div>

      {confirmDelete ? <div className="flex gap-2">
        <button className={cns.buttonBase("mt-2 text-xs py-1.5 w-full")} onClick={onDelete}>
          Confirm Delete
        </button>
        <button className={cns.buttonBase("mt-2 text-xs py-1.5 w-full")} onClick={() => setConfirmDelete(false)}>
          Cancel Delete
        </button>
      </div> :
        <button className={cns.buttonBase("mt-2 text-xs py-1.5")} onClick={() => setConfirmDelete(true)}>
          Delete
        </button>
      }
    </div>
  </div >
}


