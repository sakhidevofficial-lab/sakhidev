import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FooterCTA from '@/components/FooterCTA'
import WorkHero from '@/components/work/WorkHero'
import WorkStats from '@/components/work/WorkStats'
import WorkGrid from '@/components/work/WorkGrid'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Work — sakhidev',
  description: 'Explore sakhidev\'s portfolio of web apps, SaaS products, and digital experiences.',
}

export default function WorkPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <WorkHero />
      <WorkStats />
      <WorkGrid />
      <FooterCTA />
      <Footer />
    </main>
  )
}
