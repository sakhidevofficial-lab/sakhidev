import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Contact — sakhidev',
  description: 'Start a project with sakhidev. Get in touch and let\'s build something great together.',
}

export default function ContactPage() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactFAQ />
      <Footer />
    </main>
  )
}
