import { cn } from "./ui/cn"

export const cnr = (...a: any[]) => (...b: any[]) => cn(...a, ...b)

// Components
export const cns = ({
  // Primitives
  base: cnr('base'),
  textMuted: cnr('text-muted'),
  textFaint: cnr('text-faint'),
  textGreen: cnr("text-green"),
  divider: cnr('divider'),
  dividerStrong: cnr('divider-strong'),
  dividerMid: cnr("divider-mid"),

  articleLink: cnr('link-article'),
  navigationLink: cnr('link-navigation',),

  inputLabel: cnr('input-label'),
  inputReset: cnr("input-reset"),
  inputBox: cnr("input-box"),
  inputBoxWithError: (error: any) => cnr("input-box", error ? "input-box-error" : ""),
  inputInner: cnr("input-reset input-box-inner"),
  inputAdornment: cnr("input-box-inner-adornment min-w-6 min-h-6 "),
  inputBoxError: cnr("input-box-error"),

  errorBorder: cnr("error-border"),
  errorBg: cnr("error-bg"),
  errorTextBase: cnr("error-text"),
  errorTextMuted: cnr("error-text-muted"),

  page: cnr("page"),
  pageTitle: cnr("page-title"),
  pageDescription: cnr("page-description"),

  // Common Components
  surface: cnr("my-0 first:pt-0"),
  listBullet: cnr(" bg-slate-700    dark:bg-zinc-300"),
  placeholder: cnr("bg-slate-100/60 dark:bg-zinc-800/20"),
  bgMuted: cnr("    bg-slate-200    dark:bg-zinc-700"),

  badge: cnr("info-card text-xs p-1 px-2 inline-block text-fg2 bg-contrast/10"),


  tabBase: cnr("tab-container"),
  tabItem: (sel: boolean) => cnr("tab-item", sel ? "tab-item-selected" : "tab-item-not-selected"),

  buttonBase: cnr("button-base"),
  buttonSubtle: cnr("button-subtle"),
  buttonGhost: cnr("button-ghost"),
  buttonFaint: cnr("button-faint"),
  buttonIcon: cnr("button-icon"),
  buttonIconSm: cnr("button-icon-sm"),
  buttonIconLg: cnr("button-icon-lg"),
  buttonPresetGroup: cnr("button-subtle", "text-xs p-1 px-1.5 rounded-xs first:rounded-l-lg last:rounded-r-lg w-10 shrink-0"),

  popoverBackdrop: cnr("popover-backdrop"),
  popoverSurface: cnr("popover-surface",),
  popoverSurfaceLargeBorder: cnr("popover-surface-large-border"),
  popoverSurfaceLargeShadow: cnr("popover-surface-large-shadow"),
  popoverItem: cnr("popover-menu-item"),
  popoverSelectItemLayout: cnr(
    "grid grid-cols-[0.5rem_1fr]",
    "items-center gap-2",
  ),

  sliderTrack: cnr("bg-contrast/10"),
  sliderIndicator: cnr("bg-fg3 group-hover:bg-fg2"),
  sliderThumb: cnr("bg-fg3 group-hover:bg-fg2"),

  card: cnr("card"),
  cardHeader: cnr("card-header"),
  cardHeaderIcon: cnr("card-header-icon"),
  cardDescription: cnr("text-xs"),
  cardOpenTransition: (open: boolean) => cn(
    "transition-all duration-300 opacity-0 blur-sm -translate-y-1/2",
    open && "opacity-100 blur-none translate-y-0"
  ),
  cardButton: cnr("card-button"),
  cardButtonIcon: cnr("card-button-icon"),
  errorCard: cnr("error-card"),
  linkCard: cnr("link-card"),
  infoCard: cnr("info-card"),

  menuTrigger: cnr("menu-trigger"),


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
  graphBarScience2: cnr("bg-blue-500/20      dark:bg-blue-400/50"),

  cellNoData: cnr("      bg-slate-100        dark:bg-zinc-900"),
  cellGradient1: "oklch(70.4% 0.191 22.216)", // red-400
  cellGradient2: "oklch(75% 0.183 55.934)", // orange-400
  cellGradient3: "oklch(85.2% 0.199 91.936)", // yellow-400
  cellGradient4: "oklch(76.5% 0.177 163.223)", // emerald-400

  planet: cnr("bg-slate-300 size-full rounded-full shadow-[inset_0.25rem_0_10px_#0045]"),

  // Prose/Documents
  docunment: cnr(
    // "tracking-[-0.015rem]",
    "font-normal",
    "leading-[1.65]",
    "text-fg",
    // "subpixel-antialiased",

    "[&_h1]:mt-12",
    "[&_h1]:my-4",
    "[&_h1]:text-2xl",
    "[&_h1]:font-[600]",
    "[&_h1]:tracking-[-0.035rem]",
    // "[&_h1]:font-bold",
    // "[&_h1]:tracking-[-0.035rem]",
    
    
    "[&_h2]:mt-8",
    "[&_h2]:text-[1.15rem]",
    "[&_h2]:text-fg",
    "[&_h2]:font-[550]",
    "[&_h2]:tracking-[-0.025rem]",
    // "[&_h2]:font-bold",
    // "[&_h2]:tracking-[-0.025rem]",
    "[&_h1+h2]:mt-6",
    
    "[&_h3]:mt-4",
    "[&_h3]:text-[0.95rem]",
    // "[&_h3]:text-fg2",
    "[&_h3]:font-[600]",
    "[&_h1+h3]:mt-4",
    
    "[&_strong]:font-[600]!",
    "[&_strong]:text-fg",


    // "[&>p]:text-current/90",
    // "[&>p]:text-fg",
    // "[&>p]:dark:text-current/80",
    "[&>p]:my-[0.65lh]",
    "[&_img]:my-[1lh]",
    "[&_table]:my-[1lh]",
    "[&_hr]:my-[1lh]",

    "[&_ul]:my-[0.25lh]",
    "[&_ul_p+ul]:mt-1.5",
    "[&_ul_p+ul]:mb-4",
    // "[&_ul>li]:before:content-['']",
    // "[&_ul>li]:before:inline-block",
    // "[&_ul>li]:before:size-1.5!",
    // "[&_ul>li]:before:rounded-lg",
    // "[&_ul>li]:before:bg-current",
    // "[&_ul>li]:before:opacity-25",
    // "[&_ul>li]:before:-ml-4.5",
    // "[&_ul>li]:before:mr-3",
    // "[&_ul>li]:before:mb-[0.1rem]",

    "[&_ul]:marker:text-fg3",
    "[&_ul]:list-disc",
    "[&_ul]:ml-4",


    "[&_ul]:pl-5",
    "[&_ul]:ml-1",

    "[&_ol]:my-[0.25lh]",
    "[&_ol]:list-decimal",
    "[&_ol]:pl-7",
    "[&_ol]:ml-1",
    "[&_ol>li]:marker:text-fg3",
    "[&_ol>li]:marker:font-medium",

    "[&_li]:my-1.5",
    "[&_li>p]:inline",

    "[&_img]:rounded-md",


    "[&_hr]:border-border2",

    "[&_code]:px-1",
    "[&_code]:bg-contrast/7",
    "[&_code]:border",
    "[&_code]:border-current/10",
    "[&_code]:rounded-sm",
    "[&_code]:text-fg",

    "[&_th]:border",
    "[&_td]:border",

    "[&_th]:border-border",
    "[&_td]:border-border",

    "[&_th]:p-2",
    "[&_td]:p-2",

    "[&_strong]:font-extrabold",

    "[&_a]:link-underline",
    "[&_a]:link-text-blue",

    "[&_pre]:overflow-auto",
    "[&_pre]:w-full",
    "[&_pre]:p-3.5",
    "[&_pre]:bg-surface",
    "[&_pre]:border",
    "[&_pre]:border-border2",
    "[&_pre]:rounded-lg",
    "[&_pre_code]:bg-transparent",
    "[&_pre_code]:border-transparent",
    "[&_pre_code]:p-0",
    "w-full",
  )

})


// export const menuTrigger = cnr(
//   cns.inputBox(
//     "clickableUI",
//     "button-common",
//     // cns.buttonBase(),
//     "w-32",
//   )
// )