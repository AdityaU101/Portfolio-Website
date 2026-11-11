import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

const COUNT        = 65
const MAX_DIST     = 130
const MOUSE_RADIUS = 170
const SPEED        = 0.45

// Alpha levels (colors come from --particle-color / --particle-accent tokens)
const LINE_ALPHA       = 0.35
const MOUSE_LINE_ALPHA = 0.7
const DOT_ALPHA        = 0.55
const MOUSE_DOT_ALPHA  = 0.35

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const darkScheme   = window.matchMedia('(prefers-color-scheme: dark)')

    // Resolved theme colors (re-read when the theme changes)
    const colors = { dot: '', accent: '' }
    const readColors = () => {
      const cs = getComputedStyle(canvas)
      colors.dot    = cs.color
      colors.accent = cs.borderTopColor
    }
    readColors()

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      if (!running) draw()
    }

    // The canvas itself is pointer-events:none so it never blocks the hero
    // content; track the pointer on window instead.
    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      mouseRef.current = (x < 0 || y < 0 || x > r.width || y > r.height)
        ? { x: -9999, y: -9999 }
        : { x, y }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.offsetWidth,
      y:  Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r:  Math.random() * 2 + 1.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      // particle ↔ particle lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            ctx.globalAlpha = (1 - d / MAX_DIST) * LINE_ALPHA
            ctx.beginPath()
            ctx.strokeStyle = colors.dot
            ctx.lineWidth   = 1
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }

        // mouse ↔ particle lines
        const mdx = pts[i].x - mx
        const mdy = pts[i].y - my
        const md  = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < MOUSE_RADIUS) {
          ctx.globalAlpha = (1 - md / MOUSE_RADIUS) * MOUSE_LINE_ALPHA
          ctx.beginPath()
          ctx.strokeStyle = colors.accent
          ctx.lineWidth   = 1.3
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // dots
      ctx.globalAlpha = DOT_ALPHA
      ctx.fillStyle = colors.dot
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // mouse dot
      if (mx > 0) {
        ctx.globalAlpha = MOUSE_DOT_ALPHA
        ctx.beginPath()
        ctx.arc(mx, my, 4, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      const w = canvas.width, h = canvas.height
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }
      })
      draw()
      animRef.current = requestAnimationFrame(tick)
    }

    // Run only while visible on screen, the tab is shown, and motion is allowed
    let running = false
    let onScreen = true
    const start = () => {
      if (running || !onScreen || document.hidden || reduceMotion.matches) return
      running = true
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      tick()
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
    const sync = () => {
      if (onScreen && !document.hidden && !reduceMotion.matches) start()
      else { stop(); draw() }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync() })
    io.observe(canvas)

    const onTheme = () => { readColors(); if (!running) draw() }
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    darkScheme.addEventListener('change', onTheme)
    reduceMotion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)

    sync()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      darkScheme.removeEventListener('change', onTheme)
      reduceMotion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
