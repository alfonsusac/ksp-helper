"use client"

import { cns } from "@/design-system"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function UtilLayout(props: LayoutProps<any>) {

  const pathname = usePathname()

  return (
    <div className={cns.page()}>
      <div className={"flex flex-col"}>
        {
          [
            { label: "Alpha Matte BG Remover", href: "/alpha-matte-bg-remover" },
            { label: "Planet Cropper", href: "/planet-cropper" },
            { label: "Screen To Transparent", href: "/screen-to-transparent" },
          ].map((e, i) => {
            return (
              <Link
                key={i}
                href={e.href}
                className={cns.button.ghost(
                  "justify-start",
                  pathname === e.href && cns.button.subtle("justify-start")
                )}
              >
                {e.label}
              </Link>
            )
          })
        }
      </div>
      {props.children}
    </div>
  )
}