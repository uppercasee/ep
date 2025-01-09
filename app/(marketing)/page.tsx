import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from './nav/navbar'
import Faq from './sections/faq'
import Features from './sections/features'
import { Footer } from './sections/footer'
import Hero from './sections/hero'

const Home = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <>
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
