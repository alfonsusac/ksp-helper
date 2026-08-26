import type { ModList } from "@/lib/spacedock-core/spacedock"
import { cn } from "@/ui/cn"
import { Suspense, type ReactNode } from "react"
import { ModItemCard } from "./mod-item-card"
import { LucideArrowRight } from "@/ui/icons"
import Link from "next/link"
import { cns } from "@/design-system"


export function PageSection1(props: {
  maxWidth: string,
  children?: ReactNode,
  title?: ReactNode,
  action?: ReactNode,
}) {
  return <>
    <section className="flex flex-col gap-4">
      <div className={cn("flex", props.maxWidth)}>
        <h2 className={"text-xl grow"}>{props.title}</h2>
        <Suspense>
          {props.action}
        </Suspense>
      </div>
      {props.children}
    </section>
  </>
}

export function FullWidthOverflowRow(props: {
  className?: string,
  children?: ReactNode
}) {
  return (
    <div className={cn("flex -mx-8 justify-center", props.className)}>
      <div className={cn(
        "flex gap-2 overflow-scroll pb-8",
        // "px-14"
      )}>
        {props.children}
      </div>
    </div>
  )
}

export function ModListRow(props: {
  maxWidth: string
  title: string
  data: Promise<ModList>
  seeMore: {
    href: string
    label: string
  }
  showGameLabel?: boolean,
  showUpdatedAt?: boolean,
  emptyLabel: string,
}) {

  return <>
    <PageSection1
      maxWidth={props.maxWidth}
      title={props.title}
      action={<ModListRow_SeeMoreButton
        data={props.data}
        href={props.seeMore.href}
        label={props.seeMore.label}
      />}
    >
      <Suspense fallback={
        <FullWidthOverflowRow
          className={props.maxWidth}
        >
          {Array.from({ length: 8 }, (_, i) => <ModItemCard key={i}
            showGameLabel={props.showGameLabel}
            showUpdatedAt={props.showUpdatedAt}
          />)}
        </FullWidthOverflowRow>
      }>
        <ModListElementArray
          data={props.data}
          maxWidth={props.maxWidth}
          emptyLabel={props.emptyLabel}
          showGameLabel={props.showGameLabel}
          showUpdatedAt={props.showUpdatedAt}
        />
      </Suspense>
    </PageSection1>
  </>
}

async function ModListRow_SeeMoreButton(props: {
  data: Promise<ModList>,
  label: string // See all featured mods
  href: string
}) {
  const list = await props.data
  if (list.length === 0) return <></>
  return <Link href={props.href} className={cns.buttonBase("self-end w-fit px-4")}>
    {props.label} <LucideArrowRight />
  </Link>
}

async function ModListElementArray(props: {
  maxWidth: string
  data: Promise<ModList>
  showGameLabel?: boolean,
  showUpdatedAt?: boolean,
  emptyLabel: string, // Nothing featured yet
}) {
  const list = await props.data

  if (list.length === 0) return <>
    <div className={cn("grid grid-cols-1 grid-rows-1 place-items-center w-full rounded-lg", props.maxWidth, cns.placeholder())}>
      <div className={cns.textFaint("col-start-1 row-start-1")}>{props.emptyLabel}</div>
      <ModItemCard className={cn("grow w-full col-start-1 row-start-1 opacity-0 animate-none")}
        showGameLabel={props.showGameLabel}
        showUpdatedAt={props.showUpdatedAt}
      />
    </div>
  </>

  return <>
    <FullWidthOverflowRow
      className={props.maxWidth}
    >
      {list.map(mod => {
        return <ModItemCard key={mod.id} mod={mod}
          showGameLabel={props.showGameLabel}
          showUpdatedAt={props.showUpdatedAt}
        />
      })}
    </FullWidthOverflowRow>
  </>
}