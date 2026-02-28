import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FooterCTA from '@/components/FooterCTA'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesList from '@/components/services/ServicesList'
import ServicesProcess from '@/components/services/ServicesProcess'
import ServicesPricing from '@/components/services/ServicesPricing'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Services — sakhidev',
  description: 'Full-stack web development, UI/UX design, SaaS products, and more. See what sakhidev can build for you.',
}

export default function ServicesPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesFAQ />
      <FooterCTA />
      <Footer />
    </main>
  )
}
