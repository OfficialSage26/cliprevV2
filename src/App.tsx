import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { HowItWorks } from './components/HowItWorks'
import { WhyUs } from './components/WhyUs'
import { Clippers } from './components/Clippers'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Clippers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
