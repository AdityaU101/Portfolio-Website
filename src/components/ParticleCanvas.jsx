import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

const COUNT        = 65
const MAX_DIST     = 130
const MOUSE_RADIUS = 170
const SPEED        = 0.45

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r:  Math.random() * 2 + 1.2,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current
      const w = canvas.width, h = canvas.height

      // move
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }
      })

      // particle ↔ particle lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.strokeStyle = `rgba(67,56,202,${a})`
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
          const a = (1 - md / MOUSE_RADIUS) * 0.7
          ctx.beginPath()
          ctx.strokeStyle = `rgba(109,40,217,${a})`
          ctx.lineWidth   = 1.3
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // dots
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(67,56,202,0.55)'
        ctx.fill()
      })

      // mouse dot
      if (mx > 0) {
        ctx.beginPath()
        ctx.arc(mx, my, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(109,40,217,0.35)'
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
