import { cns } from "@/design-system"

export function SearchBox(props: {
  className?: string
}) {
  return <>
    <div className={cns.input.box("p-1 flex items-center max-w-120 rounded-lg", props.className)}>
      <input
        className={cns.input.reset("w-full border-none ml-2")}
        placeholder="Search mods..."
      />
      <button className={cns.button.base("px-5")}>
        Search
      </button>
    </div>
  </>
}