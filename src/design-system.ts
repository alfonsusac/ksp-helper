import { cn } from "./ui/cn"

const cnr = (...a: any[]) => (...b: any[]) => cn(...a, ...b)

export const cns = {
  bg: cnr("           bg-white         dark:bg-zinc-900"),
  divider: cnr("      border-slate-200 dark:border-zinc-800"),
  dividerStrong: cnr("border-slate-300 dark:border-zinc-700"),
  text: {
    base: cnr("font-medium font-mono text-base",
      "               text-slate-500   dark:text-zinc-300",
    ),
    muted: cnr("      text-slate-400   dark:text-zinc-500"),
    link: cnr(
      "text-slate-400/75             dark:text-zinc-500",
      "decoration-slate-300          dark:decoration-zinc-700",
      "hover:text-slate-400          dark:hover:text-zinc-400",
      "hover:decoration-slate-400/50 dark:hover:decoration-zinc-600",
      "underline underline-offset-3 ",
    ),
  },
  input: {
    box: cnr(
      "rounded-md",
      "border    border-slate-300 dark:border-zinc-700",
      "shadow-sm shadow-slate-200 dark:shadow-zinc-950",
      "px-3 p-2 px-3",
      "focus:outline-none",
      "flex items-center text-start gap-2 min-w-30",
    )
  },
  error: {
    border: cnr(" border-red-300 dark:border-red-500/20"),
    bg: cnr("     bg-red-50      dark:bg-red-500/10"),
    text: {
      base: cnr(" text-red-600   dark:text-red-400"),
      muted: cnr("text-red-500   dark:text-red-400/75")
    },
  },


  // Common Components

  cardBorder: cnr("border    border-slate-200 dark:border-zinc-800"),
  cardShadow: cnr("shadow-sm shadow-slate-100 dark:shadow-zinc-950"),
  card: (...c: any[]) => cn(
    cns.cardBorder(),
    cns.cardShadow(),
    "p-2 px-3",
    "rounded-md",
    ...c,
  ),
  errorCard: (...c: any[]) => cns.card(
    cns.error.border(),
    cns.error.bg(),
    cns.error.text.base(),
    cns.cardShadow(),
    ...c,
  ),
  linkCard: (...c: any[]) => cn(
    "dark:hover:bg-zinc-800/25",
    "transition-shadow duration-75",
    "hover:shadow-lg hover:shadow-zinc-950/50",
    cns.card(),
    cns.clickableUI(),
    ...c,
  ),

  clickableUI: cnr(
    "select-none cursor-pointer"
  ),

  tab: {
    containerBg: cnr("             bg-slate-100          dark:bg-zinc-950/50"),
    containerBorder: cnr("         border-slate-200/50   dark:border-zinc-800"),
    selectedBg: cnr("              bg-white              dark:bg-zinc-800"),
    selectedBorder: cnr("border    border-slate-200      dark:border-zinc-700/50"),
    selectedShadow: cnr("shadow-sm shadow-slate-200      dark:shadow-zinc-950"),
    itemHoverBg: cnr("             hover:bg-slate-200/75 dark:hover:bg-zinc-800/50"),
  },

  button: {
    base: (...c: any) => cns.clickableUI(
      cn(
        "flex items-center justify-center rounded-md gap-2",
        "px-3 py-2",
        "focus:outline-none",
        "bg-slate-50            dark:bg-zinc-800/50",
        "hover:bg-slate-200/40  dark:hover:bg-zinc-700/50",
        "active:bg-slate-200/55 dark:active:bg-zinc-700/35",
        ...c
      ),
    ),
    ghost: (...c: any) => cns.button.base("bg-transparent dark:bg-transparent opacity-65 hover:opacity-100", ...c),
    iconGhost: (...c: any) => cns.button.ghost("p-1.5 size-7", ...c),
  },

  popover: {
    base: (...c: any) => cns.text.base(
      cns.popover.bg(),
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
      "data-starting-style:scale-[0.95] ",
      "data-starting-style:opacity-0",
      "data-ending-style:scale-[0.95]",
      "data-ending-style:opacity-0",
    ),
    shadow: cnr("shadow-md shadow-slate-300/50  dark:shadow-zinc-950/50 dark:shadow-lg"),
    border: cnr("border   border-slate-300/75 dark:border-zinc-700"),
    bg: cnr("             bg-white            dark:bg-zinc-900"),
    item: (...c: any) => cns.text.base(
      cns.clickableUI(),
      cn(
        "rounded-md outline-hidden",
        "data-highlighted:bg-slate-100 data-highlighted:bg-zinc-800",
        ...c,
      ),
    ),
    selectItemLayout: cnr(
      "grid grid-cols-[0.5rem_1fr]",
      "items-center gap-2",
    )
  },

  slider: {
    track: cnr("    bg-slate-200 dark:bg-zinc-800"),
    indicator: cnr("bg-slate-400 dark:bg-zinc-300"),
    thumb: cnr("    bg-slate-400 dark:bg-zinc-300"),
  },


  // Specials


  bgScience: cnr("       bg-blue-200     dark:bg-blue-500"),
  textScience: cnr("     text-blue-500   dark:text-blue-400"),

  signalBarBg: cnr("     bg-slate-500/20 dark:"),
  signalBarRed: cnr("    bg-red-400      dark:bg-red-500    "),
  signalBarOrange: cnr(" bg-orange-400   dark:bg-orange-500 "),
  signalBarYellow: cnr(" bg-yellow-400   dark:bg-yellow-500 "),
  signalBarGreen: cnr("  bg-green-400    dark:bg-green-500  "),

  graphBarBg1: cnr("     bg-red-200      dark:bg-red-400/20"),
  graphBarBg2: cnr("     bg-orange-200   dark:bg-orange-400/20"),
  graphBarBg3: cnr("     bg-yellow-200   dark:bg-yellow-400/20"),
  graphBarBg4: cnr("     bg-green-200    dark:bg-green-400/20"),

  graphBarScience: cnr(" bg-blue-200/50  dark:bg-blue-400/20"),

  // cell table

  dividerFaded: cnr("    border-slate-600/30 dark:border-zinc-400/20"),
  graphBarScience2: cnr("bg-blue-500/20      dark:bg-blue-400/50"),

  cellNoData: cnr("      bg-slate-100        dark:bg-zinc-900"),
  cellGradient1: "oklch(70.4% 0.191 22.216)", // red-400
  cellGradient2: "oklch(75% 0.183 55.934)", // orange-400
  cellGradient3: "oklch(85.2% 0.199 91.936)", // yellow-400
  cellGradient4: "oklch(76.5% 0.177 163.223)", // emerald-400

  planet: cnr("bg-slate-300 size-full rounded-full shadow-[inset_0.25rem_0_10px_#0045]"),

}


export const menuTrigger = cnr(
  cns.input.box(
    cns.button.base(),
    "w-32",
  )
)