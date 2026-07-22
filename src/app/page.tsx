import { cns } from "@/design-system"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className={cns.text.base("p-8 flex flex-col gap-4 max-w-200 w-screen")}>

      <header className="flex flex-col gap-1">
        <h1 className={"text-2xl"}>KSP Tools</h1>
        <p className={cns.text.muted()}>Tools for play Kerbal Space Program</p>
      </header>

      <Link
        href={'/antenna-range'}
        className="grid grid-cols-2 sm:grid-cols-3">

        <div className={cns.linkCard("flex gap-4 p-3 rounded-xl")}>
          <div className="">
            <img src="/icon.png" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="leading-4">Maximum Antenna Range Calculator</div>
            <div className={cns.text.muted("text-sm leading-3.5")}>Calculate the maximum range of antennas between two vessels</div>
          </div>
        </div>

      </Link>

    </main>
  )
}