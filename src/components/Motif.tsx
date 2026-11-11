import type { ReactNode } from 'react'
import type { MotifKind } from '../data/projects'

/**
 * One small line drawing per project, drawn on a 200 x 140 grid.
 * Strokes carry pathLength=1 so CSS can draw them in (see .motif in index.css).
 */
const A = 'var(--accent)'
const s = { pathLength: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 0.9 } as const
const a = { ...s, stroke: A, strokeWidth: 1.3 } as const
/** Dashed guide line: fades in instead of drawing. */
const dash = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, strokeDasharray: '3 4', strokeOpacity: 0.45 } as const
const dashA = { ...dash, stroke: A, strokeOpacity: 1 } as const

const art: Record<MotifKind, ReactNode> = {
  graph: (
    <>
      <path {...s} d="M40 70H78M122 46H160M122 94H160M78 70C100 70 100 46 122 46M78 70C100 70 100 94 122 94" />
      <rect {...s} x="16" y="58" width="24" height="24" rx="3" />
      <rect {...a} x="78" y="58" width="24" height="24" rx="3" />
      <rect {...s} x="122" y="34" width="24" height="24" rx="3" />
      <rect {...s} x="122" y="82" width="24" height="24" rx="3" />
      <path {...dash} d="M160 46h20M160 94h20" />
    </>
  ),
  ranges: (
    <>
      {[34, 58, 82, 106].map((y, i) => (
        <g key={y}>
          <path {...s} d={`M24 ${y}H176`} strokeOpacity={0.35} />
          <path {...s} strokeWidth={5} d={`M${70 + i * 6} ${y}H${128 - i * 4}`} strokeOpacity={0.5} />
        </g>
      ))}
      <circle cx="96" cy="34" r="4" fill="currentColor" />
      <circle cx="150" cy="58" r="5" fill={A} />
      <circle cx="104" cy="82" r="4" fill="currentColor" />
      <circle cx="52" cy="106" r="5" fill={A} />
    </>
  ),
  network: (
    <>
      <path {...s} d="M100 70L52 36M100 70L150 40M100 70L60 108M100 70L146 104M52 36L150 40M60 108L146 104M150 40L176 74L146 104" />
      <circle cx="100" cy="70" r="9" fill={A} />
      {[[52, 36], [150, 40], [60, 108], [146, 104], [176, 74]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="var(--card)" stroke="currentColor" strokeWidth="0.9" />
      ))}
    </>
  ),
  diff: (
    <>
      {[30, 46, 62, 78, 94, 110].map((y, i) => (
        <path key={y} {...(i === 2 || i === 3 ? a : s)} strokeWidth={i === 2 || i === 3 ? 3 : 0.9}
          d={`M44 ${y}H${[150, 120, 164, 132, 108, 142][i]}`} strokeOpacity={i === 2 || i === 3 ? 1 : 0.55} />
      ))}
      <path {...a} d="M26 62h8M30 58v8M26 78h8" />
      <path {...s} d="M36 22V118" strokeOpacity={0.35} />
    </>
  ),
  signal: (
    <>
      <path {...dash} d="M16 96H184" />
      <path {...s} d="M16 52C30 46 40 58 54 52S78 44 92 54C100 60 104 104 114 106S126 60 136 54S160 48 184 52" />
      <path {...a} d="M100 96h28" strokeWidth={3} />
      <circle cx="114" cy="106" r="4" fill={A} />
    </>
  ),
  pipeline: (
    <>
      <path {...s} d="M40 70H76M100 70H124M148 70H170" />
      <path {...a} d="M52 70h8M108 70h8M154 70h8" strokeWidth={4} />
      <rect {...s} x="16" y="56" width="24" height="28" rx="2" />
      <path {...s} d="M76 52H100V88H76ZM76 64H100M76 76H100" />
      <circle {...s} cx="136" cy="70" r="12" />
      <path {...s} d="M170 58l12 12-12 12" />
    </>
  ),
  scatter: (
    <>
      <path {...s} d="M28 20V116H180" strokeOpacity={0.5} />
      <path {...a} d="M36 104L172 34" />
      {[[52, 88], [66, 96], [80, 74], [94, 82], [112, 58], [126, 70], [142, 44], [158, 52]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill="currentColor" />
      ))}
    </>
  ),
  ledger: (
    <>
      <rect {...s} x="24" y="24" width="152" height="92" rx="3" />
      <path {...s} d="M24 46H176M24 69H176M24 92H176M72 24V116M128 24V116" strokeOpacity={0.5} />
      <path {...a} strokeWidth={4} d="M138 58H166M138 81H156M138 104H162" />
    </>
  ),
  shelves: (
    <>
      <path {...s} d="M24 54H176M24 92H176" />
      <path {...s} d="M34 54V30H58V54M66 54V38H86V54M112 54V26H140V54M40 92V70H70V92M96 92V66H116V92M150 92V74H166V92" />
      <path {...a} d="M94 54V34H104V54M124 92V78H142V92" />
      <path {...s} d="M24 116H176" strokeOpacity={0.4} />
    </>
  ),
  verse: (
    <>
      <path {...s} d="M40 36H132M40 54H150M40 72H104" />
      <path {...s} d="M64 96H156M64 114H128" strokeOpacity={0.6} />
      <path {...a} d="M112 72c8-10 20-10 26 0" />
    </>
  ),
  checks: (
    <>
      {[36, 70, 104].map((y, i) => (
        <g key={y}>
          <rect {...s} x="30" y={y - 10} width="20" height="20" rx="4" />
          <path {...s} d={`M64 ${y}H${[156, 132, 148][i]}`} strokeOpacity={i < 2 ? 0.45 : 1} />
        </g>
      ))}
      <path {...a} d="M34 36l5 5 8-9M34 70l5 5 8-9" />
    </>
  ),
  swatch: (
    <>
      <rect x="28" y="30" width="44" height="80" fill="currentColor" fillOpacity={0.85} />
      <rect x="78" y="30" width="44" height="80" fill={A} />
      <rect x="128" y="30" width="44" height="80" fill="currentColor" fillOpacity={0.25} />
      <path {...s} d="M28 30H172V110H28Z" />
    </>
  ),
  dial: (
    <>
      <circle {...s} cx="100" cy="70" r="44" />
      <path {...a} d="M100 70L128 44" strokeWidth={2.5} />
      <circle cx="100" cy="70" r="4" fill="currentColor" />
      <path {...s} d="M100 20v10M150 70h-10M100 120v-10M50 70h10" />
    </>
  ),
  notebook: (
    <>
      <rect {...s} x="36" y="20" width="128" height="100" rx="3" />
      <path {...s} d="M52 38H112M52 50H92" strokeOpacity={0.6} />
      <path {...s} d="M52 104V72H148V104Z" strokeOpacity={0.5} />
      <path {...a} d="M58 98L78 86L96 92L118 78L142 82" />
    </>
  ),
  split: (
    <>
      <path {...s} d="M28 20V116H180" strokeOpacity={0.5} />
      <path {...a} d="M44 108C80 96 116 60 168 30" />
      {[[60, 60], [78, 44], [96, 52], [58, 82]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="currentColor" />
      ))}
      {[[120, 96], [140, 80], [156, 100], [132, 108]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.9" />
      ))}
    </>
  ),
  tokens: (
    <>
      {[[28, 34, 38], [72, 34, 54], [132, 34, 40], [28, 62, 60], [94, 62, 34], [134, 62, 38], [28, 90, 30], [64, 90, 52], [122, 90, 50]].map(
        ([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height="18" rx="9"
            fill={i === 1 || i === 5 ? A : 'none'} stroke={i === 1 || i === 5 ? A : 'currentColor'} strokeWidth="0.9"
            strokeOpacity={i === 1 || i === 5 ? 1 : 0.6} />
        ),
      )}
    </>
  ),
  brackets: (
    <>
      <path {...s} strokeWidth={2} d="M62 28C46 28 54 62 36 70C54 78 46 112 62 112M138 28C154 28 146 62 164 70C146 78 154 112 138 112" />
      <path {...a} d="M82 58H118M82 70H106M82 82H112" strokeWidth={2.5} />
    </>
  ),
  gauge: (
    <>
      <path {...s} d="M30 104H170" strokeOpacity={0.4} />
      {[40, 66, 92, 118, 144].map((x, i) => (
        <rect key={x} x={x} y={104 - [34, 58, 44, 72, 50][i]} width="16" height={[34, 58, 44, 72, 50][i]}
          fill={i === 2 ? A : 'none'} stroke={i === 2 ? A : 'currentColor'} strokeWidth="0.9" />
      ))}
      <path {...dashA} d="M30 60H170" />
    </>
  ),
}

export function Motif({ kind, on = true, className = '' }: { kind: MotifKind; on?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" className={`motif ${on ? 'is-on' : ''} ${className}`}>
      {art[kind]}
    </svg>
  )
}
