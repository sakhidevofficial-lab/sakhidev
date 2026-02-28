import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FooterCTA from '@/components/FooterCTA'
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutValues from '@/components/about/AboutValues'
import AboutStack from '@/components/about/AboutStack'
import AboutTeam from '@/components/about/AboutTeam'
import AboutTimeline from '@/components/about/AboutTimeline'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'About — sakhidev',
  description: 'The story, values, and team behind sakhidev — a freelance dev studio built on craft and commitment.',
}

export default function AboutPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutStack />
      <AboutTeam />
      <FooterCTA />
      <Footer />
    </main>
  )
}
