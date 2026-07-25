import { cns } from "@/design-system"
import { packageNames, packages, type PackageNames } from "@/lib/packages"
import { CheckboxRow, NumberInput } from "./input"
import { LucideRotateCcw } from "./icons"
import { useAppState } from "@/lib/use-app-state"

export type GlobalSettings = {
  rangeModifier: number,
  dsnModifier: number,
  contents: Record<PackageNames, boolean>,
  occlusionModifierAtm: number,
  occlusionModifierVac: number,
}

export function getInitialGlobalSettings(): GlobalSettings {

  const contentToggles = Object.fromEntries(Object.keys(packages).map(p => {
    if (p === "stock") return [ "stock" as const, true ]
    return [ p as PackageNames, false ]
  })) as Record<PackageNames, boolean>

  return {
    rangeModifier: 1,
    dsnModifier: 1,
    contents: contentToggles,
    occlusionModifierAtm: 0.75,
    occlusionModifierVac: 0.9,
  }
}

export function useGlobalSettings() {
  const [ settings, setSettings ] = useAppState("settings", getInitialGlobalSettings, (s) => {
    if (typeof s !== 'object' || s === null) return false
    if ('rangeModifier' in s === false) return false
    if ('dsnModifier' in s === false) return false
    if ('contents' in s === false) return false
    return true
  })
  return [ settings, setSettings ] as const
}


export function SettingsSection(props: {
  settings: GlobalSettings,
  onSettingsChange: (n: GlobalSettings) => void,
}) {

  const changeModifier = (setting: "rangeModifier" | "dsnModifier" | "occlusionModifierAtm" | "occlusionModifierVac", value: number) => {
    props.onSettingsChange({ ...props.settings, [ setting ]: value })
  }
  const changeContentToggle = (which: PackageNames, value: boolean) => {
    props.onSettingsChange({ ...props.settings, contents: { ...props.settings.contents, [ which ]: value } })
  }

  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col gap-0.5">
      <label className={cns.text.base("text-sm")}>Additional Contents</label>
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
                <div className={cns.text.muted("text-sm leading-5")}>
                  {[
                    !!antennaCount && `${ antennaCount } antennas`,
                    !!planetCount && `${ planetCount } planets`
                  ].filter(Boolean).join(' + ')}
                </div>
              </div>}
              onValueChange={(val) => changeContentToggle(pack as PackageNames, val)}
              value={props.settings.contents[ pack as PackageNames ]}
            />
          )
        })}
      </div>
    </div>

    <div className="flex flex-col gap-2">


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
          }} className={cns.button.presetGroup("w-20 py-2")}>
            {e.label}
          </button>
        })}
      </div>


      <div className="flex flex-col gap-0.5">
        <label className="text-sm">Range Modifier</label>
        {/* The value of this slider is a multiplier value that is applied to the power levels of all antennae */}
        <div className="flex gap-2 items-center">
          <NumberInput className={cns.input.box("max-w-60")} type="number"
            value={props.settings.rangeModifier}
            onValueChange={n => changeModifier("rangeModifier", n)}
          />
          <button className={cns.button.iconGhost()} onClick={() => changeModifier("rangeModifier", getInitialGlobalSettings().rangeModifier)}>
            <LucideRotateCcw />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">



        <label className="text-sm">DSN Modifier</label>
        {/* The value of this slider is a multiplier value that is applied to the power level of the DSN Network */}
        <div className="flex gap-2 items-center">
          <NumberInput className={cns.input.box("max-w-60")} type="number"
            value={props.settings.dsnModifier}
            onValueChange={n => changeModifier("dsnModifier", n)}
          />

          <button className={cns.button.iconGhost()} onClick={() => changeModifier("dsnModifier", getInitialGlobalSettings().dsnModifier)}>
            <LucideRotateCcw />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="text-sm">Occlusion Modifier, Atm</label>
        {/* The value of this slider is a multiplier value that is applied to the effective size of atmosphereless bodies that can block signals between antennas. */}
        <div className="flex gap-2 items-center">

          <NumberInput className={cns.input.box("max-w-60")} type="number"
            value={props.settings.occlusionModifierVac}
            onValueChange={n => changeModifier("occlusionModifierVac", n)}
          />

          <button className={cns.button.iconGhost()} onClick={() => changeModifier("occlusionModifierVac", getInitialGlobalSettings().occlusionModifierVac)}>
            <LucideRotateCcw />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="text-sm">Occlusion Modifier, Vac</label>
        {/* The value of this slider is a multiplier value that is applied to the effective size of bodies with atmospheres that can block signals between antennas. */}
        <div className="flex gap-2 items-center">

          <NumberInput className={cns.input.box("max-w-60")} type="number"
            value={props.settings.occlusionModifierAtm}
            onValueChange={n => changeModifier("occlusionModifierAtm", n)}
          />

          <button className={cns.button.iconGhost()} onClick={() => changeModifier("occlusionModifierAtm", getInitialGlobalSettings().occlusionModifierAtm)}>
            <LucideRotateCcw />
          </button>
        </div>
      </div>

      <button
        className={cns.button.base("mt-4 text-sm")}
        onClick={() => props.onSettingsChange(getInitialGlobalSettings())}
      >
        <LucideRotateCcw />
        Reset All Data
      </button>
    </div>
  </div>
}