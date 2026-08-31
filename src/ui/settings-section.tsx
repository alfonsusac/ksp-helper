import { cns } from "@/design-system"
import { packageNames, packages, type PackageNames } from "@/packages/_process-packages"
import { CheckboxRow } from "./input"
import { IcRoundSatelliteAlt, LucideEarth, LucideRotateCcw } from "./icons"
import { useAppState } from "@/lib/use-app-state"
import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { numberField, FieldBlock, useField } from "./input-field"


// function constructGlobalSettings(v: unknown) {
//   const res = getInitialGlobalSettings()
//   if (typeof v !== "object" || v === null) return res
//   if ('rangeModifier' in v && typeof v.rangeModifier === "number") res.rangeModifier = v.rangeModifier
//   if ('dsnModifier' in v && typeof v.dsnModifier === "number") res.dsnModifier = v.dsnModifier
//   if ('occlusionModifierAtm' in v && typeof v.occlusionModifierAtm === "number") res.occlusionModifierAtm = v.occlusionModifierAtm
//   if ('occlusionModifierVac' in v && typeof v.occlusionModifierVac === "number") res.occlusionModifierVac = v.occlusionModifierVac
//   if ('contents' in v && typeof v.contents === 'object' && v.contents !== null) {
//     Object.entries(v.contents).map(([ key, value ]) => {
//       if (value === true) res.contents[ key as PackageNames ] = true
//     })
//   }
//   if ('customPlanets' in v && Array.isArray(v.customPlanets)) {
//     v.customPlanets.map((p: unknown) => {
//       if (typeof p !== "object" || p === null) return
//       if ('label' in p === false || typeof p.label !== 'string') return
//       if ('radius' in p === false || typeof p.radius !== 'number') return
//       if ('atmHeight' in p === false || typeof p.atmHeight !== 'number') return
//       if ('soiHeight' in p === false || typeof p.soiHeight !== 'number') return
//       if ('image' in p === true && typeof p.image !== 'string') return
//     })
//   }
//   return res
// }

export type GlobalSettings = {
  rangeModifier: number,
  dsnModifier: number,
  occlusionModifierAtm: number,
  occlusionModifierVac: number,
  contents: Record<PackageNames, true | undefined>,
  customPlanets: {
    label: string,
    radius: number,
    atmHeight: number,
    soiHeight: number,
    image?: string,
    imageScale?: number,
    imageX?: number,
    imageY?: number,
    highestPoint?: number,
    notLandable?: boolean,
    mass: number,
  }[],
  customAntennas: {
    label: string,
    rating: number,
    type: "direct" | "relay",
    combinabilityExponent: number,
    image?: string
  }[],
}

export function getInitialGlobalSettings(): GlobalSettings {

  const contentToggles = Object.fromEntries(Object.keys(packages).map(p => {
    if (p === "stock") return [ "stock" as const, true ]
    return []
    // return [ p as PackageNames, false ]
  })) as Record<PackageNames, true | undefined>

  return {
    rangeModifier: 1,
    dsnModifier: 1,
    contents: contentToggles,
    occlusionModifierAtm: 0.75,
    occlusionModifierVac: 0.9,
    customAntennas: [],
    customPlanets: [],
  }
}

export function ResetSettingsIconButton(props: ComponentProps<"button">) {
  return (
    <button {...props} className={cns.buttonGhost(cns.buttonIcon("shrink-0"), props.className)}>
      <LucideRotateCcw />
    </button>
  )
}

export function useGlobalSettings() {
  const [ settings, setSettings ] = useAppState("settings", getInitialGlobalSettings, (s) => {
    if (typeof s !== 'object' || s === null) return 'app state not an object'
    if ('rangeModifier' in s === false) return 'rangeModifier not in app state'
    if ('dsnModifier' in s === false) return 'dsnModifier not in app state'
    if ('contents' in s === false) return 'contents not in app state'
    if ('customAntennas' in s === false) { (s as any).customAntennas = [] }
    if ('customPlanets' in s === false) { (s as any).customPlanets = [] }
    return true
  }, 'settings')

  return [ settings, setSettings ] as const
}

export type GlobalSettingsSetter = ReturnType<typeof useGlobalSettings>[1]


