'use client'

import { AuroraBackground } from '@/components/ui/aurora-background'
import { Button } from '@/components/ui/button'
import { SignUpButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { UserIcon } from 'lucide-react'
import React from 'react'
import Navbar from '../nav/navbar'

export default function Hero() {
  return (
    <AuroraBackground className="h-[50vh] md:h-[100vh]">
      <Navbar />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Achieve your goals with us
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 items-center justify-center flex px-4 xs:px-12 md:px-24 lg:px-56">
          From mastering tough subjects to acing exams, we're here to make
          studying easy and enjoyable for everyone.
        </div>
        <Button
          size={'lg'}
          className="bg-black dark:bg-white text-white dark:text-black rounded-full md:text-base font-medium transition-all"
          asChild
        >
          <SignUpButton>Join for Free!</SignUpButton>
        </Button>
      </motion.div>
    </AuroraBackground>
  )
}
