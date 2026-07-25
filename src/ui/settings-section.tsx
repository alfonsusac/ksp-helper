import { cns } from "@/design-system"
import { packageNames, packages, type PackageNames } from "@/lib/packages"
import { CheckboxRow } from "./input"
import { LucideRotateCcw } from "./icons"
import { useAppState } from "@/lib/use-app-state"

export type GlobalSettings = {
  rangeModifier: string,
  dsnModifier: string,
  contents: Record<PackageNames, boolean>
}

export function getInitialGlobalSettings(): GlobalSettings {

  const contentToggles = Object.fromEntries(Object.keys(packages).map(p => {
    if (p === "stock") return [ "stock" as const, true ]
    return [ p as PackageNames, false ]
  })) as Record<PackageNames, boolean>

  return {
    rangeModifier: "1",
    dsnModifier: "1",
    contents: contentToggles
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

  const changeModifier = (setting: "rangeModifier" | "dsnModifier", value: string) => {
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
      <div className="flex flex-col gap-0.5">
        <label className="text-sm">Range Modifier</label>
        <div className="flex gap-2 items-center">
          <input className={cns.input.box("max-w-60")} type="number"
            value={props.settings.rangeModifier}
            onChange={(e) => {
              changeModifier("rangeModifier", e.target.value)
            }} />
          <button className={cns.button.iconGhost()} onClick={() => changeModifier("dsnModifier", "1")}>
            <LucideRotateCcw />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-sm">DSN Modifier</label>
        <div className="flex gap-2 items-center">
          <input className={cns.input.box("max-w-60")} type="number"
            value={props.settings.dsnModifier}
            onChange={(e) => changeModifier("dsnModifier", e.currentTarget.value)} />
          <button className={cns.button.iconGhost()} onClick={() => changeModifier("dsnModifier", "1")}>
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