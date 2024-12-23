import { Button } from '@mantine/core'
import React from 'react'
import Image from 'next/image'
import hero_image from '../../public/hero_page.png'

const Hero = () => {
  return (
    <div className="mx-16 flex h-screen flex-col-reverse items-start justify-center gap-8 md:gap-12 lg:flex-row lg:items-center">
      <div className="my-2 flex flex-col justify-start gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-left text-4xl font-semibold">
            Learn, Play, and Grow with Gamified Courses
          </h1>
          <h2 className="text-left text-xl">
            Join a community of learners and earn rewards as you complete
            courses.
          </h2>
        </div>
        <div className="mb-8 flex flex-col justify-center gap-2.5 sm:justify-start md:flex-row md:items-center md:gap-4 lg:gap-6">
          <Button variant="outline" size="xl" className="min-w-max">
            Get Started
          </Button>
          <div className="">50+ students have already enrolled!!</div>
        </div>
      </div>

      <div className="relative mb-0 h-auto w-auto md:mb-2 lg:mb-24">
        <Image
          alt="Hero Image"
          width={1086}
          height={608}
          // style={{
          //   width: '100%',
          //   height: 'auto',
          // }}
          src={hero_image}
          placeholder="blur"
          // priority
        />
      </div>
    </div>
  )
}

export default Hero
