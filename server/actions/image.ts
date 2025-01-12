'use server'

import { getCldImageUrl } from 'next-cloudinary'

export const getDataUrl = async ({
  p_id,
}: { p_id: string }): Promise<string> => {
  try {
    const imageUrl = getCldImageUrl({
      src: p_id,
      width: 100,
    })

    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch the image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const contentType = response.headers.get('content-type') || 'image/jpeg' // Default to 'image/jpeg'
    const dataUrl = `data:${contentType};base64,${base64}`

    return dataUrl
  } catch (error) {
    console.error('Error generating Data URL:', error)
    throw error
  }
}
