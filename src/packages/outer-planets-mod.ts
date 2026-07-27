import type { Package } from "./types"

// https://forum.kerbalspaceprogram.com/topic/173446-lowest-highest-points-of-celestial-bodies/

export const outerplanets: Package = {
  name: "Outer Planet Mod",
  prefix: "opm",
  dsnLevels: {},
  planets: {
    "Sarnus": {
      radius: 5_300_000, soi: 2_740_127_000, atmHeight: 580_000, image: "/opm/planets/sarnus-hd.png", imageScale: 1,
      distanceToPlanets: {
        Urlum: { min: 112_410_337_108, max: 396_177_918_875 },
        Neidon: { min: 276_249_933_876, max: 542_407_146_909 },
        Plock: { min: 267_100_127_733, max: 804_676_295_371 },
        Moho: { min: 113_689_187_603, max: 137_899_413_145 },
        Eve: { min: 109_151_911_480, max: 142_445_164_161 },
        Kerbin: { min: 105_481_041_293, max: 146_116_001_357 },
        Duna: { min: 99_018_996_748, max: 152_572_434_486 },
        Dres: { min: 72_640_228_569, max: 179_121_563_993 },
        Jool: { min: 47_661_436_751, max: 203_907_220_758 },
        Eeloo: { min: 16_988_828_162, max: 243_123_109_571 },
      },
    },

    // TODO: add soi with radius below this point.

    // Sarnus Moons
    "Hale": { radius: 6_000, soi: 41_000 + 6_000, highestPoint: 5_918, image: "/opm/planets/hale-hd.png", imageScale: 1.85, },
    "Ovok": { radius: 26_000, soi: 94_000 + 26_000, highestPoint: 14_000, image: "/opm/planets/ovok-hd.png", imageScale: 1, },
    "Eeloo OPM": { radius: 210_000, soi: 1_159_000, highestPoint: 3_797, image: "/opm/planets/eeloo-opm-hd.png", imageScale: 1, },
    "Slate": { radius: 540_000, soi: 9_598_000 + 540_000, highestPoint: 16_559, image: "/opm/planets/slate-hd.png", imageScale: 1.003, },
    "Tekto": { radius: 280_000, soi: 8_637_000 + 280_000, atmHeight: 95_000, image: "/opm/planets/tekto-hd.png", imageScale: 1, },



    Urlum: {
      radius: 2_177_000, soi: 2_562_261 + 2_177_000, atmHeight: 325_000, image: "/opm/planets/urlum-hd.png", imageScale: 1,
      distanceToPlanets: {
        Neidon: { min: 138_500_522_528, max: 680_197_580_053 },
        Plock: { min: 140_799_540_807, max: 932_918_586_457 },

        Moho: { min: 238_529_725_833, max: 270_103_862_039 },
        Eve: { min: 233_057_384_011, max: 275_576_890_709 },
        Kerbin: { min: 229_218_312_140, max: 279_415_712_909 },
        Duna: { min: 222_352_244_103, max: 286_277_600_809 },
        Dres: { min: 204_800_505_952, max: 303_705_197_689 },
        Jool: { min: 177_434_492_510, max: 331_199_563_248 },
        Eeloo: { min: 135_614_910_615, max: 373_212_339_800 },
      },
    },

    // Urlum Moons
    Polta: { radius: 220_000, soi: 1_661_000 + 220_000, highestPoint: 8_835, image: "/opm/planets/polta-hd.png", imageScale: 1.029, },
    Priax: { radius: 74_000, soi: 447_000 + 74_000, highestPoint: 30_485, image: "/opm/planets/priax-hd.png", imageScale: 1.38, },
    Wal: { radius: 370_000, soi: 18_934_000 + 370_000, highestPoint: 20_650, image: "/opm/planets/wal-hd.png", imageScale: 1.045, },
    Tal: { radius: 22_000, soi: 140_000 + 22_000, highestPoint: 11_904, image: "/opm/planets/tal-hd.png", imageScale: 1.45, },

    Neidon: {
      radius: 2_145_000, soi: 4_415_724_000 + 2_145_000, atmHeight: 260_000, image: "/opm/planets/neidon-hd.png", imageScale: 1,
      distanceToPlanets: {
        Plock: { min: 227_326_990_695, max: 1_079_565_277_068 },

        Moho: { min: 397_824_635_111, max: 420_885_782_209 },
        Eve: { min: 394_262_256_595, max: 424_448_344_065 },
        Kerbin: { min: 390_533_330_076, max: 428_177_051_986 },
        Duna: { min: 382_771_145_487, max: 435_937_664_943 },
        Dres: { min: 359_526_182_111, max: 459_178_955_774 },
        Jool: { min: 332_155_656_833, max: 486_552_250_295 },
        Eeloo: { min: 299_993_717_226, max: 519_198_233_466 },
      },
    },
    // Meidon Moons
    Thatmo: { radius: 286_000, soi: 5_709_000 + 286_000, atmHeight: 35_000, highestPoint: 4_981, image: "/opm/planets/thatmo-hd.png", imageScale: 1, },
    Nissee: { radius: 30_000, soi: 7_366 + 30_000, highestPoint: 9_113, image: "/opm/planets/nissee-hd.png", imageScale: 1.26, },

    Plock: {
      radius: 189_000,
      soi: 612_762_000 + 189_000,
      highestPoint: 3_383,
      image: "/opm/planets/plock-hd.png",
      imageScale: 1.005,
      distanceToPlanets: {
        Moho: { min: 390_654_083_493, max: 681_013_388_049 },
        Eve: { min: 386_792_768_271, max: 684_877_156_293 },
        Kerbin: { min: 382_964_603_173, max: 688_705_350_475 },
        Duna: { min: 374_816_798_977, max: 696_857_246_630 },
        Dres: { min: 358_888_475_653, max: 712_736_293_268 },
        Jool: { min: 327_504_530_186, max: 744_265_119_863 },
        Eeloo: { min: 331_236_639_445, max: 740_539_149_543 },
      },
    },
    // Plock Moon
    Karen: { radius: 85_000, soi: 939_000 + 85_000, highestPoint: 4_655, image: "/opm/planets/karen-hd.png", imageScale: 1.038, }
  },
  antennas: {}
}