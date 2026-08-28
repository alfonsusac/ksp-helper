"use client"

import { cns } from "@/design-system"
import { component } from "@/ui/component"
import { cn } from "@/ui/cn"
import { SignalSymbol } from "@/ui/common"
import { LucideArrowRight, LucideArrowUpRight, LucideCalendar } from "@/ui/icons"
import { SelectRow, Slider, TabSelectRow } from "@/ui/input"
import { useState, type ReactNode } from "react"
import { Lorem } from "../_components/commons"
import { PlanetSelectMenu } from "@/ui/planet-select-menu"

export default function DesignSystemPage() {

  const [ slider, setSlider ] = useState(0.75)
  const [ select, setSelect ] = useState<"apple" | "banana">("apple")

  return (
    <div>
      <h1>Design System</h1>

      <Section>
        <h2>Color Palette</h2>

        <Flex className="gap-8">
          <Group>
            <h3>slate</h3>
            <Grid>
              <ColorPaletteItem bgColor="bg-slate-50" />
              <ColorPaletteItem bgColor="bg-slate-100" />
              <ColorPaletteItem bgColor="bg-slate-200" />
              <ColorPaletteItem bgColor="bg-slate-300" />
              <ColorPaletteItem bgColor="bg-slate-400" />
              <ColorPaletteItem bgColor="bg-slate-500" />
              <ColorPaletteItem bgColor="bg-slate-600" />
              <ColorPaletteItem bgColor="bg-slate-700" />
              <ColorPaletteItem bgColor="bg-slate-800" />
              <ColorPaletteItem bgColor="bg-slate-900" />
              <ColorPaletteItem bgColor="bg-slate-950" />
            </Grid>
          </Group>
          <Group>
            <h3>zinc</h3>
            <Grid>
              <ColorPaletteItem bgColor="bg-zinc-50" />
              <ColorPaletteItem bgColor="bg-zinc-100" />
              <ColorPaletteItem bgColor="bg-zinc-200" />
              <ColorPaletteItem bgColor="bg-zinc-300" />
              <ColorPaletteItem bgColor="bg-zinc-400" />
              <ColorPaletteItem bgColor="bg-zinc-500" />
              <ColorPaletteItem bgColor="bg-zinc-600" />
              <ColorPaletteItem bgColor="bg-zinc-700" />
              <ColorPaletteItem bgColor="bg-zinc-800" />
              <ColorPaletteItem bgColor="bg-zinc-900" />
              <ColorPaletteItem bgColor="bg-zinc-950" />
            </Grid>
          </Group>
        </Flex>
      </Section>


      <Section>
        <h2>Color Tokens</h2>

        <SurfaceTester>
          <Group className="gap-3 p-4 border border-transparent">



            <p className="text-fg line-clamp-3">fg<br /><a className="link-article inline-flex gap-2 self-start">Vercel</a> <Lorem /></p>
            <hr className="border-border" />
            <p className="text-fg2 line-clamp-3">fg2<br /><Lorem /></p>
            <hr className="border-border2" />
            <p className="text-fg3 line-clamp-3">fg3<br /><Lorem /></p>
            <hr className="border-border3" />

            <a className="link-navigation inline-flex gap-2 self-start">Source Code <LucideArrowUpRight /></a>
            <br />
            <Group className="px-2 gap-5">
              <div className="input-group">
                <label className="input-label" >Username</label>
                <input className="input-box" placeholder="Placeholder..." name="username" autoComplete="username" />
              </div>
              <div className="input-group group">
                <label className="input-label">Password</label>
                <input className="input-box input-box-error" value="Input value text" onChange={() => { }} />
                <p className={cns.errorTextMuted("text-sm")}>Something went wrong</p>
              </div>
              <div className={cns.inputBox("flex")}>
                <input className="input-reset input-reset-padding grow" />
                kg
              </div>
              <div className={cns.inputBox("flex")}>
                <input className="input-reset input-reset-padding grow" />
                <button className={"button-base -my-1 -mr-2"}>
                  Search
                </button>
              </div>
              <Slider
                className="grow"
                min={0} max={1} step={0.01}
                value={slider}
                onValueChange={setSlider}
              />
            </Group>
            <div className={cns.errorCard()} >
              <p className={cns.errorTextBase()}>Warning</p>
              <p className={cns.errorTextMuted()}>Something went wrong</p>
            </div>
            <button className="button-base"> Retry</button>
            <button className="button-base" disabled>Retry</button>

            <button className="button-subtle">Settings</button>
            <button className="button-subtle" disabled>Settings</button>

            <button className="button-ghost">Activate</button>
            <button className="button-ghost" disabled>Activate</button>

            <div className="grid gap-2 grid-cols-3">
              <button className={cns.buttonBase()}>Login <LucideArrowRight /> </button>
              <button className={cns.buttonSubtle()}><LucideArrowRight /> Subtle</button>
              <button className={cns.buttonGhost()}>Register <LucideArrowRight /></button>
              <button className={cns.buttonBase()} disabled>Next</button>
              <button className={cns.buttonSubtle()} disabled>Prev</button>
              <button className={cns.buttonGhost()} disabled>Back</button>
              <div className="flex gap-2">
                <button className={cns.buttonBase(cns.buttonIconSm())}><LucideCalendar /></button>
                <button className={cns.buttonSubtle(cns.buttonIconSm())}><LucideCalendar /></button>
                <button className={cns.buttonGhost(cns.buttonIconSm())}><LucideCalendar /></button>
              </div>
              <div className="flex gap-2">
                <button className={cns.buttonBase(cns.buttonIcon())}><LucideCalendar /></button>
                <button className={cns.buttonSubtle(cns.buttonIcon())}><LucideCalendar /></button>
                <button className={cns.buttonGhost(cns.buttonIcon())}><LucideCalendar /></button>
              </div>
              <div className="flex gap-2">
                <button className={cns.buttonBase(cns.buttonIconLg())}><LucideCalendar /></button>
                <button className={cns.buttonSubtle(cns.buttonIconLg())}><LucideCalendar /></button>
                <button className={cns.buttonGhost(cns.buttonIconLg())}><LucideCalendar /></button>
              </div>
            </div>
            <SelectRow
              data={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
              ]}
              label="Fruit"
              onValueChange={setSelect}
              value={select}
            />
            <TabSelectRow
              items={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
              ]}
              onValueChange={setSelect}
              value={select}
            />
            <div className={cns.card()}>
              Normal Card
            </div>
            <div className={cns.linkCard()}>
              Link Card
            </div>
            <div className={cns.infoCard()}>
              Info Card
            </div>


          </Group>
        </SurfaceTester>

      </Section>


      <Section>
        <h2>Component Dump</h2>

        <Group>
          <Flex className="items-baseline gap-4 flex-wrap">
            <SignalSymbol />
            <SignalSymbol strength={0.1} />
            <SignalSymbol strength={0.3} />
            <SignalSymbol strength={0.6} />
            <SignalSymbol strength={0.9} />
            <SignalSymbol barClassname={cns.bgScience()} />
          </Flex>
        </Group>

        <Group>
          <Flex className="items-baseline gap-4 flex-wrap">
            <div className={cns.card()} >
              <p>Hello World</p>
              <p className={cns.textMuted()}>This is a card</p>
            </div>

            <div className={cns.placeholder("p-8 rounded-md")} ><p className={cns.textFaint()}>Placeholder...</p></div>
            <div className={cns.infoCard()} ><p>Info card by @alfonsusac</p></div>
            <div className={cns.linkCard()} ><p>Link card to @alfonsusac</p></div>

            <div className={cns.popoverSurface("p-8")} >
              Hello World from Popover
            </div>
          </Flex>
        </Group>
      </Section>
    </div>
  )
}

