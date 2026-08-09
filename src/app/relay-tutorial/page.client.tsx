"use client"

import { cns } from "@/design-system"
import { useRelayTutorialAppState } from "./app-state"
import { InputBlock, NumberInput, TabSelectRow } from "@/ui/input"
import Link from "next/link"
import { LucideArrowRight } from "@/ui/icons"
import { fixedNum } from "@/lib/pretty-num"
import { HomeOrBackButton } from "@/ui/common.server"

export function RelayTutorial_Client() {

  const [ data, setData ] = useRelayTutorialAppState()
  if (!data) return null

  return (
    <div className={cns.page("max-w-160")}>

      <HomeOrBackButton />

      <header>
        <h1 className={cns.pageTitle()}>
          KSP Visualizer: Setting up Basic Relay Network
        </h1>
        <div className={cns.pageDescription()}>
          Simple guide on how to get your satellites into equal-distant constellation on a plane.
        </div>
      </header>

      <section className="flex flex-col gap-4 [&_p]:text-sm [&_p]:max-w-120 my-5">
        <p>This page will generate step-by-step guide on how to perform a series of steps to make a
          equal-distant constellation setup given the Height, Apsis, and Relay Count.
        </p>
        <p>
          Before showing the visual guide, you need to enter the altitude, apsis, and the relay count below.
        </p>
        <p>
          You can retrieve these values by using the relay-height tool here.
        </p>
        <Link href="/relay-height" className={cns.button.base()}>
          <LucideArrowRight />
          Get Relay Height Parameters
        </Link>
      </section>

      <section className="flex flex-col gap-2 my-2 [&_p]:text-sm [&_p]:max-w-120">
        <InputBlock label="Altitude" row className="grid grid-cols-[6rem_auto]">
          <NumberInput
            className="max-w-none"
            initialValue={data.height}
            onValueChange={n => {
              data.height = n
              setData({ ...data })
            }}
            validate={(n) => {
              if (n < 0) return "Can't be negative"
              return undefined
            }}
            unit="m"
          />
        </InputBlock>
        <InputBlock label="Apsis" row className="grid grid-cols-[6rem_auto]">
          <NumberInput
            className="max-w-none"
            initialValue={data.apoapsis}
            onValueChange={n => {
              data.apoapsis = n
              setData({ ...data })
            }}
            validate={(n) => {
              if (n < 0) return "Can't be negative"
              return undefined
            }}
            unit="m"
          />
        </InputBlock>
        <InputBlock label="Relay Count" row className="grid grid-cols-[6rem_auto]">
          <NumberInput
            className="max-w-none"
            initialValue={data.relayCount}
            onValueChange={n => {
              data.relayCount = n
              setData({ ...data })
            }}
            validate={(n) => {
              if (!Number.isInteger(n)) return "Can't have decimal"
              if (n < 0) return "Can't be negative"
              return undefined
            }}
            unit="m"
          />
        </InputBlock>
        <InputBlock label="Mode" row className="grid grid-cols-[6rem_auto]">
          <TabSelectRow
            items={[
              { label: "Diving", value: "diving" },
              { label: "Peaking", value: "peaking" },
            ]}
            value={data.mode}
            onValueChange={n => {
              data.mode = n
              setData({ ...data })
            }}
            itemClassName="p-1 w-auto grow"
          />
          {/* <NumberInput
            className="max-w-none"
            initialValue={data.relayCount}
            onValueChange={n => {
              data.relayCount = n
              setData({ ...data })
            }}
            validate={(n) => {
              if (!Number.isInteger(n)) return "Can't have decimal"
              if (n < 0) return "Can't be negative"
              return undefined
            }}
            unit="m"
          /> */}
        </InputBlock>
        {/* <div className="grid grid-cols-[6rem_auto] gap-2">
          <div />
          <button className={cns.button.base()}>
            Give me the visuals!
          </button>
        </div> */}
      </section>

      <section className="my-8">
        <div className="text-xl">tl:dr</div>
        <ol className="list-decimal pl-8 my-4">
          <li>Bring your satellite to altitude of <span className={cns.text.green()}>{fixedNum(data.height)}m</span></li>
        </ol>

      </section>

    </div>
  )
}