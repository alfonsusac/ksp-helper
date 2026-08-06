import type { Package } from "./_types"

export const realSolarSystem: Package = {
  name: "Real Solar System",
  prefix: "rss",
  planets: {
    // TODO: add soi with planet radius
    "Sun": {
      radius: 696_342_000, atmHeight: 600_000, soiHeight: Number.POSITIVE_INFINITY, notLandable: true,
      image: "/rss/sun.png", imageScale: 1,
    },
    "Mercury": {
      radius: 2_440_000, atmHeight: 0, soiHeight: 112_409_000,
      image: "/rss/mercury.png", imageScale: 1,
    },
    "Venus": {
      radius: 6_049_000, atmHeight: 145_000, soiHeight: 616_281_000,
      image: "/rss/venus.png", imageScale: 1.02,
    },
    "Earth": {
      radius: 6_371_000, atmHeight: 140_000, soiHeight: 924_649_000,
      image: "/rss/earth.png", imageScale: 1.01,
    },
    "Moon": {
      radius: 1_737_000, atmHeight: 0, soiHeight: 924_649_000,
      image: "/rss/moon.png", imageScale: 1,
    },
    "Mars": {
      radius: 3_376_000, atmHeight: 125_000, soiHeight: 577_254_000,
      image: "/rss/mars.png", imageScale: 1.02,
    },
    "Phobos": {
      radius: 7_000, atmHeight: 0, soiHeight: 47_000,
      image: "/rss/phobos.png", imageScale: 1.07,
    },
    "Deimos": {
      radius: 5_000, atmHeight: 0, soiHeight: 45_000,
      image: "/rss/deimos.png", imageScale: 1.04,
    },
    "Vesta": {
      radius: 263_000, atmHeight: 0, soiHeight: 39_277_000,
      image: "/rss/vesta.png", imageScale: 1.02,
    },
    "Ceres": {
      radius: 473_000, atmHeight: 0, soiHeight: 76_963_000,
      image: "/rss/ceres.png", imageScale: 1.01,
    },
    // End of inner planets
    "Jupiter": {
      radius: 70_942_000, atmHeight: 1_550_000, soiHeight: 48_196_176_000, notLandable: true,
      image: "/rss/jupiter.png", imageScale: 1,
    },
    "Io": {
      radius: 1_811_000, atmHeight: 0, soiHeight: 7_840_000,
      image: "/rss/io.png", imageScale: 1,
    },
    "Europa": {
      radius: 1_551_000, atmHeight: 0, soiHeight: 9_728_000,
      image: "/rss/europa.png", imageScale: 1,
    },
    "Ganymede": {
      radius: 2_624_000, atmHeight: 0, soiHeight: 24_359_000,
      image: "/rss/ganymede.png", imageScale: 1.007,
    },
    "Callisto": {
      radius: 2_409_000, atmHeight: 0, soiHeight: 37_703_000,
      image: "/rss/callisto.png", imageScale: 1
    },
    // end of jupiter moon
    "Saturn": {
      radius: 59_216_000, atmHeight: 2_000_000, soiHeight: 54_475_313_000, notLandable: true,
      image: "/rss/saturn.png", imageScale: 2.5,
    },
    "Mimas": {
      radius: 198_000, atmHeight: 0, soiHeight: 396_000,
      image: "/rss/mimas.png", imageScale: 1.033,
    },
    "Enceladus": {
      radius: 252_000, atmHeight: 0, soiHeight: 489_000,
      image: '/rss/enceladus.png', imageScale: 1.03,
    },
    "Tethys": {
      radius: 531_000, atmHeight: 0, soiHeight: 1_214_000,
      image: "/rss/tethys.png", imageScale: 1.015,
    },
    "Dione": {
      radius: 561_000, atmHeight: 0, soiHeight: 1_955_000,
      image: "/rss/dione.png", imageScale: 1.01,
    },
    "Rhea": {
      radius: 764_000, atmHeight: 0, soiHeight: 3_676_000,
      image: "/rss/rhea.png", imageScale: 1.01
    },
    "Titan": {
      radius: 2_573_000, atmHeight: 600_000, soiHeight: 43_325_000,
      image: "/rss/titan.png", imageScale: 1.06
    },
    "Iapetus": {
      radius: 22_505_000, atmHeight: 0, soiHeight: 22_515_000,
      image: "/rss/iapetus.png", imageScale: 1.015
    },
    // end of saturn moon
    "Uranus": {
      radius: 24_894_000, atmHeight: 1_400_000, soiHeight: 51_692_514_000, notLandable: true,
      image: "/rss/uranus.png", imageScale: 1,
    },
    "Miranda": {
      radius: 236_000, atmHeight: 0, soiHeight: 460_000,
      image: "/rss/miranda.png", imageScale: 1.02,
    },
    "Ariel": {
      radius: 579_000, atmHeight: 0, soiHeight: 2_210_000,
      image: "/rss/ariel.png", imageScale: 1.01,
    },
    "Umbriel": {
      radius: 585_000, atmHeight: 0, soiHeight: 3_102_000,
      image: "/rss/umbriel.png", imageScale: 1.01,
    },
    "Titania": {
      radius: 789_000, atmHeight: 0, soiHeight: 7_533_000,
      image: "/rss/titania.png", imageScale: 1,
    },
    "Oberon": {
      radius: 761_000, atmHeight: 0, soiHeight: 9_678_000,
      image: '/rss/oberon.png', imageScale: 1,
    },
    // End of uranus moon
    "Neptune": {
      radius: 24_224_000, atmHeight: 1_250_000, soiHeight: 86_636_359_000, notLandable: true,
      image: '/rss/neptune.png', imageScale: 1.01,
    },
    "Triton": {
      radius: 1_353_000, atmHeight: 110_000, soiHeight: 11_964_000,
      image: '/rss/triton.png', imageScale: 1.09,
    },

    "Pluto": {
      radius: 1_187_000, atmHeight: 110_000, soiHeight: 3_114_586_000,
      image: "/rss/pluto.png", imageScale: 1.17,
    },
    "Charon": {
      radius: 604_000, atmHeight: 0, soiHeight: 8_440_000,
      image: '/rss/charon.png', imageScale: 1.01,
    }
  }
}
