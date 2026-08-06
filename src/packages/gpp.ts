import type { Package } from "./_types"

export const gpp: Package = {
  name: "Galileo's Planet Pack",
  prefix: "gpp",
  planets: {
    "ciro": {
      image: "/gpp/ciro.png", imageScale: 36, imageX: 0, imageY: 0,
      radius: 70_980_000, atmHeight: 600_000, soiHeight: Number.POSITIVE_INFINITY, notLandable: true, highestPoint: 2381388020 
    },
    "icarus": {
      image: "/gpp/icarus.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 160_000, atmHeight: 0, soiHeight: 3_491_000
    },
    "thalia": {
      image: "/gpp/thalia.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 270_000, atmHeight: 0, soiHeight: 13_646_000
    },
    "eta": { // moon of thalia
      image: "/gpp/eta.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 60_000, atmHeight: 0, soiHeight: 1_657_000
    },
    "niven": {
      image: "/gpp/niven.png", imageScale: 1.01, imageX: 0, imageY: 0,
      radius: 400_000, atmHeight: 75_000, soiHeight: 34_386_000,
    },
    "gael": {
      image: "/gpp/gael.png", imageScale: 1.04, imageX: 0, imageY: 0,
      radius: 600_000, atmHeight: 70_000, soiHeight: 83_668_000,
    },
    "iota": { // moon of gael
      image: "/gpp/iota.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 100_000, atmHeight: 0, soiHeight: 2_491_000,
    },
    "ceti": { // moon of gael
      image: "/gpp/ceti.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 150_000, atmHeight: 0, soiHeight: 8_144_000,
    },
    "tellumo": { 
      image: "/gpp/tellumo.png", imageScale: 1.75, imageX: 0, imageY: 0.7,
      radius: 1_000_000, atmHeight: 50_000, soiHeight: 260_440_000,
    },
    "lili": {  // moon of tellumo
      image: "/gpp/lili.png", imageScale: 1.2, imageX: 0, imageY: 0,
      radius: 7_000, atmHeight: 0, soiHeight: 40_000,
    },
    "gratian": { 
      image: "/gpp/gratian.png", imageScale: 1.025, imageX: 0, imageY: 0,
      radius: 550_000, atmHeight: 55_000, soiHeight: 194_786_000,
    },
    "geminus": { // moon of gratian
      image: "/gpp/geminus.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 230_000, atmHeight: 0, soiHeight: 3_140_000,
    },
    "otho": {
      image: "/gpp/otho.png", imageScale: 1.03, imageX: 0, imageY: 0,
      radius: 3_400_000, atmHeight: 350_000, soiHeight: 1_725_278_000, notLandable: true
    },
    "augustus": { // moon of otho
      image: "/gpp/augustus.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 350_000, atmHeight: 65_000, soiHeight: 2_153_000,
    },
    "hephaestus": { // moon of otho
      image: "/gpp/hephaestus.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 125_000, atmHeight: 0, soiHeight: 838_000,
    },
    "jannah": { // moon of otho
      image: "/gpp/jannah.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 105_000, atmHeight: 0, soiHeight: 1_362_000,
    },

    "gauss": { 
      image: "/gpp/gauss.png", imageScale: 1.04, imageX: 0, imageY: 0,
      radius: 2_500_000, atmHeight: 270_000, soiHeight: 2_652_003_000, notLandable: true
    },
    "loki": {  // moon of gauss
      image: "/gpp/loki.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 180_000, atmHeight: 0, soiHeight: 887_000,
    },
    "catullus": {  // moon of gauss
      image: "/gpp/catullus.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 1_200_000, atmHeight: 130_000, soiHeight: 30_021_000,
    },
    "tarsiss": {  // moon of catulus
      image: "/gpp/tarsiss.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 320_000, atmHeight: 125_000, soiHeight: 1_070_000,
    },

    "nero": {
      image: "/gpp/nero.png", imageScale: 2.5, imageX: 0, imageY: 0,
      radius: 5_000_000, atmHeight: 300_000, soiHeight: 8_835_395_000, notLandable: true
    }, 
    "hadrian": { // nero's moon 
      image: "/gpp/hadrian.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 300_000, atmHeight: 75_000, soiHeight: 1_611_000,
    },
    "narisse": { // nero's moon 
      image: "/gpp/narisse.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 90_000, atmHeight: 0, soiHeight: 539_000,
    },
    "muse": { // nero's moon 
      image: "/gpp/muse.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 130_000, atmHeight: 0, soiHeight: 1_591_000,
    },
    "minona": { // nero's moon 
      image: "/gpp/minona.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 120_000, atmHeight: 0, soiHeight: 2_244_000,
    },
    "agrippina": { // nero's moon 
      image: "/gpp/agrippina.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 50_000, atmHeight: 0, soiHeight: 5_003_000,
    },
    "julia": { // nero's moon 
      image: "/gpp/julia.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 30_000, atmHeight: 0, soiHeight: 5_118_000,
    },

    "hox": {
      image: "/gpp/hox.png", imageScale: 1.04, imageX: 0, imageY: 0,
      radius: 250_000, atmHeight: 50_000, soiHeight: 567_558_000,
    }, 
    "argo": { // hox's moon
      image: "/gpp/argo.png", imageScale: 1, imageX: 0, imageY: 0,
      radius: 80_000, atmHeight: 0, soiHeight: 2_885_000,
    },
    
    "leto": {
      image: "/gpp/leto.png", imageScale: 1.02, imageX: 0, imageY: 0,
      radius: 210_000, atmHeight: 45_000, soiHeight: 600_296_000,
    }, 

    "grannus": {
      image: "/gpp/grannus.png", imageScale: 45, imageX: 0, imageY: 0,
      radius: 30_170_000, atmHeight: 300_000, soiHeight: 500_000_000_000, highestPoint: 2_422_198_030, notLandable: true
    }, 

  }
}