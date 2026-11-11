import './FloatingShapes.css'

// Static shape definitions — no randomness so server/client render matches
const shapes = [
  { type: 'circle',  size: 260, x:  5,  y:  8,  delay: 0,    dur: 22, opacity: 0.07 },
  { type: 'ring',    size: 180, x: 88,  y: 14,  delay: 3,    dur: 28, opacity: 0.09 },
  { type: 'square',  size: 110, x: 75,  y: 55,  delay: 6,    dur: 20, opacity: 0.06 },
  { type: 'circle',  size: 200, x: 15,  y: 62,  delay: 9,    dur: 26, opacity: 0.08 },
  { type: 'diamond', size: 90,  x: 50,  y: 22,  delay: 1.5,  dur: 18, opacity: 0.07 },
  { type: 'ring',    size: 280, x: 92,  y: 72,  delay: 4,    dur: 30, opacity: 0.06 },
  { type: 'square',  size: 70,  x: 35,  y: 85,  delay: 7,    dur: 17, opacity: 0.08 },
  { type: 'circle',  size: 140, x: 62,  y: 78,  delay: 11,   dur: 24, opacity: 0.06 },
  { type: 'diamond', size: 120, x: 8,   y: 38,  delay: 2,    dur: 21, opacity: 0.07 },
  { type: 'ring',    size: 150, x: 48,  y: 50,  delay: 5,    dur: 27, opacity: 0.05 },
]

export default function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`fs-shape fs-${s.type}`}
          style={{
            width:  s.size,
            height: s.size,
            left:   `${s.x}%`,
            top:    `${s.y}%`,
            opacity: s.opacity,
            animationDelay:    `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  )
}
