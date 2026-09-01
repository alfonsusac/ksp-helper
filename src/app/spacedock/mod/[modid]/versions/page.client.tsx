"use client"

import { DownloadButton } from "@/app/spacedock/_components/download-button"
import { SpacedockDownloadURLFileSizeClient } from "@/app/spacedock/_components/download-url-file-size-client"
import { cns } from "@/design-system"
import { relativeDate } from "@/lib/format-relative-date"
import { aggregateBy, countBy } from "@/lib/object"
import type { Version } from "@/lib/spacedock-core/spacedock"
import { cn } from "@/ui/cn"
import { LucideCheck, LucideChevronDown } from "@/ui/icons"
import { Select } from "@base-ui/react"
import { Suspense, useEffect, useState } from "react"

export function VersionPageClientSection(props: {
  versions: (Version & { html: string | null, sizePromise: Promise<number> })[],
  default_version_id: number
}) {
  const versions = props.versions

  const resetSelectedMap = () => aggregateBy(versions, "game_version", () => false)
  const countMap = countBy(versions, 'game_version')

  const [ selectedMap, setSelectedMap ] = useState<Map<string, boolean>>(resetSelectedMap)

  // Update selectedMap everytime incoming versions changed
  useEffect(() => {
    setSelectedMap(resetSelectedMap)
  }, [ props.versions ])

  const hasFilter = [ ...selectedMap.values() ].some(e => e)

  return <div className="flex flex-col gap-2">

    <div className="flex">
      <SelectVersionFilterDropdown
        selectedVersionsMap={selectedMap}
        countMap={countMap}
        onChange={setSelectedMap}
      />
    </div>

    <section className={cns.infoCard("wrap-break-word min-w-0")}>
      <div className="flex flex-col gap-2 wrap-break-word">
        {versions
          .filter(v => {
            if (!hasFilter) return true
            return selectedMap.get(v.game_version)
          })
          .map(v => {
            return <div key={v.id} className="flex flex-col items-start gap-2 relative pl-4 pb-8">
              <div className={cn(
                "absolute w-0.5 h-full left-0 mt-1 -mb-10  flex flex-col items-center",
                cns.bgMuted()
              )}>
                <div className={cns.bgMuted("size-3 rounded-full")} />
              </div>
              <div>
                <p className={cns.textMuted("flex gap-2")}>
                  {new Date(v.created).toLocaleDateString()}
                  <span className={cns.textFaint()}>|</span>
                  {relativeDate(v.created)}
                  <span className={cns.textFaint()}>|</span>
                  <span className={cns.textFaint()}>#{v.id}</span>
                </p>
                <h2 className="text-xl flex gap-2 items-center">
                  {v.friendly_version} for {v.game_version}
                  {props.default_version_id === v.id && <span className={cns.badge()}>Default</span>}
                </h2>
              </div>
              {v.html ?
                <div className={cns.infoCard("wrap-break-word bg-contrast/5 min-w-0 w-full")}>
                  <div className={cns.textFaint('text-xs')}>
                    Changelog
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: v.html }}
                    className={cns.docunment("wrap-break-word min-w-0")}>
                  </div>
                </div>
                :
                <div className={cns.textFaint(cns.infoCard("py-2"))}>
                  Changelog not provided
                </div>
              }
              <div className="flex items-center gap-4">
                <DownloadButton
                  downloadPath={v.download_path}
                />
                <div className={cns.textMuted()}>
                  <Suspense fallback={<i>Loading Size...</i>}>
                    <SpacedockDownloadURLFileSizeClient sizePromise={v.sizePromise} />
                  </Suspense>
                </div>
                <div className={cns.bgMuted("size-1.5 rounded-full")} />
                <div className={cns.textMuted()}>
                  {v.downloads.toLocaleString()} Downloads
                </div>

              </div>
            </div>
          })}
      </div>
    </section>
  </div>
}


function SelectVersionFilterDropdown(props: {
  selectedVersionsMap: Map<string, boolean>,
  countMap: Map<string, number>,
  onChange?: (v: Map<string, boolean>) => void,
}) {
  const versionList = [ ...[ ...props.selectedVersionsMap.entries() ].map(e => e[ 0 ]) ]

  const selected = [ ...[ ...props.selectedVersionsMap.entries() ].map(e => e[ 1 ] === true ? e[ 0 ] : undefined).filter(Boolean) ] as string[]

  return (
    <Select.Root multiple
      value={selected}
      onValueChange={(val) => {
        props.onChange?.(new Map(
          versionList.map(v => [ v, val.includes(v) ])
        ))
      }}
    >
      <Select.Trigger className={cns.inputBox(
        "transition",
        "data-popup-open:translate-y-px",
        "max-w-50 rounded-xl",
      )}>
        <Select.Value className="grow" >
          {(() => {
            if (selected.length === 0) return 'Game Versions'
            const firstLanguage = selected[ 0 ]
            const additionalLanguages = selected.length > 1 ? ` (+${ selected.length - 1 } more)` : ''
            return firstLanguage + additionalLanguages
          })()}
        </Select.Value>
        <Select.Icon className={cn(
          "data-popup-open:shadow-none",
          "data-popup-open:rotate-180 transition",
        )}>
          <LucideChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
        >
          <Select.Popup className={cns.popoverSurface("min-w-50")}>
            <Select.List className={cn("relative p-0.5 overflow-y-auto max-h-[var(--available-height)]")}>
              {versionList.map((v) => {
                return <Select.Item
                  key={v}
                  value={v}
                  className={cns.popoverItem("grid grid-cols-[1.5rem_auto] items-center")}
                >
                  <Select.ItemIndicator className="col-start-1">
                    <LucideCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText className="col-start-2">
                    {v}
                    <span className={cns.textMuted()}>{' '}
                      ({props.countMap.get(v)})
                    </span>
                  </Select.ItemText>
                </Select.Item>
              })}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>

    </Select.Root>
  )
}
