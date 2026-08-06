import { groupToList } from "@/lib/object"
import { packages, type PlanetData, type PlanetItemData } from "@/lib/get-data"
import { Menu } from "@base-ui/react"
import { MenuHelperText, MenuItem, MenuPopup } from "./input"
import { LucideChevronDown } from "./icons"
import { cns, menuTrigger } from "@/design-system"
import { Fragment } from "react/jsx-runtime"
import { useGlobalSettings } from "./settings-section"

export function PlanetSelectMenu(props: {
  value: string,
  onValueChange: (planet: string) => void,
  planetData: PlanetData,
  filter?: (planet: PlanetItemData) => boolean,
}) {
  const filter = props.filter ?? (() => true)

  const groupedPlanet = groupToList(
    props.planetData.list.filter(filter), e => e.package
  )
  return (
    <Menu.Root>
      <Menu.Trigger className={menuTrigger()}>
        <div className="grow">
          {props.value}
        </div>
        <div><LucideChevronDown /></div>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Backdrop />
        <Menu.Positioner side="top" sideOffset={4}>
          <MenuPopup>
            {groupedPlanet.map((pkg) => {
              const packageLabel = pkg.key === "Custom" ? "Custom" : packages[ pkg.key as keyof typeof packages ].name
              return <div key={pkg.key} className="flex flex-col gap-1">
                <MenuHelperText>{packageLabel}</MenuHelperText>
                <div className="grid grid-cols-3 gap-3">
                  {pkg.list.map(planet => {
                    return (<Fragment key={planet.id}>
                      <MenuItem key={planet.id}
                        onClick={() => props.onValueChange(planet.id)}
                      >
                        <div className="size-10 rounded-full shrink-0 overflow-hidden">
                          {planet.image === undefined ? <>
                            <div className={cns.planet()}></div>
                          </> : <>
                            <img
                              className="w-full h-full object-cover "
                              src={planet.image}
                              style={{
                                scale: planet.imageScale ? `${ planet.imageScale }` : undefined
                              }}
                            />
                          </>}
                        </div>
                        <div className="flex flex-col">
                          <div>{planet.id}</div>
                          <div className={cns.text.muted("capitalize text-xs")}>{packageLabel}</div>
                        </div>
                      </MenuItem>
                    </Fragment>)
                  })}
                </div>
              </div>
            })}
          </MenuPopup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}