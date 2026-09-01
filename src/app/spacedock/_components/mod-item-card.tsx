import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import Link from "next/link"
import { InvisibleText } from "./commons"
import { LucideDownload, MaterialSymbolsPackage2Sharp } from "@/ui/icons"
import { relativeDate } from "@/lib/format-relative-date"

const style = {
  cardLinkWrapper: cn("relative group"),
  cardLinkWrapperSkeleton: cn("pointer-events-none animate-pulse"),
  cardSurface: cns.linkCard("block overflow-hidden relative w-60 shrink-0 p-0"),
  cardThumb: cn("aspect-video grid place-items-center relative"),
  cardThumbVersionTooltip: cn(
    "absolute bg-black/75 rounded-tl-lg p-0.5 px-1.5 text-xs",
    "right-0 bottom-0 text-bg dark:text-fg",
    "z-10",
  ),
  cardThumbOverlay: cn(
    "absolute inset-0 bg-black/75 backdrop-blur-md p-3",
    "text-sm group-hover:opacity-100 opacity-0",
    "transition-opacity duration-75",
  ),
  cardThumbOverlayText: cn("line-clamp-5 text-bg dark:text-fg"),
  cardThumbPlaceholderIcon: cns.textMuted("opacity-25 size-1/2"),
  cardThumbImage: cn("object-cover w-full h-full aspect-video"),
  cardContentGroup: cn("grid grid-cols-[auto_1.8rem] gap-0 p-2 px-2.5 leading-4 "),
  cardContent: cn("p-2 px-2.5 leading-4 flex flex-col grow"),
  cardTitle: cn("line-clamp-1 col-span-full row-start-1"),
  cardAuthor: cns.textMuted("text-sm leading-5 col-start-1"),
  cardGameLabel: cns.textMuted("text-sm leading-3 col-start-1"),
  cardUpdatedAt: cns.textMuted("text-sm leading-3 col-start-1"),
  cardDownloadButtonPlaceholder: cn("size-8 shrink-0 mb-2 col-start-2 row-start-2 row-end-4 bg-red-500 place-self-end"),
  cardDownloadButton: cns.buttonGhost(
    "button-icon",
    "absolute bottom-2 right-2 size-8 p-1.5",
    "opacity-0 group-hover:opacity-100",
    "transition-opacity duration-100",
    cns.textMuted()
  ),
}

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
        style.cardLinkWrapper,
        isSkeleton && style.cardLinkWrapperSkeleton,
        props.className
      )}
    >
      <Link
        href={`/spacedock/mod/${ props.mod?.id }`}
        className={style.cardSurface}
      >
        <div className={style.cardThumb}>
          <div className={cn(style.cardThumbVersionTooltip, isSkeleton && "opacity-0")}>
            {props.mod?.versions[ 0 ].friendly_version ?? <InvisibleText />}
          </div>
          <div className={style.cardThumbOverlay}>
            <div className={style.cardThumbOverlayText}>
              {props.mod?.short_description ?? <InvisibleText />}
            </div>
          </div>
          {props.mod?.background ?
            // <Image
            <img
              width={500}
              height={500}
              alt={`Background image for ${ props.mod.name }`}
              className={style.cardThumbImage}
              src={`${ props.mod.background }`}
            /> : <MaterialSymbolsPackage2Sharp className={style.cardThumbPlaceholderIcon} />
          }
        </div>

        <div className={style.cardContentGroup}>
          {/* <div className={style.cardContent}> */}
            <div className={style.cardTitle}>
              {props.mod?.name ?? <InvisibleText />}
            </div>
            <div className={style.cardAuthor}>
              {props.mod?.author ?? <InvisibleText />}
            </div>
            {props.showGameLabel &&
              <div className={style.cardGameLabel}>
                {props.mod?.game ?? <InvisibleText />}
              </div>
            }
            {props.showUpdatedAt &&
              <div className={style.cardUpdatedAt}>
                {(props.mod ? relativeDate(new Date(props.mod.versions[ 0 ].created)) : undefined) ?? <InvisibleText />}
              </div>
            }
          {/* </div> */}
          {/* <div className={style.cardDownloadButtonPlaceholder}>
          </div> */}
        </div>

      </Link>
      <Link
        title="Download"
        href={'https://spacedock.info' + props.mod?.versions[ 0 ].download_path}
        className={style.cardDownloadButton}
      >
        <LucideDownload className="size-full" />
      </Link>
    </div>
  )
}