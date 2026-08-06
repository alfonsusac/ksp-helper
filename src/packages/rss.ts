import type { Package } from "./_types"

export const realSolarSystem: Package = {
  name: "Real Solar System",
  prefix: "rss",
  planets: {
    // TODO: add soi with planet radius
    "Sun": {
      radius: 696_342_000, atmHeight: 600_000, soiHeight: Number.POSITIVE_INFINITY, notLandable: true,
      planetGravitationalParameter: 1.3271244004193938e+20,
      image: "/rss/sun.png", imageScale: 1,
    },
    "Mercury": {
      radius: 2_439_700, atmHeight: 0, soiHeight: 112_409_000,
      planetGravitationalParameter: 2.2031780000000021e+13,
      image: "/rss/mercury.png", imageScale: 1,
    },
    "Venus": {
      radius: 6_049_000, atmHeight: 145_000, soiHeight: 616_281_000,
      planetGravitationalParameter: 3.2485859200000006e+14,
      image: "/rss/venus.png", imageScale: 1.02,
    },
    "Earth": {
      radius: 6_371_000, atmHeight: 140_000, soiHeight: 924_649_000,
      planetGravitationalParameter: 3.9860043543609598e+14,
      image: "/rss/earth.png", imageScale: 1.01,
    },
    "Moon": {
      radius: 1_737_100, atmHeight: 0, soiHeight: 924_649_000,
      planetGravitationalParameter: 4.9028000661637961e+12,
      image: "/rss/moon.png", imageScale: 1,
    },
    "Mars": {
      radius: 3_375_800, atmHeight: 125_000, soiHeight: 577_254_000,
      planetGravitationalParameter: 4.282837362069909E+13,
      image: "/rss/mars.png", imageScale: 1.02,
    },
    "Phobos": {
      radius: 7_250, atmHeight: 0, soiHeight: 47_000,
      planetGravitationalParameter: 7.087546066894452e+5,
      image: "/rss/phobos.png", imageScale: 1.07,
    },
    "Deimos": {
      radius: 5_456, atmHeight: 0, soiHeight: 45_000,
      planetGravitationalParameter: 9.615569648120313e+4,
      image: "/rss/deimos.png", imageScale: 1.04,
    },
    "Vesta": {
      radius: 262_700, atmHeight: 0, soiHeight: 39_277_000,
      planetGravitationalParameter: 0.1728824496930000e+11,
      image: "/rss/vesta.png", imageScale: 1.02,
    },
    "Ceres": {
      radius: 473_000, atmHeight: 0, soiHeight: 76_963_000,
      planetGravitationalParameter: 6.26325000000000e+10,
      image: "/rss/ceres.png", imageScale: 1.01,
    },
    // End of inner planets
    "Jupiter": {
      radius: 70_942_000, atmHeight: 1_550_000, soiHeight: 48_196_176_000, notLandable: true,
      planetGravitationalParameter: 1.266865349218008E+17,
      image: "/rss/jupiter.png", imageScale: 1,
    },
    "Io": {
      radius: 1_811_300, atmHeight: 0, soiHeight: 7_840_000,
      planetGravitationalParameter: 5.959916033410404e+12,
      image: "/rss/io.png", imageScale: 1,
    },
    "Europa": {
      radius: 1_550_800, atmHeight: 0, soiHeight: 9_728_000,
      planetGravitationalParameter: 3.202738774922892e+12,
      image: "/rss/europa.png", imageScale: 1,
    },
    "Ganymede": {
      radius: 2_624_100, atmHeight: 0, soiHeight: 24_359_000,
      planetGravitationalParameter: 9.887834453334144e+12,
      image: "/rss/ganymede.png", imageScale: 1.007,
    },
    "Callisto": {
      radius: 2_409_300, atmHeight: 0, soiHeight: 37_703_000,
      planetGravitationalParameter: 7.179289361397270e+12,
      image: "/rss/callisto.png", imageScale: 1
    },
    // end of jupiter moon
    "Saturn": {
      radius: 59_216_000, atmHeight: 2_000_000, soiHeight: 54_475_313_000, notLandable: true,
      planetGravitationalParameter: 3.793120749865224E+16,
      image: "/rss/saturn.png", imageScale: 2.5,
    },
    "Mimas": {
      radius: 198_200, atmHeight: 0, soiHeight: 396_000,
      planetGravitationalParameter: 2.503524000000e+9,
      image: "/rss/mimas.png", imageScale: 1.033,
    },
    "Enceladus": {
      radius: 252_100, atmHeight: 0, soiHeight: 489_000,
      planetGravitationalParameter: 7.211454165826e+9,
      image: '/rss/enceladus.png', imageScale: 1.03,
    },
    "Tethys": {
      radius: 531_100, atmHeight: 0, soiHeight: 1_214_000,
      planetGravitationalParameter: 4.121107782641e+10,
      image: "/rss/tethys.png", imageScale: 1.015,
    },
    "Dione": {
      radius: 561_400, atmHeight: 0, soiHeight: 1_955_000,
      planetGravitationalParameter: 7.311636648732e+10,
      image: "/rss/dione.png", imageScale: 1.01,
    },
    "Rhea": {
      radius: 763_800, atmHeight: 0, soiHeight: 3_676_000,
      planetGravitationalParameter: 1.539424643535e+11,
      image: "/rss/rhea.png", imageScale: 1.01
    },
    "Titan": {
      radius: 2_573_300, atmHeight: 600_000, soiHeight: 43_325_000,
      planetGravitationalParameter: 8.978138376543E+12,
      image: "/rss/titan.png", imageScale: 1.06
    },
    "Iapetus": {
      radius: 734_500, atmHeight: 0, soiHeight: 22_505_000,
      planetGravitationalParameter: 1.205120887033e+11,
      image: "/rss/iapetus.png", imageScale: 1.015
    },
    // end of saturn moon
    "Uranus": {
      radius: 24_894_000, atmHeight: 1_400_000, soiHeight: 51_692_514_000, notLandable: true,
      planetGravitationalParameter: 5.793951322279009E+15,  
      image: "/rss/uranus.png", imageScale: 1,
    },
    "Miranda": {
      radius: 235_700, atmHeight: 0, soiHeight: 460_000,
      planetGravitationalParameter: 4.319516899232100e+9,
      image: "/rss/miranda.png", imageScale: 1.02,
    },
    "Ariel": {
      radius: 578_900, atmHeight: 0, soiHeight: 2_210_000,
      planetGravitationalParameter: 8.346344431770477e+10,
      image: "/rss/ariel.png", imageScale: 1.01,
    },
    "Umbriel": {
      radius: 584_700, atmHeight: 0, soiHeight: 3_102_000,
      planetGravitationalParameter: 8.509338094489388e+10,
      image: "/rss/umbriel.png", imageScale: 1.01,
    },
    "Titania": {
      radius: 788_900, atmHeight: 0, soiHeight: 7_533_000,
      planetGravitationalParameter: 2.269437003741248e+11,
      image: "/rss/titania.png", imageScale: 1,
    },
    "Oberon": {
      radius: 761_400, atmHeight: 0, soiHeight: 9_678_000,
      planetGravitationalParameter: 2.053234302535623e+11,
      image: '/rss/oberon.png', imageScale: 1,
    },
    // End of uranus moon
    "Neptune": {
      radius: 24_224_000, atmHeight: 1_250_000, soiHeight: 86_636_359_000, notLandable: true,
      planetGravitationalParameter: 6.835099502439672E+15,
      image: '/rss/neptune.png', imageScale: 1.01,
    },
    "Triton": {
      radius: 1_353_400, atmHeight: 110_000, soiHeight: 11_964_000,
      planetGravitationalParameter: 1.427598140725034E+12,
      image: '/rss/triton.png', imageScale: 1.09,
    },

    "Pluto": {
      radius: 1_187_000, atmHeight: 110_000, soiHeight: 3_114_586_000,
      planetGravitationalParameter: 8.696138177608748e+11,
      image: "/rss/pluto.png", imageScale: 1.17,
    },
    "Charon": {
      radius: 603500, atmHeight: 0, soiHeight: 8_440_000,
      planetGravitationalParameter: 1.058799888601881e+11,
      image: '/rss/charon.png', imageScale: 1.01,
    }
  }
}
