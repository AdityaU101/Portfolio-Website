import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { domains, projects, type Domain, type Project } from '../data/projects'
import { Motif } from './Motif'
import { Lines, Rise, SectionHead } from './Reveal'

const EXPO = [0.16, 1, 0.3, 1] as const
const num = (i: number) => String(i + 1).padStart(2, '0')
const target = (p: Project) => p.demo ?? p.repo
const cta = (p: Project) => (p.demo ? 'Open live demo' : 'View source')

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12L12 4M5.5 4H12v6.5" />
    </svg>
  )
}

function Plate({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <Rise className={className}>
      <a ref={ref} href={target(project)} target="_blank" rel="noreferrer" className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-card">
          <div className="label absolute inset-x-5 top-4 flex justify-between">
            <span>{num(index)}</span>
            <span>{project.domain}</span>
          </div>
          <Motif
            kind={project.motif}
            on={inView}
            className="absolute inset-0 m-auto w-[62%] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
          />
          <span className="absolute bottom-4 left-5 flex translate-y-[180%] items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
            {cta(project)} <Arrow />
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-baseline">
          <h3 className="display text-4xl md:text-5xl">{project.title}</h3>
          <span className="label md:text-right">{project.demo ? 'Live demo' : 'Demo coming'}</span>
        </div>
        <p className="mt-3 max-w-xl text-mute">{project.blurb}</p>
        <p className="label mt-4">{project.stack.join('  ·  ')}</p>
      </a>
    </Rise>
  )
}

export function Work() {
  const [filter, setFilter] = useState<Domain | 'All'>('All')
  const [hovered, setHovered] = useState<Project | null>(null)
  const featured = projects.filter((p) => p.featured)
  const rows = useMemo(() => projects.filter((p) => filter === 'All' || p.domain === filter), [filter])

  // Preview card trails the cursor on devices with a real pointer.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 })
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 })

  return (
    <section id="work" className="shell scroll-mt-20 pb-32 pt-24 md:pt-40">
      <SectionHead index="01" title="Selected work" note={`${projects.length} projects`} />
      <Lines
        className="display mt-10 max-w-5xl text-[clamp(2.4rem,6.2vw,6rem)]"
        lines={[<>Eighteen projects,</>, <>each one <em>running</em>.</>]}
      />

      <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-12">
        <Plate project={featured[0]} index={0} className="md:col-span-7" />
        <Plate project={featured[1]} index={1} className="md:col-span-5 md:mt-40" />
        <Plate project={featured[2]} index={2} className="md:col-span-5" />
        <Plate project={featured[3]} index={3} className="md:col-span-7 md:mt-32" />
      </div>

      <div className="mt-32 md:mt-48">
        <div className="flex flex-col gap-6 border-t border-line pt-4 md:flex-row md:items-center md:justify-between">
          <span className="label">Full index</span>
          <div role="group" aria-label="Filter projects by area" className="-mx-1 flex flex-wrap gap-1">
            {(['All', ...domains] as const).map((d) => {
              const count = d === 'All' ? projects.length : projects.filter((p) => p.domain === d).length
              const active = filter === d
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(d)}
                  className="relative min-h-11 rounded-full px-4 text-sm transition-colors duration-300"
                  style={{ color: active ? 'var(--paper)' : 'var(--ink)' }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-y-1.5 inset-x-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {d} <sup className="font-mono text-[0.625rem] opacity-70">{count}</sup>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <ul
          className="mt-6"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse') return
            mx.set(e.clientX + 28)
            my.set(e.clientY - 110)
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((p) => {
              const i = projects.indexOf(p)
              const dim = hovered && hovered.id !== p.id
              return (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease: EXPO }}
                  className="border-b border-line"
                >
                  <a
                    href={target(p)}
                    target="_blank"
                    rel="noreferrer"
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(p)}
                    onFocus={() => setHovered(null)}
                    className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-5 transition-opacity duration-300 md:grid-cols-[3.5rem_minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,1.1fr)_7.5rem] md:py-6"
                    style={{ opacity: dim ? 0.35 : 1 }}
                  >
                    <span className="label tabular-nums">{num(i)}</span>
                    <span className="display text-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-accent md:text-[2.5rem]">
                      {p.title}
                    </span>
                    <span className="label col-start-2 row-start-2 mt-1 md:col-start-auto md:row-start-auto md:mt-0">{p.domain}</span>
                    <span className="hidden truncate text-sm text-mute md:block">{p.stack.join(', ')}</span>
                    <span className="col-start-3 row-start-1 flex items-center justify-end gap-2 text-sm md:col-start-auto md:row-start-auto">
                      <span className="hidden md:inline">{p.demo ? 'Live demo' : 'Source'}</span>
                      <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Cursor-following preview */}
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" aria-hidden="true">
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="w-72 origin-top-left rounded-sm border border-line bg-card p-4 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]"
            >
              <Motif key={hovered.id} kind={hovered.motif} className="w-full" />
              <p className="mt-2 text-[0.8125rem] leading-snug text-mute">{hovered.blurb}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
