import Lenis from 'lenis'
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { About, Experience } from './components/About'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Work } from './components/Work'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  // Smooth wheel scrolling, skipped entirely for visitors who ask for less motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.11 })
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm text-paper focus:translate-y-0"
      >
        Skip to work
      </a>
      <div className="grain" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-accent"
      />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
      </main>
      <Contact />
    </MotionConfig>
  )
}
