import { cnr, cns } from "@/design-system"
import { cn } from "@/ui/cn"
import type { IconComponent } from "@/ui/icons"
import type { ComponentProps, ReactNode } from "react"

export function PageDetail(props: ComponentProps<"div">) {
  return <div {...props} className={cn(
    "grid lg:grid-cols-[auto_18rem] grid-cols-1 grid-flow-row gap-4",
    props.className
  )} />
}

export function MainContent(props: ComponentProps<"div">) {
  return <div {...props} className={cn(
    "col-start-1 flex flex-col gap-2 max-w-180 mx-auto w-full",
    props.className
  )} />
}

export function ExtraInfo(props: ComponentProps<"aside">) {
  return <aside {...props} className={cn(
    "-col-start-2 z-20 max-w-180 mx-auto w-full flex flex-col gap-2 z-10",
    props.className
  )} />
}

export function ExtraInfoCard(props: {
  className?: string
  contentClassname?: string,
  children?: ReactNode,
  title?: string,
  infos?: {
    icon: IconComponent,
    title: string,
    value: ReactNode,
  }[]
}) {
  return <div className={cn(cns.infoCard(),
    "w-full flex flex-col gap-1 text-sm p-2",
    props.className
  )}>
    {props.title &&
      <div className={cns.textFaint("text-sm px-2 pt-1.5")}>
        {props.title}
      </div>
    }
    {props.infos && !!props.infos.length &&
      <div className="p-2.5 flex flex-col gap-3">
        {props.infos.map((e, i) => {
          return (
            <div key={i} className="flex gap-2">
              <e.icon className={cn("size-4", cns.cardHeaderIcon(), cns.textMuted("self-start shrink-0"))} />
              <div>
                <span className={cns.textMuted("shrink-0")}>
                  {e.title}:
                </span>
                <span className="wrap-break-word ml-1">
                  {e.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    }
    {props.children &&
      <div className={props.contentClassname}>
        {props.children}
      </div>
    }
  </div>
}

// export function ExtraInfoCardButton(props: ComponentProps<"div">) {
//   return <div {...props} className={cn(
//     "",
//     props.className
//   )} />
// }