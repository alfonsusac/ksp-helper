import { cns } from "@/design-system"
import type { ReactNode } from "react"
import { CitationList } from "./list"

export function WhatIsThisSection(props: {
  descs: ReactNode[],
  sources: {
    title: string,
    author?: string,
    href: string,
  }[],
  priorWork: {
    title: string,
    author?: string,
    href: string,
  }[]
}) {
  return (
    <div className="flex flex-col gap-2 text-sm max-w-160">
      <h2 className={cns.text.muted("text")}>
        What is this?
      </h2>
      {props.descs.map((e, i) => {
        return (
          <div key={i}>{e}</div>
        )
      })}
      {/* <div>
        This calculator helps determine the Maximum Antenna Range in the game Kerbal Space Program which can be used to determine how high your relay orbit should
        be if you want to constraint to one type of antenna (as opposed to spamming 88-88 in every ship).
      </div>
      <div>
        It can also be used to calculate the strength of the rating to calculate how many
        percent of science can be transmitted from a vessel.
      </div> */}
      <h2 className={cns.text.muted("mt-2")}>
        Sources
      </h2>
      <ul className={"list-outside pl-4 list-disc"}>
        {props.sources.map((e, i) => {
          return (
            <CitationList key={i} {...e} />
          )
        })}
        {/* <CitationList title="KSP Wiki - Comnet" href="https://wiki.kerbalspaceprogram.com/wiki/CommNet" />
        <CitationList title="Ranges and Signal Strength | KSP Let's Do The Math" author="Mike Ruben" href="https://www.youtube.com/watch?v=hVd-WhL4tZ8" />
        <CitationList title="Science transmission relation to signal strength" href="https://forum.kerbalspaceprogram.com/topic/200317-science-transmission-relation-to-signal-strength" />
        <CitationList title="Signal Strength vs Science Bonus (Redone)" href="https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8" />
        <CitationList title="Min and Max Distance between Planets" href="https://forum.kerbalspaceprogram.com/topic/100439-min-max-distances-betwen-planets/" /> */}
      </ul>
      <h2 className={cns.text.muted("mt-2")}>
        Prior work
      </h2>
      <ul className={"list-outside pl-4 list-disc"}>
        {props.priorWork.map((e, i) => {
          return (
            <CitationList key={i} {...e} />
          )
        })}
        {/* <CitationList title="KSP CommNet Signal Strength Calculator & Antenna Selector" author="poodmund" href="https://docs.google.com/spreadsheets/d/1qIgFB8OXnlgpPCGsxv7JYUYQq5O671IcZXpumVaStek/htmlview" />
        <CitationList title="Comnet Planner" author="blaarkies" href="https://ksp-visual-calculator.blaarkies.com/commnet-planner" />
        <CitationList title="KSP Signal Strength Calculator" author="Westbrooke117" href="https://westbrooke117.github.io/KSPSSC/" /> */}
      </ul>
    </div>
  )
}