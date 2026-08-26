import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import Link from "next/link"
import { InvisibleText } from "./commons"
import { LucideDownload, MaterialSymbolsPackage2Sharp } from "@/ui/icons"
import { relativeDate } from "@/lib/format-relative-date"

export function ModItemCard(props: {
  mod?: {
    id: number,
    versions: {
      download_path: string,
      friendly_version: string,
      created: string,
    }[],
    short_description: string,
    background: string | null,
    name: string,
    author: string,
    game: string,
  }
  className?: string,
  showGameLabel?: boolean,
    showUpdatedAt?: boolean,
}) {
  const isSkeleton = props.mod === undefined
  return (
    <div
      className={cn(
        "relative group",
        isSkeleton && "pointer-events-none animate-pulse bg-black/10!",
        props.className
      )}
    >
      <Link
        href={`/spacedock/mod/${props.mod?.id}`}
        className={cns.linkCard(
          "block overflow-hidden relative w-60 shrink-0 p-0",
        )}>
        <div className="aspect-video grid place-items-center relative">
          <div className={cn(
            "absolute bg-black/75 rounded-tl-lg p-0.5 px-1.5 text-xs",
            "right-0 bottom-0",
            "z-10",
            isSkeleton && "opacity-0",
          )}>
            {props.mod?.versions[ 0 ].friendly_version ?? <InvisibleText />}
          </div>
          <div className={cn(
            "absolute inset-0 bg-black/75 backdrop-blur-md p-3",
            "text-sm group-hover:opacity-100 opacity-0",
            "transition-opacity duration-75",
          )}>
            <div className="line-clamp-5">
              {props.mod?.short_description ?? <InvisibleText />}
            </div>
          </div>
          {props.mod?.background ?
            // <Image
            <img
              width={500}
              height={500}
              alt={`Background image for ${ props.mod.name }`}
              className={cn("object-cover w-full h-full aspect-video")}
              src={`${ props.mod.background }`}
            /> : <MaterialSymbolsPackage2Sharp className={cns.textMuted("opacity-25 size-1/2")} />
          }
        </div>
        <div className="flex gap-0">
          <div className="p-2 px-2.5 leading-4 flex flex-col grow">
            <div className="line-clamp-1">
              {props.mod?.name ?? <InvisibleText />}
            </div>
            <div className={cns.textMuted("text-sm leading-5")}>
              {props.mod?.author ?? <InvisibleText />}
            </div>
            {props.showGameLabel &&
              <div className={cns.textMuted("text-sm leading-3")}>
                {props.mod?.game ?? <InvisibleText />}
              </div>
            }
            {props.showUpdatedAt &&
              <div className={cns.textMuted("text-sm leading-3")}>
                {(props.mod ? relativeDate(new Date(props.mod.versions[0].created)) : undefined) ?? <InvisibleText />}
              </div>
            }
          </div>
          <div className="size-10 shrink-0 self-end">
          </div>
        </div>
      </Link>
      <Link
        title="Download"
        href={'https://spacedock.info' + props.mod?.versions[ 0 ].download_path}
        className={cns.buttonGhost(
          "button-icon",
          "absolute bottom-2 right-2 size-8 bg-green-500/50",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-100",
          cns.textMuted()
        )}>
        <LucideDownload className="size-full" />
      </Link>
    </div>
  )
}