import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import FloatingShapes from './components/FloatingShapes'
import './App.css'

function WaveDivider({ flip = false, from = '#fff', to = '#f4f6ff' }) {
  return (
    <div
      className="wave-divider"
      style={{ background: to, transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z"
          fill={from}
        />
      </svg>
    </div>
  )
}

export default function App() {
  return (
    <>
      <FloatingShapes />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <WaveDivider from="#f4f6ff" to="#fff" />
        <About />
        <WaveDivider from="#fff" to="#eef1fe" />
        <Projects />
        <WaveDivider from="#f4f6ff" to="#eef1fe" flip />
        <Skills />
        <WaveDivider from="#eef1fe" to="#fff" />
        <Experience />
        <WaveDivider from="#fff" to="#f4f6ff" />
        <Contact />
      </main>
    </>
  )
}
