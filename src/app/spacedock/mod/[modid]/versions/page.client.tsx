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

    <section className={cns.surface2card("wrap-break-word min-w-0")}>
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
                <p className={cns.text.muted("flex gap-2")}>
                  {new Date(v.created).toLocaleDateString()}
                  <span className={cns.text.faint()}>|</span>
                  {relativeDate(v.created)}
                  <span className={cns.text.faint()}>|</span>
                  <span className={cns.text.faint()}>#{v.id}</span>
                </p>
                <h2 className="text-xl flex gap-2 items-center">
                  {v.friendly_version} for {v.game_version}
                  {props.default_version_id === v.id && <span className={cns.surface2card("text-xs p-1 px-2 inline-block text-current/75")}>Default</span>}
                </h2>
              </div>
              {v.html ?
                <div dangerouslySetInnerHTML={{ __html: v.html }} className={cns.docunment(cns.surface2card("py-0 wrap-break-word"))}>
                </div>
                :
                <div className={cns.text.faint(cns.surface2card("py-2"))}>
                  Changelog not provided
                </div>
              }
              <div className="flex items-center gap-4">
                <DownloadButton
                  downloadPath={v.download_path}
                />
                <div className={cns.text.muted()}>
                  <Suspense fallback={<i>Loading Size...</i>}>
                    <SpacedockDownloadURLFileSizeClient sizePromise={v.sizePromise} />
                  </Suspense>
                </div>
                <div className={cns.bgMuted("size-1.5 rounded-full")} />
                <div className={cns.text.muted()}>
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
      <Select.Trigger className={cns.input.box("min-w-50 rounded-xl", cns.surface2())}>
        <Select.Value className="grow" >
          {(() => {
            if (selected.length === 0) return 'Game Versions'
            const firstLanguage = selected[ 0 ]
            const additionalLanguages = selected.length > 1 ? ` (+${ selected.length - 1 } more)` : ''
            return firstLanguage + additionalLanguages
          })()}
        </Select.Value>
        <Select.Icon>
          <LucideChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
        >
          <Select.Popup className={cns.popover.base("min-w-50")}>
            <Select.List className={cn("relative p-0.5 overflow-y-auto max-h-[var(--available-height)]")}>
              {versionList.map((v) => {
                return <Select.Item
                  key={v}
                  value={v}
                  className={cns.popover.item("grid grid-cols-[1.5rem_auto] items-center")}
                >
                  <Select.ItemIndicator className="col-start-1">
                    <LucideCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText className="col-start-2">
                    {v}
                    <span className={cns.text.muted()}>{' '}
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
