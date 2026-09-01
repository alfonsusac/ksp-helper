import type { ModList } from "@/lib/spacedock-core/spacedock"
import { cn } from "@/ui/cn"
import { Suspense, type ReactNode } from "react"
import { ModItemCard } from "./mod-item-card"
import { LucideArrowRight } from "@/ui/icons"
import Link from "next/link"
import { cnr, cns } from "@/design-system"

const style = {
  sectionBlock: cnr("flex flex-col gap-4"),
  sectionInner: cnr("flex"),
  sectionTitle: cnr("text-xl grow"),
}


export function PageSection1(props: {
  maxWidth: string,
  children?: ReactNode,
  title?: ReactNode,
  action?: ReactNode,
}) {
  return <>
    <section className={style.sectionBlock()}>
      <div className={style.sectionInner("flex", props.maxWidth)}>
        <h2 className={style.sectionTitle()}>{props.title}</h2>
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
    <div className={cn("flex justify-center -mx-8 relative", props.className)}>

      {/* Shadows */}
      <div className="absolute left-0 inset-y-0 w-8 dark:w-12 z-20  bg-linear-to-r from-bg/50 dark:from-bg to-transparent" />
      <div className="absolute right-0 inset-y-0 w-8 dark:w-12 z-20  bg-linear-to-l from-bg/50 dark:from-bg to-transparent" />

      <div className={cn(
        "flex gap-2 overflow-scroll pb-8! px-8",
      )}>
        {props.children}
      </div>
    </div>
  )
}

export function ModListRow(props: {
  maxWidth: `max-w-${string}`
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
  return <>
    <Link href={props.href} className={cns.buttonBase("self-end w-fit px-4 max-sm:hidden")}>
      {props.label} <LucideArrowRight />
    </Link>
    <Link href={props.href} className={cns.buttonBase("self-end w-fit px-4 sm:hidden")}>
      See More <LucideArrowRight />
    </Link>
  </>
}

async function ModListElementArray(props: {
  maxWidth: `max-w-${ string }`
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

