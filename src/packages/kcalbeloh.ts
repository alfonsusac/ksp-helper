import type { Package } from "./_types"

export const kcalbeloh: Package = {
  name: "Kcalbeloh",
  prefix: "kb",
  planets: {

    "WH-3141-A": { // Jool's moon | wormhole
      image: undefined, imageScale: 1,
      radius: 10_000, atmHeight: 0, soiHeight: 4_983_000, highestPoint: 45_001, notlandable: true
    },

    "Kcalbeloh": {
      image: "/kcalbeloh/kcalbeloh.png", imageScale: 15.5, imageX: 11, imageY: -7, // raw atm_height: 600_000
      radius: 2_400_000_000, atmHeight: 6100000000, soiHeight: 20_000_000_000_000, highestPoint: 8_500_000_000, notlandable: true
    },
    "Onrefni": {
      image: "/kcalbeloh/onrefni.png", imageScale: 1.01,
      radius: 320_000, atmHeight: 0, soiHeight: 3_428_000, highestPoint: 0
    },
    "Rouqea": {
      image: "/kcalbeloh/rouqea.png", imageScale: 1.04,
      radius: 1_331_000, atmHeight: 80_000, soiHeight: 27_251_000, highestPoint: 0
    },
    "Iomena": {
      image: "/kcalbeloh/iomena.png", imageScale: 1.1,
      radius: 400_000, atmHeight: 80_000, soiHeight: 9_233_000, highestPoint: 0
    },
    "Uleg": {
      image: "/kcalbeloh/uleg.png", imageScale: 1.08,
      radius: 510_000, atmHeight: 46_000, soiHeight: 25_267_000, highestPoint: 0
    },

    "Maelg": {
      image: "/kcalbeloh/maelg.png", imageScale: 1.2,
      radius: 6_185_000, atmHeight: 435_000, soiHeight: 11_622_940_000, highestPoint: 99_500_000, notlandable: true, 
    },
    "Mehtna": {
      image: "/kcalbeloh/mehtna.png", imageScale: 1.08,
      radius: 460_000, atmHeight: 73_000, soiHeight: 6_080_000, highestPoint: 0
    },
    "Meiuqer": {
      image: "/kcalbeloh/meiuqer.png", imageScale: 1.04,
      radius: 50_000, atmHeight: 0, soiHeight: 449_000, highestPoint: 0
    },

    "Sunorc": {
      image: "/kcalbeloh/sunorc.png", imageScale: 1,
      radius: 42_754_000, atmHeight: 436_000, soiHeight: 67_085_212_000, highestPoint: 978_000_000, notlandable: true,
    },
    "Sedah": {
      image: "/kcalbeloh/sedah.png", imageScale: 1.01,
      radius: 6_700_000, atmHeight: 291_000, soiHeight: 47_021_000, highestPoint: 0, notlandable: true
    },
    "Suluco": {
      image: "/kcalbeloh/suluco.png", imageScale: 1.07,
      radius: 520_000, atmHeight: 65_000, soiHeight: 31_359_000, highestPoint: 0
    },
    "Tot": { // Suluco's moon
      image: "/kcalbeloh/tot.png", imageScale: 1.05,
      radius: 3_000, atmHeight: 0, soiHeight: 18_000, highestPoint: 0
    },
    "Sera": {
      image: "/kcalbeloh/sera.png", imageScale: 2.42,
      radius: 690_000, atmHeight: 71_000, soiHeight: 80_511_000, highestPoint: 0, notlandable: true,
    },
    "Dipuc": { // Sera's moon
      image: "/kcalbeloh/dipuc.png", imageScale: 1,
      radius: 180_000, atmHeight: 0, soiHeight: 1_782_000, highestPoint: 0
    },
    "WH-3141-B": { // Sera's moon | wormhole
      image: undefined, imageScale: 1,
      radius: 10_000, atmHeight: 0, soiHeight: 1_819_000, highestPoint: 45_001, notlandable: true
    },

    "Simetra": {
      image: "/kcalbeloh/simetra.png", imageScale: 1.06,
      radius: 4_800_000, atmHeight: 190_000, soiHeight: 15_000, highestPoint: 0, notlandable: true
    },
    "Simeht": { // Simetra's twin
      image: "/kcalbeloh/simeht.png", imageScale: 1.05,
      radius: 4_000_000, atmHeight: 177_000, soiHeight: 12_000, highestPoint: 0, notlandable: true
    },
    "Noira": { // Simetra-Simeht's moon
      image: "/kcalbeloh/noira.png", imageScale: 1,
      radius: 74_000, atmHeight: 0, soiHeight: 664_000, highestPoint: 0
    },
    "Norihc": { // Simetra-Simeht's moon
      image: "/kcalbeloh/norihc.png", imageScale: 1.04,
      radius: 336_000, atmHeight: 42_000, soiHeight: 8_649_000, highestPoint: 0
    },
    "Noyreg": { // Simetra-Simeht's moon
      image: "/kcalbeloh/noyreg.png", imageScale: 1.04,
      radius: 500_000, atmHeight: 96_000, soiHeight: 22_707_000, highestPoint: 0
    },

    "Noi": { // Sunorc's planet
      image: "/kcalbeloh/noi.png", imageScale: 1,
      radius: 8_000, atmHeight: 0, soiHeight: 846_000, highestPoint: 0
    },

    // I have idea what is the minimum height without burning your vessel
    "Aralc-A": {
      image: "/kcalbeloh/aralc-a.png", imageScale: 1,
      radius: 112_893_000, atmHeight: 436_000, soiHeight: 202_700_000_000, highestPoint: 0, notlandable: true
    },
    "Anneheg": { // Aralc-A's moon
      image: "/kcalbeloh/anneheg.png", imageScale: 1,
      radius: 508_000, atmHeight: 0, soiHeight: 17_246_000, highestPoint: 0
    },

    // I have idea what is the minimum height without burning your vessel
    "Aralc-B": {
      image: "/kcalbeloh/aralc-b.png", imageScale: 1,
      radius: 22_832_000, atmHeight: 436_000, soiHeight: 5_600_000, highestPoint: 0, notlandable: true
    },
    "Arorua": { // Aralc-B's moon
      image: "/kcalbeloh/arorua.png", imageScale: 1.05,
      radius: 720_000, atmHeight: 86_000, soiHeight: 22_257_000, highestPoint: 0
    },
    "Ahtpan": {
      image: "/kcalbeloh/ahtpan.png", imageScale: 1.03,
      radius: 380_000, atmHeight: 65_000, soiHeight: 101_324_000, highestPoint: 0
    },
    "Anehta": {
      image: "/kcalbeloh/anehta.png", imageScale: 2.78,
      radius: 8_000_000, atmHeight: 225_000, soiHeight: 2_749_833_000, highestPoint: 0, notlandable: true
    },
    "Enots": { // Anehta's moon
      image: "/kcalbeloh/enots.png", imageScale: 1,
      radius: 18_000, atmHeight: 0, soiHeight: 31_000, highestPoint: 0
    },
    "Efil": { // Anehta's moon
      image: "/kcalbeloh/efil.png", imageScale: 1.07,
      radius: 450_000, atmHeight: 72_000, soiHeight: 3_085_000, highestPoint: 0
    },
    "Eulb": { // Anehta's moon
      image: "/kcalbeloh/eulb.png", imageScale: 1,
      radius: 310_000, atmHeight: 0, soiHeight: 2_748_000, highestPoint: 0
    },
    "Elad": { // Anehta's moon
      image: "/kcalbeloh/elad.png", imageScale: 1,
      radius: 520_000, atmHeight: 0, soiHeight: 13_615_000, highestPoint: 0
    },
  }
}