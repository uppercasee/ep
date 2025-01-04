import Faq from '@/components/sections/faq'
import Features from '@/components/sections/features'
import { Footer } from '@/components/sections/footer'
import Hero from '@/components/sections/hero'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '../(dashboard)/dashboard/_components/Navbar'

const Home = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <>
      <div className="absolute top-0 z-[-2] w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Navbar />
        <main className="pt-14">
          <Hero />
          <Features />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home
