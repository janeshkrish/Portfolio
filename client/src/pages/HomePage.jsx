import Navbar from '../components/ui/Navbar'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Certificates from '../components/sections/Certificates'
import CodingProfiles from '../components/sections/CodingProfiles'
import Experience from '../components/sections/Experience'
import Achievements from '../components/sections/Achievements'
import Contact from '../components/sections/Contact'
import Footer from '../components/ui/Footer'
import LikeButton from '../components/ui/LikeButton'
import ViewCounter from '../components/ui/ViewCounter'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F5F0' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <CodingProfiles />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />

      {/* Floating Like + View ─ bottom-right corner */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 50,
        }}
      >
        <ViewCounter />
        <LikeButton />
      </div>
    </div>
  )
}