export function SettingsSection(props: {
  settings: GlobalSettings,
  onSettingsChange: (n: GlobalSettings) => void,
}) {
  const path = usePathname()

  const changeModifier = (setting: "rangeModifier" | "dsnModifier" | "occlusionModifierAtm" | "occlusionModifierVac", value: number) => {
    props.onSettingsChange({ ...props.settings, [ setting ]: value })
  }
  const changeContentToggle = (which: PackageNames, value: boolean) => {
    props.onSettingsChange({ ...props.settings, contents: { ...props.settings.contents, [ which ]: value } })
  }

  const rangeModifierField = useField(numberField({
    initialData: () => props.settings.rangeModifier,
    onValidChange: (v) => changeModifier("rangeModifier", v),
    resetValue: () => getInitialGlobalSettings().rangeModifier,
    nonnegative: true,
  }))
  const dsnModifierField = useField(numberField({
    initialData: () => props.settings.dsnModifier,
    onValidChange: (v) => changeModifier("dsnModifier", v),
    resetValue: () => getInitialGlobalSettings().dsnModifier,
    nonnegative: true,
  }))
  const occlusionModifierAtmField = useField(numberField({
    initialData: () => props.settings.occlusionModifierAtm,
    onValidChange: (v) => changeModifier("occlusionModifierAtm", v),
    resetValue: () => getInitialGlobalSettings().occlusionModifierAtm,
    nonnegative: true,
  }))
  const occlusionModifierVacField = useField(numberField({
    initialData: () => props.settings.occlusionModifierVac,
    onValidChange: (v) => changeModifier("occlusionModifierVac", v),
    resetValue: () => getInitialGlobalSettings().occlusionModifierVac,
    nonnegative: true,
  }))





  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div className="flex flex-col gap-0.5">

      <Link href={`/custom-body?back=${ path }`} className={cns.buttonBase()}>
        <LucideEarth />
        Manage Celestial Bodies
      </Link>

      <Link href={`/custom-antenna?back=${ path }`} className={cns.buttonBase()}>
        <IcRoundSatelliteAlt />
        Manage Antennas
      </Link>

      <div className="flex flex-col gap-0 mt-2">
        {packageNames.map(pack => {
          if (pack === "stock") return
          const pkg = packages[ pack as PackageNames ]
          const antennaCount = Object.keys(pkg.antennas ?? {}).length
          const planetCount = Object.keys(pkg.planets ?? {}).length
          return (
            <CheckboxRow
              key={pack}
              className="w-full justify-start"
              label={<div className="flex flex-col leading-4">
                <div>{pkg.name}</div>
                <div className={cns.textMuted("text-sm leading-5")}>
                  {[
                    !!antennaCount && `${ antennaCount } antennas`,
                    !!planetCount && `${ planetCount } planets`
                  ].filter(Boolean).join(' + ')}
                </div>
              </div>}
              onValueChange={(val) => changeContentToggle(pack as PackageNames, val)}
              value={props.settings.contents[ pack as PackageNames ] ?? false}
            />
          )
        })}
      </div>
    </div>

    <div className="flex flex-col gap-6">


      <div className="flex gap-px pb-2">
        {([
          {
            label: "Normal",
            rangeModifier: 1,
            dsnModifier: 1,
            occlusionModifierVac: 0.90,
            occlusionModifierAtm: 0.75,
          },
          {
            label: "Moderate",
            rangeModifier: 0.8,
            dsnModifier: 1,
            occlusionModifierVac: 1,
            occlusionModifierAtm: 0.85,
          },
          {
            label: "Hard",
            rangeModifier: 0.65,
            dsnModifier: 1,
            occlusionModifierVac: 1,
            occlusionModifierAtm: 1,
          },
        ] satisfies {
          label: string,
          rangeModifier: number,
          dsnModifier: number,
          occlusionModifierAtm: number,
          occlusionModifierVac: number,
        }[]).map((e, i) => {
          return <button key={i} onClick={() => {
            props.onSettingsChange({
              ...props.settings,
              ...e
            })
            rangeModifierField.setValue(e.rangeModifier)
          }} className={cns.buttonPresetGroup("w-20 py-2")}>
            {e.label}
          </button>
        })}
      </div>

      <div className="flex flex-col gap-4">

        {/* The value of this slider is a multiplier value that is applied to the power levels of all antennae */}
        <FieldBlock
          label="Range Modifier"
          field={rangeModifierField}
          displayValue={props.settings.rangeModifier}
        />

        {/* The value of this slider is a multiplier value that is applied to the power level of the DSN Network */}
        <FieldBlock
          label="DSN Modifier"
          field={dsnModifierField}
          displayValue={props.settings.rangeModifier}
        />

        {/* The value of this slider is a multiplier value that is applied to the effective size of atmosphereless bodies that can block signals between antennas. */}
        <FieldBlock
          label="Occlusion Modifier, Atm"
          field={occlusionModifierAtmField}
          displayValue={props.settings.occlusionModifierAtm}
        />

        {/* The value of this slider is a multiplier value that is applied to the effective size of bodies with atmospheres that can block signals between antennas. */}
        <FieldBlock
          label="Occlusion Modifier, Vac"
          field={occlusionModifierVacField}
          displayValue={props.settings.occlusionModifierVac}
        />


        <button
          className={cns.buttonBase("mt-4")}
          onClick={() => props.onSettingsChange(getInitialGlobalSettings())}
        >
          <LucideRotateCcw />
          Reset All Data
        </button>
      </div>

      {/* <div className="flex flex-col gap-0.5">
        <label className="text-sm">Occlusion Modifier, Vac</label>
        <div className="flex gap-2 items-center">
          <NumberInput className={cns.input.box("max-w-60")} type="number"
            value={props.settings.occlusionModifierAtm}
            onValueChange={n => changeModifier("occlusionModifierAtm", n)}
          />

          <ResetSettingsIconButton onClick={() => changeModifier("occlusionModifierAtm", getInitialGlobalSettings().occlusionModifierAtm)}>
            <LucideRotateCcw />
          </ResetSettingsIconButton>
        </div>
      </div> */}


    </div>
  </div>
}