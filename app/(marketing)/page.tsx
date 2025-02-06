import { authorization } from '@/lib/server-utils'
import { redirect } from 'next/navigation'
import Faq from './sections/faq'
import Features from './sections/features'
import { Footer } from './sections/footer'
import Hero from './sections/hero'
// import Pricing from './sections/pricing'
// import PricingPage from './sections/pricing'

const Home = async () => {
  const userId = await authorization()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <>
      <Hero />
      <section className="pt-14">
        <Features />
      </section>
      {/* <Pricing /> */}
      <section className="px-8 md:px-14">
        <Faq />
      </section>
      <Footer />
    </>
  )
}

export default Home
