import { Button, Container } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import hero_image from '../../public/hero_page.png'

const Hero = () => {
  return (
    <Container
      size={'xl'}
      className="mx-16 mt-14 flex h-[calc(100dvh-3.5rem)] flex-col-reverse justify-center gap-8 md:gap-12 lg:flex-row lg:items-center"
    >
      <div className="my-2 flex flex-col justify-start gap-4 text-balance">
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
    </Container>
  )
}

export default Hero
