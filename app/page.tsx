import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Services from '@/components/Services'
import Work from '@/components/Work'
import HowWeWork from '@/components/HowWeWork'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <main className="noise">
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Services />
      <Work />
      <HowWeWork />
      <Process />
      <Testimonials />
      <Blog />
      <FooterCTA />
      <Footer />
    </main>
  )
}
