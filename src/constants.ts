import type { BasePlanetDistanceMap } from "./packages/types"


// export const antennaTypes = [ 'c16', 'c16s', 'c88', 'cdtsm1', 'chg55', 'hg5', 'ra100', 'ra15', 'ra2' ] as const
// export type AntennaTypes = typeof antennaTypes[ number ]


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



// thanks poodmund
// source: https://docs.google.com/spreadsheets/d/1qIgFB8OXnlgpPCGsxv7JYUYQq5O671IcZXpumVaStek
// thanks chatgpt
// export const planetData: Record<string, BasePlanetDistanceMap> = {
//   Moho: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/3/31/TinyMoho.png/100px-TinyMoho.png",
//     to: {
//       Eve: { min: 3_546_908_249, max: 16_117_620_965 },
//       Kerbin: { min: 7_289_385_437, max: 19_913_538_689 },
//       Duna: { min: 14_641_065_166, max: 26_768_894_596 },
//       Dres: { min: 30_052_321_532, max: 51_629_701_751 },
//       Jool: { min: 60_949_012_447, max: 76_594_331_726 },
//       Eeloo: { min: 60_715_266_154, max: 119_514_349_491 },
//       Sarnus: { min: 113_689_187_603, max: 137_899_413_145 },
//       Urlum: { min: 238_529_725_833, max: 270_103_862_039 },
//       Neidon: { min: 397_824_635_111, max: 420_885_782_209 },
//       Plock: { min: 390_654_083_493, max: 681_013_388_049 },
//     },
//   },

//   Eve: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/0/03/TinyEve.png/100px-TinyEve.png",
//     to: {
//       Kerbin: { min: 3_668_828_971, max: 23_530_851_543 },
//       Duna: { min: 9_792_173_567, max: 31_665_478_335 },
//       Dres: { min: 25_237_843_444, max: 56_462_865_976 },
//       Jool: { min: 55_583_201_161, max: 81_964_575_968 },
//       Eeloo: { min: 56_926_652_048, max: 123_317_186_214 },
//       Sarnus: { min: 109_151_911_480, max: 142_445_164_161 },
//       Urlum: { min: 233_057_384_011, max: 275_576_890_709 },
//       Neidon: { min: 394_262_256_595, max: 424_448_344_065 },
//       Plock: { min: 386_792_768_271, max: 684_877_156_293 },
//     },
//   },

//   Kerbin: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/5/5d/TinyKerbin.png/100px-TinyKerbin.png",
//     to: {
//       Duna: { min: 6_069_283_350, max: 35_383_028_257 },
//       Dres: { min: 21_402_401_940, max: 60_320_789_167 },
//       Jool: { min: 51_735_042_066, max: 85_812_077_664 },
//       Eeloo: { min: 53_183_306_389, max: 127_081_753_657 },
//       Sarnus: { min: 105_481_041_293, max: 146_116_001_357 },
//       Urlum: { min: 229_218_312_140, max: 279_415_712_909 },
//       Neidon: { min: 390_533_330_076, max: 428_177_051_986 },
//       Plock: { min: 382_964_603_173, max: 688_705_350_475 },
//     },
//   },

//   Duna: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/1/17/TinyDuna.png/100px-TinyDuna.png",
//     to: {
//       Dres: { min: 13_732_281_489, max: 68_080_257_426 },
//       Jool: { min: 44_584_549_836, max: 92_947_048_984 },
//       Eeloo: { min: 45_090_423_762, max: 135_225_589_054 },
//       Sarnus: { min: 99_018_996_748, max: 152_572_434_486 },
//       Urlum: { min: 222_352_244_103, max: 286_277_600_809 },
//       Neidon: { min: 382_771_145_487, max: 435_937_664_943 },
//       Plock: { min: 374_816_798_977, max: 696_857_246_630 },
//     },
//   },

//   Dres: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/d/dd/TinyDres.png/100px-TinyDres.png",
//     to: {
//       Jool: { min: 24_526_513_238, max: 113_360_806_852 },
//       Eeloo: { min: 28_689_105_419, max: 151_339_309_036 },
//       Sarnus: { min: 72_640_228_569, max: 179_121_563_993 },
//       Urlum: { min: 204_800_505_952, max: 303_705_197_689 },
//       Neidon: { min: 359_526_182_111, max: 459_178_955_774 },
//       Plock: { min: 358_888_475_653, max: 712_736_293_268 },
//     },
//   },

//   Jool: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/3/35/TinyJool.png/100px-TinyJool.png",
//     to: {
//       Eeloo: { min: 11_420_136_316, max: 169_943_755_910 },
//       Sarnus: { min: 47_661_436_751, max: 203_907_220_758 },
//       Urlum: { min: 177_434_492_510, max: 331_199_563_248 },
//       Neidon: { min: 332_155_656_833, max: 486_552_250_295 },
//       Plock: { min: 327_504_530_186, max: 744_265_119_863 },
//     },
//   },

//   Eeloo: {
//     package: "stock",
//     image: "https://wiki.kerbalspaceprogram.com/images/thumb/e/e0/TinyEeloo.png/100px-TinyEeloo.png",
//     to: {
//       Sarnus: { min: 16_988_828_162, max: 243_123_109_571 },
//       Urlum: { min: 135_614_910_615, max: 373_212_339_800 },
//       Neidon: { min: 299_993_717_226, max: 519_198_233_466 },
//       Plock: { min: 331_236_639_445, max: 740_539_149_543 },
//     },
//   },

//   Sarnus: {
//     package: "outer planets mod",
//     to: {
//       Urlum: { min: 112_410_337_108, max: 396_177_918_875 },
//       Neidon: { min: 276_249_933_876, max: 542_407_146_909 },
//       Plock: { min: 267_100_127_733, max: 804_676_295_371 },
//     },
//   },

//   Urlum: {
//     package: "outer planets mod",
//     to: {
//       Neidon: { min: 138_500_522_528, max: 680_197_580_053 },
//       Plock: { min: 140_799_540_807, max: 932_918_586_457 },
//     },
//   },

//   Neidon: {
//     package: "outer planets mod",
//     to: {
//       Plock: { min: 227_326_990_695, max: 1_079_565_277_068 },
//     },
//   },

//   Plock: {
//     package: "outer planets mod",
//     to: {},
//   },
// }
