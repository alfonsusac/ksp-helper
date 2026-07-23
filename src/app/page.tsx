import { cns } from "@/design-system"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className={cns.page()}>

      <header className="flex flex-col gap-1">
        <h1 className={"text-2xl"}>KSP Tools</h1>
        <p className={cns.text.muted()}>Tools to help play Kerbal Space Program</p>
      </header>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {
          [
            {
              href: "/antenna-range",
              thumb: "/icon.png",
              title: "Maximum Antenna Range Calculator",
              desc: "Calculate the maximum range of antennas between two vessels"
            },
            {
              href: "/relay-height",
              thumb: "/relay-height/icon.png",
              title: "Ideal Relay Height",
              desc: "Get the ideal height for a relay network"
            },
          ].map((o) => {
            return (
              <Link
                key={o.href}
                href={o.href}
                className={cns.linkCard("flex gap-4 p-3 rounded-xl")}>
                <div className="size-10 sm:size-16 shrink-0">
                  <img src={o.thumb} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="leading-4">{o.title}</div>
                  <div className={cns.text.muted("text-sm leading-3.5")}>{o.desc}</div>
                </div>
              </Link>
            )
          })
        }
      </div>


    </main>
  )
}