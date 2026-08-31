"use client"

import { cns } from "@/design-system"
import { checkDuplicates } from "@/lib/get-duplicates"
import { prettyNum } from "@/lib/pretty-num"
import { HomeButton, Muted } from "@/ui/common"
import { BackOrHomeButtonClient } from "@/ui/common.client"
import { Footer } from "@/ui/footer"
import { EmojioneMonotoneSatelliteAntenna } from "@/ui/icons"
import { TabSelectRow } from "@/ui/input"
import { useFieldArray, type FieldArrayItem } from "@/ui/input-array"
import { numberField, FieldBlock, useField } from "@/ui/input-field"
import { useGlobalSettings, type GlobalSettings, type GlobalSettingsSetter } from "@/ui/settings-section"
import { Suspense, useEffect, useState } from "react"


export function CustomAntennaPage_Client() {
  const [ settings, setSettings ] = useGlobalSettings()
  if (!settings) return null

  return (
    <div className={cns.page("max-w-120")}>

      <Suspense fallback={<HomeButton />} >
        <BackOrHomeButtonClient />
      </Suspense>

      <header>
        <h1 className={cns.pageTitle()}>
          Manage Custom Antena
        </h1>
      </header>

      <div className="flex flex-col gap-1">
        <CustomAntennaPageForm
          settings={settings}
          setSettings={setSettings}
        />
      </div>
      <Footer />
    </div>
  )
}



function CustomAntennaPageForm(props: {
  settings: GlobalSettings
  setSettings: GlobalSettingsSetter
}) {
  const { settings, setSettings } = props

  const customAntennaFields = useFieldArray<GlobalSettings[ 'customAntennas' ][ number ]>({
    newItem: () => ({
      label: `New Antenna ${ settings?.customAntennas.length }`,
      combinabilityExponent: 0.75,
      rating: 100_000,
      type: "direct" as "direct" | "relay",
    }),
    initial: () => settings.customAntennas,
    onValidChange: (n) => {
      settings.customAntennas = n
      setSettings({ ...settings })
    },
    validate: (n, err) => {
      checkDuplicates(n, (t) => t.value.label,
        (t) => err.set(t.id, { label: "Duplicate Labels" })
      )
      return err
    },
  })

  return (
    <div className="flex flex-col gap-8">
      {customAntennaFields.isEmpty &&
        <div className={cns.textMuted("text-xs")}>No Custom Antenna Added</div>
      }
      {customAntennaFields.fields.map((field) =>
        <AntennaItem key={field.id} field={field} />
      )}
      <button className={cns.buttonBase()} onClick={
        () => customAntennaFields.append()
      }>
        Add Custom Antenna
      </button>
    </div>
  )
}


function AntennaItem(props: {
  field: FieldArrayItem<GlobalSettings[ 'customAntennas' ][ number ]>,
}) {
  const {
    value,
    errors,
    onChange,
    onDelete,
  } = props.field

  const [ confirmDelete, setConfirmDelete ] = useState(false)

  const labelField = useField({
    error: errors?.label,
    initialData: () => value.label,
    onValidChange: (n) => onChange(({ ...value, label: n })),
    noempty: 1,
  })

  const ratingField = useField(numberField({
    initialData: () => value.rating,
    onValidChange: (n) => onChange(({ ...value, rating: n })),
    nonnegative: 1,
    noempty: 1,
  }))

  const combinabilityExponentField = useField(numberField({
    initialData: () => value.combinabilityExponent,
    onValidChange: n => onChange(({ ...value, combinabilityExponent: n })),
    nonnegative: 1,
    noempty: 1,
    validate: v => {
      if (v > 1) throw "Can't be more than one"
    }
  }))

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
        <FieldBlock
          field={labelField}
          hideReset
        />

        <Muted>rating:</Muted>
        <FieldBlock
          field={ratingField}
          savedValue={prettyNum(value.rating, 'k')}
          hideReset
        />

        <Muted>combinability exponent:</Muted>
        <FieldBlock
          field={combinabilityExponentField}
          savedValue={prettyNum(value.combinabilityExponent, 'k')}
          hideReset
        />

        <Muted>type:</Muted>
        <TabSelectRow
          items={[
            { label: "Direct", value: "direct" },
            { label: "Relay", value: "relay" },
          ]}
          value={value.type}
          onValueChange={(type) => onChange({ ...value, type })}
          itemClassName="p-1 w-auto grow"
        />
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
  </div>
}
