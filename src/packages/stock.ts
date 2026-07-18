import type { Package } from "./types"

export const stock: Package = {
  name: "Stock KSP",
  dsnLevels: {},
  antennas: {
    "c16": {
      label: "Communotron 16",
      rating: 500_000, // 500k
      type: "direct",
      combinabilityExponent: 1,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 3.3333,
      image: "https://wiki.kerbalspaceprogram.com/images/4/49/Communotron_16.png",
    },
    'c16s': {
      label: "Communotron 16-S",
      rating: 500_000, // 500k
      type: "direct",
      combinabilityExponent: 0,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 3.3333,
      image: "https://wiki.kerbalspaceprogram.com/images/d/da/Communotron_16-S.png",
    },
    'cdtsm1': {
      label: "Communotron DTS-M1",
      rating: 2_000_000_000, // 2G
      type: "direct",
      combinabilityExponent: 0.75,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 5.7143,
      image: "https://wiki.kerbalspaceprogram.com/images/a/aa/Comms_DTS-M1_02.png",
    },
    'chg55': {
      label: "Communotron HG-55",
      rating: 15_000_000_000, // 15G
      type: "direct",
      combinabilityExponent: 0.75,
      packetSizeInMits: 3,
      bandwidthInMitsPerSec: 20,
      image: "https://wiki.kerbalspaceprogram.com/images/3/30/Commutron_HG-55.png",
    },
    'c88': {
      label: "Communotron 88-88",
      rating: 100_000_000_000, // 100G
      type: "direct",
      combinabilityExponent: 0.75,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 20,
      image: "https://wiki.kerbalspaceprogram.com/images/c/cd/Communotron_88-88.png",
    },
    'hg5': {
      label: "HG-5 High Gain Antenna",
      rating: 5_000_000, // 5M
      type: "relay",
      combinabilityExponent: 0.75,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 5.713,
      image: "https://wiki.kerbalspaceprogram.com/images/7/75/HG-5_High_Gain_Antenna_%28%2Bopen%29.png",
    },
    'ra2': {
      label: "RA-2 Relay Antenna",
      rating: 2_000_000_000, // 2G
      type: "relay",
      combinabilityExponent: 0.75,
      packetSizeInMits: 1,
      bandwidthInMitsPerSec: 2.8571,
      image: "https://wiki.kerbalspaceprogram.com/images/e/e6/RA-2_Relay_Antenna.png"
    },
    'ra15': {
      label: "RA-15 Relay Antenna",
      rating: 15_000_000_000, // 15G
      type: "relay",
      combinabilityExponent: 0.75,
      packetSizeInMits: 2,
      bandwidthInMitsPerSec: 5.7143,
      image: "https://wiki.kerbalspaceprogram.com/images/7/7b/RA-15_Relay_Antenna.png",
    },
    'ra100': {
      label: "RA-100 Relay Antenna",
      rating: 100_000_000_000, // 100G
      type: "relay",
      combinabilityExponent: 0.75,
      packetSizeInMits: 4,
      bandwidthInMitsPerSec: 11.4286,
      image: "https://wiki.kerbalspaceprogram.com/images/2/28/RA-100_Relay_Antenna.png",
    },
  },
  planets: {
    Moho: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/3/31/TinyMoho.png/100px-TinyMoho.png",
      distanceToPlanets: {
        Eve: { min: 3_546_908_249, max: 16_117_620_965 },
        Kerbin: { min: 7_289_385_437, max: 19_913_538_689 },
        Duna: { min: 14_641_065_166, max: 26_768_894_596 },
        Dres: { min: 30_052_321_532, max: 51_629_701_751 },
        Jool: { min: 60_949_012_447, max: 76_594_331_726 },
        Eeloo: { min: 60_715_266_154, max: 119_514_349_491 },
        Sarnus: { min: 113_689_187_603, max: 137_899_413_145 },
        Urlum: { min: 238_529_725_833, max: 270_103_862_039 },
        Neidon: { min: 397_824_635_111, max: 420_885_782_209 },
        Plock: { min: 390_654_083_493, max: 681_013_388_049 },
      },
    },

    Eve: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/0/03/TinyEve.png/100px-TinyEve.png",
      distanceToPlanets: {
        Kerbin: { min: 3_668_828_971, max: 23_530_851_543 },
        Duna: { min: 9_792_173_567, max: 31_665_478_335 },
        Dres: { min: 25_237_843_444, max: 56_462_865_976 },
        Jool: { min: 55_583_201_161, max: 81_964_575_968 },
        Eeloo: { min: 56_926_652_048, max: 123_317_186_214 },
        Sarnus: { min: 109_151_911_480, max: 142_445_164_161 },
        Urlum: { min: 233_057_384_011, max: 275_576_890_709 },
        Neidon: { min: 394_262_256_595, max: 424_448_344_065 },
        Plock: { min: 386_792_768_271, max: 684_877_156_293 },
      },
    },

    Kerbin: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/5/5d/TinyKerbin.png/100px-TinyKerbin.png",
      distanceToPlanets: {
        Duna: { min: 6_069_283_350, max: 35_383_028_257 },
        Dres: { min: 21_402_401_940, max: 60_320_789_167 },
        Jool: { min: 51_735_042_066, max: 85_812_077_664 },
        Eeloo: { min: 53_183_306_389, max: 127_081_753_657 },
        Sarnus: { min: 105_481_041_293, max: 146_116_001_357 },
        Urlum: { min: 229_218_312_140, max: 279_415_712_909 },
        Neidon: { min: 390_533_330_076, max: 428_177_051_986 },
        Plock: { min: 382_964_603_173, max: 688_705_350_475 },
      },
    },

    Duna: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/1/17/TinyDuna.png/100px-TinyDuna.png",
      distanceToPlanets: {
        Dres: { min: 13_732_281_489, max: 68_080_257_426 },
        Jool: { min: 44_584_549_836, max: 92_947_048_984 },
        Eeloo: { min: 45_090_423_762, max: 135_225_589_054 },
        Sarnus: { min: 99_018_996_748, max: 152_572_434_486 },
        Urlum: { min: 222_352_244_103, max: 286_277_600_809 },
        Neidon: { min: 382_771_145_487, max: 435_937_664_943 },
        Plock: { min: 374_816_798_977, max: 696_857_246_630 },
      },
    },

    Dres: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/d/dd/TinyDres.png/100px-TinyDres.png",
      distanceToPlanets: {
        Jool: { min: 24_526_513_238, max: 113_360_806_852 },
        Eeloo: { min: 28_689_105_419, max: 151_339_309_036 },
        Sarnus: { min: 72_640_228_569, max: 179_121_563_993 },
        Urlum: { min: 204_800_505_952, max: 303_705_197_689 },
        Neidon: { min: 359_526_182_111, max: 459_178_955_774 },
        Plock: { min: 358_888_475_653, max: 712_736_293_268 },
      },
    },

    Jool: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/3/35/TinyJool.png/100px-TinyJool.png",
      distanceToPlanets: {
        Eeloo: { min: 11_420_136_316, max: 169_943_755_910 },
        Sarnus: { min: 47_661_436_751, max: 203_907_220_758 },
        Urlum: { min: 177_434_492_510, max: 331_199_563_248 },
        Neidon: { min: 332_155_656_833, max: 486_552_250_295 },
        Plock: { min: 327_504_530_186, max: 744_265_119_863 },
      },
    },

    Eeloo: {
      image: "https://wiki.kerbalspaceprogram.com/images/thumb/e/e0/TinyEeloo.png/100px-TinyEeloo.png",
      distanceToPlanets: {
        Sarnus: { min: 16_988_828_162, max: 243_123_109_571 },
        Urlum: { min: 135_614_910_615, max: 373_212_339_800 },
        Neidon: { min: 299_993_717_226, max: 519_198_233_466 },
        Plock: { min: 331_236_639_445, max: 740_539_149_543 },
      },
    },
  }
}