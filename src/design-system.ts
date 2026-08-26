import { cn } from "./ui/cn"

export const cnr = (...a: any[]) => (...b: any[]) => cn(...a, ...b)

// Components
export const cns = ({
  // Primitives
  base: cnr('base'),
  dividerStrong: cnr('border-strong'),
  textLabel: cnr('typo-label'),
  textMuted: cnr('typo-muted'),
  textFaint: cnr('typo-faint'),
  textGreen: cnr("typo-green"),

  articleLink: cnr('link-article'),
  navigationLink: cnr('link-navigation',),
  textLinkA: cnr("[&_a]:link-article"),

  inputReset: cnr("input-reset"),
  inputBox: cnr("input-box"),
  inputBoxError: cnr("input-border-error"),

  errorBorder: cnr("error-border"),
  errorBg: cnr("error-bg"),
  errorTextBase: cnr("error-text"),
  errorTextMuted: cnr("error-text-muted"),

  page: cnr("page"),
  pageTitle: cnr("page-title"),
  pageDescription: cnr("page-description"),

  // Common Components
  surface: cnr("my-0 first:pt-0"),
  surface2: cnr("   bg-slate-50   dark:bg-zinc-800/50"),
  bgPrimary: cnr("  bg-slate-700  dark:bg-zinc-300"),
  listBullet: cnr(" bg-slate-700  dark:bg-zinc-300"),
  placeholder: cnr("bg-slate-50   dark:bg-zinc-800/10"),
  bgMuted: cnr("    bg-slate-200  dark:bg-zinc-700"),

  surface2card: (...c: any) => cns.surface2("p-5 rounded-xl", "card-border", c),

  card: cnr("card"),
  errorCard: cnr("error-card"),
  linkCard: cnr("link-card"),

  clickableUI: cnr("select-none cursor-pointer"),

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

  buttonBase: cnr("button-base"),
  buttonSubtle: cnr("button-subtle"),
  buttonGhost: cnr("button-ghost"),
  buttonIcon: cnr("button-icon"),
  buttonIconSm: cnr("button-icon-sm"),
  buttonIconLg: cnr("button-icon-lg"),
  buttonPresetGroup: cnr("button-subtle", "text-xs p-1 px-1.5 rounded-xs first:rounded-l-lg last:rounded-r-lg w-10 shrink-0"),

  popover: {
    backdrop: cnr("popover-backdrop"),
    base: cnr(
      "popover-base",
      "popover-rounded",
      "popover-bg",
      "popover-border",
      "popover-transition",
      "popover-shadow",
    ),
    item: (...c: any) => cns.base(
      cns.clickableUI(),
      cn(
        "rounded-md outline-hidden",
        "data-highlighted:bg-slate-100 dark:data-highlighted:bg-zinc-800",
        "p-1",
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

  // Prose/Documents
  docunment: cnr(
    "[&_h1]:my-4",
    "[&_h1]:text-2xl",

    "[&_h2]:mt-8",
    "[&_h2]:text-xl",
    "dark:[&_h2]:opacity-50",
    "[&_h1+h2]:mt-6",

    "[&_h3]:mt-6",
    "[&_h3]:text-lg",
    "dark:[&_h3]:opacity-80",
    "[&_h1+h3]:mt-4",



    "[&>p]:my-4",

    "[&_ul]:my-4",
    "[&_ul>li]:before:content-['']",
    "[&_ul>li]:before:inline-block",
    "[&_ul>li]:before:size-1.5!",
    "[&_ul>li]:before:rounded-lg",
    "[&_ul>li]:before:bg-current",
    "[&_ul>li]:before:opacity-25",
    "[&_ul>li]:before:-ml-6",
    "[&_ul>li]:before:mr-4",
    "[&_ul]:pl-7",
    "[&_ul]:ml-1",

    "[&_ol]:my-4",
    "[&_ol]:list-decimal",
    "[&_ol]:list-decimal",
    "[&_ol]:pl-7",
    "[&_ol]:ml-1",
    "[&_ol>li]:marker:text-current/50",

    "[&_li]:my-1.5",
    "[&_li>p]:inline",

    "[&_img]:rounded-md",

    "[&_hr]:border-current/25",

    "[&_code]:px-1",
    "[&_code]:bg-current/7",
    "[&_code]:border",
    "[&_code]:border-current/10",
    "[&_code]:rounded-sm",
    "[&_code]:text-current/75",

    "[&_th]:border",
    "[&_td]:border",

    "[&_th]:border-current/15",
    "[&_td]:border-current/15",

    "[&_th]:p-2",
    "[&_td]:p-2",

    "[&_strong]:font-extrabold",

    "[&_a]:text-slate-500/75             [&_a]:dark:text-zinc-500",
    "[&_a]:decoration-slate-300          [&_a]:dark:decoration-zinc-700",
    "[&_a]:hover:text-slate-500          [&_a]:dark:hover:text-zinc-400",
    "[&_a]:hover:decoration-slate-500/50 [&_a]:dark:hover:decoration-zinc-600",
    "[&_a]:underline underline-offset-3 ",

    "[&_pre]:overflow-auto",
    "[&_pre]:w-full",
    "[&_pre]:p-3.5",
    "[&_pre]:bg-current/5",
    "[&_pre]:border",
    "[&_pre]:border-current/7",
    "[&_pre]:rounded-lg",
    "[&_pre_code]:bg-transparent",
    "[&_pre_code]:border-transparent",
    "[&_pre_code]:p-0",
    "w-full",
  )

})


export const menuTrigger = cnr(
  cns.inputBox(
    cns.buttonBase(),
    "w-32",
  )
)