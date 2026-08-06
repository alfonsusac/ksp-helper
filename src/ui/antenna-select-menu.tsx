import { cns } from "@/design-system"
import type { AntennaPayload } from "@/lib/antenna"
import { groupToList } from "@/lib/object"
import { getPackageName, type AntennaData, type AntennaItemData } from "@/lib/get-data"
import { EmojioneMonotoneSatelliteAntenna, LucideMinus, LucidePlus, LucideX, StreamlineWifiAntennaRemix } from "./icons"
import { prettyNum } from "@/lib/prettier"
import { Menu } from "@base-ui/react"
import { MenuHelperText, MenuItem, MenuPopup } from "./input"
import { cn } from "./cn"

export function AntennaInput(props: {
  value: AntennaPayload,
  onChange: (a: AntennaPayload) => void,
  antennas: AntennaData,
  className?: string,
  filter?: (antenna: AntennaItemData) => boolean
}) {

  const addAntenna = (type: string) => {
    const qty = props.value.get(type) ?? 0
    props.value.set(type, qty + 1)
    props.onChange(props.value)
  }

  const removeAntenna = (type: string) => {
    const qty = props.value.get(type) ?? 0
    if (qty < 1) return
    props.value.set(type, qty - 1)
    props.onChange(props.value)
  }

  const clearAntenna = (type: string) => {
    props.value.set(type, 0)
    props.onChange(props.value)
  }

  const filter = props.filter ?? (() => true)
  const groupedAntennas = groupToList(props.antennas.filter(filter), e => e.package)
  const hasAntenna = props.antennas.some(a => (props.value.get(a.id) ?? 0) > 0)

  return (
    <div className="flex flex-col gap-2">

      {hasAntenna &&
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-3 gap-2",
          props.className
        )}>
          {props.antennas.map((antenna) => {
            const qty = props.value.get(antenna.id) ?? 0
            if (qty === 0) return null
            return (
              <div key={antenna.id} className="flex items-start">
                <div className={cns.card(
                  "grow h-full",
                  "p-2 flex gap-2 text-sm tracking-tight",
                )}
                >
                  <div className="aspect-square object-contain max-w-14 max-h-14 shrink-0 w-full">
                    {antenna.image ?
                      <img
                        className="aspect-square object-contain"
                        src={antenna.image}
                      /> : <EmojioneMonotoneSatelliteAntenna className={cns.text.muted("size-full p-2")} />
                    }
                  </div>
                  <div className="flex flex-col grow">
                    <div className="text-pretty leading-4 shrink-0">
                      {antenna.label}
                    </div>
                    <div className={cns.text.muted("grow shrink-0 text-xs")}>
                      {prettyNum(antenna.rating)} <span className="capitalize">({(antenna.type)})</span>
                    </div>
                    <div className="flex items-center shrink-0 text-base">
                      <div className="grow text-sm">{!!qty && `x${ qty }`}</div>
                      <button className={cns.button.iconGhost("shrink-0", qty ? "" : "opacity-0 pointer-events-none")} onClick={() => clearAntenna(antenna.id)}>
                        <LucideX />
                      </button>
                      <button className={cns.button.iconGhost("shrink-0", qty ? "" : "opacity-0 pointer-events-none")} onClick={() => removeAntenna(antenna.id)}>
                        <LucideMinus />
                      </button>
                      <button className={cns.button.iconGhost("shrink-0")} onClick={() => addAntenna(antenna.id)} >
                        <LucidePlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }

      <Menu.Root>
        <Menu.Trigger
          render={
            <button className={cns.button.ghost("text-sm justify-start")}>
              <LucidePlus />
              <StreamlineWifiAntennaRemix className="size-4 mr-1" />
              Add Antenna
            </button>
          }
        >
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Backdrop />
          <Menu.Positioner side="bottom" sideOffset={4}>
            <MenuPopup>
              {groupedAntennas.map((pkg) => {
                const packageLabel = getPackageName(pkg.key)
                return <div key={pkg.key} className="flex flex-col gap-1">
                  <MenuHelperText>{packageLabel}</MenuHelperText>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pkg.list.map(antenna => {
                      return (
                        <MenuItem
                          key={antenna.id}
                          onClick={() => addAntenna(antenna.id)}
                        >
                          <div className="size-10 rounded-full shrink-0">
                            {<>
                              <div className="aspect-square max-w-14 max-h-14">
                                {antenna.image ?
                                  <img
                                    className="aspect-square object-contain"
                                    src={antenna.image}
                                  /> : <EmojioneMonotoneSatelliteAntenna className={cns.text.muted("size-9")} />
                                }
                              </div>
                            </>}
                          </div>
                          <div className="flex flex-col">
                            <div>{antenna.label}</div>
                            <div className={cns.text.muted("text-xs")}>
                              {prettyNum(antenna.rating)}{' '}
                              <span>|{' '}
                                {antenna.combinabilityExponent === 0 ?
                                  <span className="opacity-50">non-combinable</span> :
                                  antenna.combinabilityExponent > 0.75 ?
                                    "very combinable" : "combinable"
                                }
                              </span>
                            </div>
                          </div>
                        </MenuItem>
                      )
                    })}
                  </div>
                </div>
              })}
            </MenuPopup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>


    </div>
  )

}