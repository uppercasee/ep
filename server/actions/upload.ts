// import { cloudinary } from 'next-cloudinary'
// import { env } from '@/lib/data/env/server'
//
// cloudinary.config({
//   cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: env.CLOUDINARY_API_SECRET,
// })
//
// export async function generateUploadSignature(
//   folder: string,
//   publicId: string
// ) {
//   const timestamp = Math.round(new Date().getTime() / 1000)
//
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp,
//       folder,
//       public_id: publicId,
//     },
//     env.CLOUDINARY_API_SECRET
//   )
//
//   return {
//     timestamp,
//     signature,
//     folder,
//     publicId,
//     apiKey: process.env.CLOUDINARY_API_KEY,
//     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   }
// }
