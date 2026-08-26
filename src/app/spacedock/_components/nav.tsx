import { cns } from "@/design-system"
import { LucideArrowUpRight } from "@/ui/icons"
import Link from "next/link"
import { LoginDialog } from "../page.client"
import { cn } from "@/ui/cn"

export const registerLink = "https://spacedock.info/register"

export function SpacedockNavbar(props: {
  className?: string,
  hideLogo?: boolean,
}) {
  return (
    <nav className={cn("flex justify-between items-center w-full gap-1 -mt-4", props.className)}>
      <Link href="/spacedock"
        className={cns.buttonGhost(
          "font-semibold tracking-tight text-lg opacity-100 -mx-4",
          props.hideLogo ? "opacity-0 pointer-events-none" : ""
        )}>
        ./spacedock
      </Link>

      <div className="flex gap-1 items-center">
        <Link className={cns.buttonGhost("px-5 flex items-center")} href={registerLink} target="_blank">
          Register <LucideArrowUpRight />
        </Link>

        <LoginDialog>
          <button className={cns.buttonBase("px-6")}>
            Login
          </button>
        </LoginDialog>
      </div>
    </nav>
  )
}