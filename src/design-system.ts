import { cn } from "./ui/cn"

const cnr = (...a: any[]) => (...b: any[]) => cn(...a, ...b)

export const cns = {
  bg: cnr("           bg-white         dark:bg-zinc-900"),
  divider: cnr("      border-slate-200 dark:border-zinc-800"),
  dividerStrong: cnr("border-slate-300 dark:border-zinc-700"),
  text: {
    base: cnr("font-medium font-mono text-base",
      "               text-slate-700   dark:text-zinc-300",
    ),
    muted: cnr("      text-slate-700/75   dark:text-zinc-500"),
    link: cnr(
      "text-slate-400/75             dark:text-zinc-500",
      "decoration-slate-300          dark:decoration-zinc-700",
      "hover:text-slate-500          dark:hover:text-zinc-400",
      "hover:decoration-slate-500/50 dark:hover:decoration-zinc-600",
      "underline underline-offset-3 ",
    ),
    link2: cnr(
      "text-slate-400/75             dark:text-zinc-500",
      "hover:text-slate-400          dark:hover:text-zinc-400",
    )
  },
  input: {
    box: cnr(
      "rounded-md",
      "border    border-slate-300 dark:border-zinc-700",
      // "shadow-sm shadow-slate-200 dark:shadow-zinc-950",
      "px-3 p-2 px-3",
      "focus:outline-none",
      "flex items-center text-start gap-2 min-w-30",
    ),
    errorBox: cnr(
      "border border-red-400 dark:border-red-500/50",
    ),
  },
  error: {
    border: cnr(" border-red-300 dark:border-red-500/20"),
    bg: cnr("     bg-red-50      dark:bg-red-500/10"),
    text: {
      base: cnr(" text-red-600   dark:text-red-400"),
      muted: cnr("text-red-500   dark:text-red-400/75")
    },
  },

  page: (...c: any[]) => cn(
    "p-8 flex flex-col gap-4 max-w-200 w-screen min-h-screen",
    cns.text.base(),
    c,
  ),
  pageTitle: cnr("text-xl tracking-tight font-semibold"),
  pageDescription: (...c: any[]) => cn(cns.text.muted("font-semibold"), c),

  // Common Components

  surface: cnr("p-4 rounded-xl! flex bg-slate-50/75 dark:bg-zinc-950/25"),

  cardBorder: cnr("border    border-slate-200 dark:border-zinc-800"),
  // cardShadow: cnr("shadow-sm shadow-slate-100 dark:shadow-zinc-950"),
  cardShadow: cnr(""),
  card: (...c: any[]) => cn(
    cns.cardBorder(),
    cns.cardShadow(),
    "bg-white dark:bg-transparent",
    "p-2 px-3",
    "rounded-md",
    c,
  ),
  errorCard: (...c: any[]) => cns.card(
    cns.error.border(),
    cns.error.bg(),
    cns.error.text.base(),
    cns.cardShadow(),
    c,
  ),
  linkCard: (...c: any[]) => cn(
    "dark:hover:bg-zinc-800/25 ",
    "transition-all duration-100",
    "hover:shadow-lg",
    "hover:shadow-slate-500/10 dark:hover:shadow-zinc-950/50",
    cns.card(),
    cns.clickableUI(),
    "bg-slate-50 hover:bg-slate-50/50",
    c,
  ),

  clickableUI: cnr(
    "select-none cursor-pointer"
  ),

  tab: {
    base: (...c: any[]) => cn(
      cns.tab.containerBg(),
      cns.tab.containerBorder(),
      "p-1 flex self-start gap-1 border rounded-xl",
      c
    ),
    containerBg: cnr("             bg-slate-100          dark:bg-zinc-950/50"),
    containerBorder: cnr("         border-slate-200/50   dark:border-zinc-800"),
    itemBase: (selected: boolean, ...c: any[]) => cn(
      "p-2 rounded-md px-3 w-40 border border-transparent",
      "flex items-center gap-2",
      "select-none cursor-pointer",
      selected ? [
        cns.tab.selectedBg(),
        cns.tab.selectedBorder(),
        cns.tab.selectedShadow(),
      ] : cns.tab.itemHoverBg(),
      c,
    ),
    selectedBg: cnr("              bg-white              dark:bg-zinc-800"),
    selectedBorder: cnr("border    border-slate-200      dark:border-zinc-700/50"),
    selectedShadow: cnr("shadow-sm shadow-slate-200      dark:shadow-zinc-950"),
    itemHoverBg: cnr("             hover:bg-slate-200/75 dark:hover:bg-zinc-800/50"),
  },

  button: {
    base: (...c: any) => cns.clickableUI(
      cn(
        "text-sm",
        "flex items-center justify-center rounded-md gap-2",
        "px-2.5 py-2",
        "focus:outline-none",
        "bg-slate-50            dark:bg-zinc-800/50",
        "hover:bg-slate-200/40  dark:hover:bg-zinc-700/50",
        "active:bg-slate-200/55 dark:active:bg-zinc-700/35",
        ...c
      ),
    ),
    ghost: (...c: any) => cns.button.base("bg-transparent dark:bg-transparent opacity-70 hover:opacity-100", c),
    subtle: (...c: any) => cns.button.base(
      "opacity-65 hover:opacity-100",
      "bg-slate-50 dark:bg-zinc-800",
      c
    ),
    presetGroup: (...c: any) => cns.button.subtle(
      "text-xs p-1 px-1.5 rounded-xs first:rounded-l-lg last:rounded-r-lg w-10 shrink-0",
      c
    ),
    iconGhost: (...c: any) => cns.button.ghost("p-1.5 size-7", c),
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
        c,
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
        "data-highlighted:bg-slate-100 dark:data-highlighted:bg-zinc-800",
        c,
      ),
    ),
    selectItemLayout: cnr(
      "grid grid-cols-[0.5rem_1fr]",
      "items-center gap-2",
    )
  },

  slider: {
    track: cnr("    bg-slate-200 dark:bg-zinc-800"),
    indicator: cnr(
      "bg-slate-400 dark:bg-zinc-400",
      "group-hover:bg-slate-300 group-hover:dark:bg-zinc-300"
    ),
    thumb: cnr(
      "bg-slate-400 dark:bg-zinc-400",
      "group-hover:bg-slate-300 group-hover:dark:bg-zinc-300"

    ),
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