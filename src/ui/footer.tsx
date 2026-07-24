import { cns } from "@/design-system"
import { IcBaselineDiscord, LucideArrowUpRight, MdiGithub } from "./icons"

export function Footer() {
  return (
    <footer className={cns.text.muted("text-sm")}>
      <div>Feedbacks are welcome!</div>
      <br />
      <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://github.com/alfonsusac/ksp-helper">
        Source (github) <MdiGithub /><LucideArrowUpRight />
      </a>
      <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://discord.gg/Br2bf4ar">
        My discord <IcBaselineDiscord /><LucideArrowUpRight />
      </a>
      <a className="flex gap-1 items-center hover:underline cursor-pointer" target="_blank" href="https://discord.gg/B9Ns6rCYm">
        r/KerbalSpaceProgram discord <IcBaselineDiscord /><LucideArrowUpRight />
      </a>
    </footer>
  )
}