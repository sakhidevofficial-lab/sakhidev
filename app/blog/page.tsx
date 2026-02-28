import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FooterCTA from '@/components/FooterCTA'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogNewsletter from '@/components/blog/BlogNewsletter'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Blog — sakhidev',
  description: 'Dev insights, technical deep-dives, and honest takes on building great software products.',
}

export default function BlogPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <BlogHero />
      <BlogGrid />
      <BlogNewsletter />
      <FooterCTA />
      <Footer />
    </main>
  )
}
