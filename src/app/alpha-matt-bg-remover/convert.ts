// "use server"

// import sharp from "sharp"

// export async function convert(
//   img1: File,
//   img2: File,
// ) {
//   if (process.env.NODE_ENV === "production") throw new Error("Uninvocable in prod")

//   const black = sharp(Buffer.from(await img1.arrayBuffer()));
//   const white = sharp(Buffer.from(await img2.arrayBuffer()));

//   const {
//     data: blackData,
//     info: blackInfo,
//   } = await black
//     .removeAlpha()
//     .raw()
//     .toBuffer({ resolveWithObject: true })

//   const {
//     data: whiteData,
//     info: whiteInfo,
//   } = await white
//     .removeAlpha()
//     .raw()
//     .toBuffer({ resolveWithObject: true })

//   if (
//     blackInfo.width !== whiteInfo.width ||
//     blackInfo.height !== whiteInfo.height
//   ) {
//     throw new Error("Images must have identical dimensions.")
//   }

//   const out = Buffer.alloc(
//     blackInfo.width * blackInfo.height * 4
//   )

//   for (let i = 0, j = 0; i < blackData.length; i += 3, j += 4) {
//     const br = blackData[ i ] / 255
//     const bg = blackData[ i + 1 ] / 255
//     const bb = blackData[ i + 2 ] / 255

//     const wr = whiteData[ i ] / 255
//     const wg = whiteData[ i + 1 ] / 255
//     const wb = whiteData[ i + 2 ] / 255

//     // Estimate alpha from each channel
//     const ar = 1 - (wr - br)
//     const ag = 1 - (wg - bg)
//     const ab = 1 - (wb - bb)

//     // Average and clamp
//     // const alpha = 1 - Math.max(
//     //   wr - br,
//     //   wg - bg,
//     //   wb - bb,
//     // );
//     let alpha = (ar + ag + ab) / 3
//     alpha = Math.max(0, Math.min(1, alpha))

//     let r = 0
//     let g = 0
//     let b = 0

//     if (alpha > 0.0001) {
//       r = br / alpha
//       g = bg / alpha
//       b = bb / alpha
//     }

//     out[ j ] = Math.round(Math.min(1, r) * 255)
//     out[ j + 1 ] = Math.round(Math.min(1, g) * 255)
//     out[ j + 2 ] = Math.round(Math.min(1, b) * 255)
//     out[ j + 3 ] = Math.round(alpha * 255)
//   }

//   const resBuffer = await sharp(out, {
//     raw: {
//       width: blackInfo.width,
//       height: blackInfo.height,
//       channels: 4,
//     },
//   }).png()
//     .toBuffer();

//   return resBuffer
// }