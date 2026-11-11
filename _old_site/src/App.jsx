import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import FloatingShapes from './components/FloatingShapes'
import './App.css'

// `from` / `to` take theme tokens so the waves follow light/dark mode.
function WaveDivider({ flip = false, from = 'var(--bg-section-alt)', to = 'var(--bg-base)' }) {
  return (
    <div
      className="wave-divider"
      aria-hidden="true"
      style={{ background: to, transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z"
          style={{ fill: from }}
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
      <main className="app-main">
        <Hero />
        <WaveDivider from="var(--bg-base)" to="var(--bg-section-alt)" />
        <About />
        <WaveDivider from="var(--bg-section-alt)" to="var(--bg-base)" />
        <Projects />
        <WaveDivider from="var(--bg-base)" to="var(--bg-surface)" flip />
        <Skills />
        <WaveDivider from="var(--bg-base)" to="var(--bg-section-alt)" />
        <Experience />
        <WaveDivider from="var(--bg-section-alt)" to="var(--bg-base)" />
        <Contact />
      </main>
    </>
  )
}
