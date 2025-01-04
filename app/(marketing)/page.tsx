import Navbar from '@/components/nav/navbar'
import Faq from '@/components/sections/faq'
import Features from '@/components/sections/features'
import { Footer } from '@/components/sections/footer'
import Hero from '@/components/sections/hero'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Features />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default Home
