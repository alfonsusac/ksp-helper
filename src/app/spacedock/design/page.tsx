"use client"

import { cns } from "@/design-system"
import { component } from "@/lib/component"
import { cn } from "@/ui/cn"
import { LucideArrowRight, LucideArrowUpRight, LucideCalendar } from "@/ui/icons"
import type { ReactNode } from "react"

export default function DesignSystemPage() {
  return (
    <div>
      <h1>Design System</h1>

      <Section>
        <h2>Color Palette</h2>

        <Row className="gap-8">
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
        </Row>

      </Section>
      <Section>
        <h2>Color Semantics</h2>

        <Group className="gap-0" >

          <ColorSemanticItemBase>
            {/* <div></div> */}
            <Light className="rounded-t-lg py-4" />
            <Dark className="rounded-t-lg py-4" />
          </ColorSemanticItemBase>

          <ColorSemanticItem />
          <ColorSemanticItem
            example={<hr className="border-divider mt-2" />}
          />
          <ColorSemanticItem
            example={<p className="text-fg-base">Hello World</p>}
          />
          <ColorSemanticItem
            example={<p className="text-fg-label">Hello World</p>}
          />
          <ColorSemanticItem
            example={<p className="text-fg-muted">Hello World</p>}
          />
          <ColorSemanticItem
            example={<p className="text-fg-faint">No mods found</p>}
          />
          <ColorSemanticItem
            example={<p className="text-fg-green">Kerbal Space Program</p>}
          />
          <ColorSemanticItem
            example={<p className={cns.articleLink("wrap-anywhere")}>Hello World <LucideArrowUpRight className="inline" /></p>}
          />
          <ColorSemanticItem
            example={<p className={cns.navigationLink("flex")}>Source Code <LucideArrowUpRight /></p>}
          />
          <ColorSemanticItem
            example={<input className={cns.inputBox()} name="username" />}
          />
          <ColorSemanticItem
            example={
              <>
                <div className={cns.card()} >
                  <p className={cns.base()}>Hello World</p>
                  <p className={cns.textMuted()}>This is a card</p>
                </div>
              </>
            }
          />
          <ColorSemanticItem
            example={
              <>
                <div className={cns.card()} >
                  <p className={cns.base()}>Hello World</p>
                  <p className={cns.textMuted()}>This is a card</p>
                </div>
              </>
            }
          />
          <ColorSemanticItem
            example={
              <div className={cns.errorCard()} >
                <p className={cns.errorTextBase()}>Warning</p>
                <p className={cns.errorTextMuted()}>Something went wrong</p>
              </div>
            }
          />
          <ColorSemanticItem
            example={
              <div className="grid gap-2 grid-cols-3">
                <button className={cns.buttonBase()}>Login <LucideArrowRight/> </button>
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
            }
          />

          <ColorSemanticItem
            example={
              <div className={cns.popover.base("p-8 my-8")} >
                Hello World from Popover
              </div>
            }
          />

          {/* Bottom Part lol */}
          <ColorSemanticItemBase>
            <Light className="rounded-b-lg py-4" />
            <Dark className="rounded-b-lg py-4" />
          </ColorSemanticItemBase>
        </Group>

      </Section>
    </div>
  )
}

const Section = component("section", { class: cn("my-16") })
const Group = component("div", { class: cn("my-4 flex flex-col gap-2") })
const Row = component("div", { class: cn("flex gap-2") })
const Grid = component("div", { class: cn("grid gap-2") })


const TokenCardBase = component("div", { class: cn("shrink-0 size-5 rounded-sm bg-transparent border border-stroke/50") })

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
const Light = component(Viewport, { class: cn("scheme-light") })
const Dark = component(Viewport, { class: cn("scheme-dark") })

function ColorSemanticItem(props: {
  example?: ReactNode,
}) {
  return <>
    <ColorSemanticItemBase>
      <LightDarkExample>
        {props.example}
      </LightDarkExample>
    </ColorSemanticItemBase>
  </>
}

function TokenItem(props: {
  token: string,
  className: string,
}) {
  return <>
    <div className="grid grid-cols-[1.4rem_auto] items-center">
      <TokenCardBase className={cn(props.className, "size-4")} />
      {props.token}
    </div>
  </>
}

function LightDarkExample(props: {
  children?: ReactNode
}) {
  return (
    <>
      <Light>{props.children}</Light>
      <Dark>{props.children}</Dark>
    </>
  )
}
