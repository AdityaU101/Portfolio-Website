import { useEffect, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'
import './Hero.css'

const roles = [
  'Cloud & ML Engineer',
  'Full-Stack Developer',
  'Graduate Researcher',
  'MLOps Engineer',
  'Computer Vision Enthusiast',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      }, 65)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, 35)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex(r => (r + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
        <ParticleCanvas />
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-greeting fade-in visible">
            <span className="mono-tag">Hello, world! 👋</span>
          </div>

          <h1 className="hero-name fade-in visible fade-in-delay-1">
            I'm <span className="gradient-text">Aditya Upadhyay</span>
          </h1>

          <div className="hero-role fade-in visible fade-in-delay-2">
            <span className="role-text">{displayed}</span>
            <span className="cursor" />
          </div>

          <p className="hero-bio fade-in visible fade-in-delay-3">
            M.S. Computer Science @ <span className="highlight">Arizona State University</span> '27 &mdash;
            building intelligent cloud systems and scalable full-stack applications.
            Open to <strong>SWE & Cloud roles</strong>.
          </p>

          <div className="hero-actions fade-in visible fade-in-delay-4">
            <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}>
              Get In Touch
            </a>
          </div>

          <div className="hero-social fade-in visible fade-in-delay-5">
            <a href="https://github.com/AdityaU101" target="_blank" rel="noreferrer" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/aditya-upadhyay2423" target="_blank" rel="noreferrer" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="mailto:aupadh47@asu.edu" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              Email
            </a>
          </div>
        </div>

        <div className="hero-avatar-col fade-in visible fade-in-delay-2">
          <div className="avatar-ring">
            <div className="avatar-ring-inner">
              <img
                src="https://avatars.githubusercontent.com/u/111223966?v=4"
                alt="Aditya Upadhyay"
                className="avatar-img"
              />
            </div>
          </div>
          <div className="avatar-card">
            <span className="avatar-card-dot" />
            <span>Open to opportunities</span>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-hint"
        onClick={e => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">Scroll</span>
      </a>
    </section>
  )
}
