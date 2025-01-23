'use client'

import {
  CldImage as CldImageDefault,
  type CldImageProps,
  CldVideoPlayer as CldVideoDefault,
  type CldVideoPlayerProps,
} from 'next-cloudinary'

export const CldImage = (props: CldImageProps) => {
  return <CldImageDefault {...props} />
}

export const CldVideo = (props: CldVideoPlayerProps) => {
  return <CldVideoDefault {...props} />
}
