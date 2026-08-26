import { cns } from "@/design-system"
import { cn } from "@/ui/cn"
import { LucideArrowUpRight } from "@/ui/icons"
import Link from "next/link"

export function Footer(props: {
  maxWidth?: string,
}) {
  return <>
    <footer className={cn("py-24 flex gap-4 gap-y-12 flex-wrap", props.maxWidth)}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-xl">
            ./spacedock
          </div>
          <div className={cns.textMuted("text-sm text-pretty max-w-50")}>
            Unofficial spacedock wrapper to browse mods
          </div>
        </div>
        <div>
          <Link href="https://github.com/alfonsusac/ksp-helper/tree/main" target="_black" className={cns.navigationLink("flex items-center text-sm")}>
            Source Code <LucideArrowUpRight />
          </Link>
        </div>
        <div className={cns.textMuted('text-sm max-w-60')}>
          This website is not affiliated with spacedock.info
        </div>
      </div>
      <div className="flex gap-1 justify-end grow pr-12">
        <div className="flex gap-x-8 items-baseline max-w-140 self-end">
          <div className="">Spacedock's</div>
          <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
            {[
              { label: "Website", href: "https://spacedock.info/" },
              { label: "About", href: "https://spacedock.info/about" },
              { label: "Blog", href: "https://spacedock.info/blog" },
              { label: "Terms & Privacy", href: "https://spacedock.info/privacy" },
              { label: "API", href: "https://github.com/KSP-SpaceDock/SpaceDock/blob/master/api.md" },
              { label: "Support", href: "mailto:support@spacedock.info" },
              { label: "Matrix", href: "https://im.52k.de/#/room/#spacedock:52k.de" },
              { label: "Discord", href: "https://discord.gg/htPQYqC" },
              { label: "IRC", href: "http://webchat.esper.net/?channels=spacedock" },
              { label: "Donate", href: "https://www.patreon.com/user?u=2903335&ty=p" },
              { label: "Markdown Guide", href: "https://spacedock.info/markdown" },
            ].map((e, i) => {
              return (<Link key={i} href={e.href} target="_black"
                className={cns.navigationLink("text-sm flex items-center")}
              >
                {e.label} <LucideArrowUpRight />
              </Link>)
            })}
          </div>
        </div>
      </div>
    </footer>
  </>
}