const Section = component("section", { class: cn("my-16") })
const Group = component("div", { class: cn("my-4 flex flex-col gap-2") })
const Flex = component("div", { class: cn("flex gap-2") })
const Grid = component("div", { class: cn("grid gap-2") })


const TokenCardBase = component("div", { class: cn("shrink-0 size-5 rounded-sm bg-transparent border border-border/50") })


function ColorPaletteItem(props: { bgColor: string }) {
  const color = props.bgColor.replaceAll('bg-', '')
  return (
    <div className="flex gap-2">
      <TokenCardBase className={props.bgColor} />
      var(--color-{color})
    </div>
  )
}

// const ColorSemanticItemBase = component("div", { class: cn("grid grid-cols-[20rem_1fr_1fr] gap-2 min-h-10") })
const ColorSemanticItemBase = component("div", { class: cn("grid grid-cols-[1fr_1fr] gap-2 min-h-2") })

const Viewport = component("div", {
  class: cn(
    "bg-base w-full flex flex-col px-8 py-1 min-h-full gap-1",
    "overflow-hidden wrap-break-word",
  )
})


function SurfaceTester(props: {
  children?: ReactNode
}) {
  return (
    <Group className="gap-8">
      <Flex className="gap-4">
        <Group className="gap-3 p-4 border border-transparent">
          {props.children}
        </Group>
        <Group className="info-card p-4 rounded-xl gap-3">
          {props.children}
        </Group>
      </Flex>
    </Group>
  )
}
