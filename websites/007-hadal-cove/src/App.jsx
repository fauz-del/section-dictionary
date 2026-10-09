import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import SpecimenLog from './sections/SpecimenLog'
import SignalSection from './sections/SignalSection'
import BelowSurface from './sections/BelowSurface'
import FinalEncounter from './sections/FinalEncounter'
import Footer from './sections/Footer'
import ScrollReveal from './components/ScrollReveal'
import './App.css'

function App() {
  return (
    <main className="site-shell" id="page">
      <div className="hero-stage">
        <Navbar />
        <Hero />
      </div>
      
      <ScrollReveal>
       <SpecimenLog />
      </ScrollReveal>

      <ScrollReveal>
       <BelowSurface />
      </ScrollReveal>

      <ScrollReveal>
       <SignalSection />
      </ScrollReveal>

      <ScrollReveal>
       <FinalEncounter />
      </ScrollReveal>
      <Footer />
    </main>
  )
}

export default App
