import { cn } from "./cn"

const cnr = (...a: any[]) => (...b: any[]) => cn(...a, ...b)

export const cns = {
  bg: cnr("bg-white"),
  bgHover: cnr("bg-slate-200/50"),
  bgActive: cnr("bg-slate-200/75"),
  divider: cnr("border-slate-200"),
  dividerStrong: cnr("border-slate-300"),
  text: {
    strong: cnr("text-slate-700"),
    base: cnr("text-slate-500 font-medium font-mono"),
    muted: cnr("text-slate-400"),
    link: cnr(
      "text-slate-400/75 decoration-slate-300 hover:text-slate-400 hover:decoration-slate-400/50",
      "underline underline-offset-3",
    ),
  },
  input: {
    box: cnr(
      "rounded-md",
      "border border-slate-300",
      "px-3 p-2 px-3",
      "focus:outline-none",
      "flex items-center text-start gap-2 min-w-30",
      "shadow-sm shadow-slate-200",
    )
  },

  clickableUI: cnr(
    "select-none cursor-pointer"
  ),

  popover: {
    base: (...c: any) => cns.text.base(
      cns.bg(),
      cns.popover.transition(),
      cns.popover.border(),
      cns.popover.shadow(),
      cn(
        "outline-hidden",
        "rounded-lg",
        ...c,
      )
    ),
    transition: cnr(
      "transition-[scale,opacity] duration-75 ease-out",
      "data-starting-style:scale-[0.95] data-starting-style:opacity-0",
      "data-ending-style:scale-[0.95] data-ending-style:opacity-0",
    ),
    shadow: cnr(
      "shadow-md shadow-slate-300",
    ),
    border: cnr(
      "border border-slate-400"
    ),

    item: (...c: any) => cns.text.base(
      cns.clickableUI(),
      cn(
        "rounded-md outline-hidden",
        "data-highlighted:bg-slate-100",
        ...c,
      ),
    ),
    selectItemLayout: cnr(
      "grid grid-cols-[0.5rem_1fr]",
      "items-center gap-2",
    )
  },




  // Specials

  bgScience: cnr("bg-blue-200"),
  textScience: cnr("text-blue-500"),

  graphBarBg1: cnr("bg-red-200"),
  graphBarBg2: cnr("bg-orange-200"),
  graphBarBg3: cnr("bg-yellow-200"),
  graphBarBg4: cnr("bg-green-200"),

  graphBarScience: cnr("bg-blue-200/50"),

  cellNoData: cnr("bg-slate-100"),
  cellGradient1: "oklch(88.5% 0.062 18.334)",
  cellGradient2: "oklch(90.1% 0.076 70.697)",
  cellGradient3: "oklch(94.5% 0.129 101.54)",
  cellGradient4: "oklch(90.5% 0.093 164.15)",

  planet: cnr("bg-slate-300 size-full rounded-full shadow-[inset_0.25rem_0_10px_#0045]"),

}

export const buttonBase = cnr(
  cns.clickableUI(),
  "flex items-center justify-center rounded-sm gap-2",
  "px-3 py-2",
  "focus:outline-none",
  "hover:bg-slate-200/40",
  "active:hover:bg-slate-200/55"
)

export const button = {
  ghost: cnr(buttonBase("opacity-65 hover:opacity-100")),
  iconGhost: cnr(buttonBase("p-1.5 size-7")),
  default: cnr(buttonBase(
    "bg-slate-50 py-2",
  ))
}

export const errorColor = {
  border: cnr("border-red-300"),
  bg: cnr("bg-red-50"),
  text: {
    base: cnr("text-red-600"),
    desc: cnr("text-red-500")
  },
}

// Components

export const cardDanger = cnr(
  errorColor.bg(),
  errorColor.border(),
  errorColor.text.base(),
  "border",
  "rounded-md",
  "p-2 px-3"
)

export const card = cnr(
  "border border-slate-200 shadow-sm shadow-slate-100 rounded-md",
)

export const menuTrigger = cnr(
  cns.input.box(
    buttonBase(),
    "text-sm w-32",
  )
)