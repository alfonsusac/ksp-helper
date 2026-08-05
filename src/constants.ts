export const kscLevels = [ '1', '2', '3' ] as const
export type KSCLevels = typeof kscLevels[ number ]

export const kscDSNdata = {
  1: {
    rating: 2_000_000_000 // 2G
  },
  2: {
    rating: 50_000_000_000 // 50G
  },
  3: {
    rating: 250_000_000_000 // 250G
  }
} satisfies Record<KSCLevels, {
  rating: number
}>


// thanks chatgpt
// source: https://docs.google.com/spreadsheets/d/1Wr7to96dpo56xZZxFquQo3WHYJjuv0ZZ9Vpc3BViSh8/edit?gid=0#gid=0
export const signalStrengthToScienceBonusLookupMap = [
  // 0.00 - 0.09
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

  // 0.10 - 0.19
  0, 0, 0, 0, 0, 0, 0, 1, 1, 1,

  // 0.20 - 0.29
  1, 1, 1, 1, 1, 2, 2, 2, 2, 2,

  // 0.30 - 0.39
  2, 3, 3, 3, 3, 4, 4, 5, 5, 6,

  // 0.40 - 0.49
  6, 6, 7, 7, 8, 8, 9, 9, 10, 10,

  // 0.50 - 0.59
  10, 12, 12, 13, 14, 14, 15, 15, 16, 16,

  // 0.60 - 0.69
  18, 18, 18, 20, 20, 22, 23, 24, 24, 25,

  // 0.70 - 0.79
  25, 26, 27, 27, 29, 29, 31, 32, 32, 33,

  // 0.80 - 0.89
  34, 35, 36, 36, 37, 37, 37, 38, 38, 39,

  // 0.90 - 1.00
  39, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40,
]



