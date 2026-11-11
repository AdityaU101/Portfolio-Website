import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

const EXPO = [0.16, 1, 0.3, 1] as const

/** Headline that rises line by line from behind a mask. */
export function Lines({
  lines,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}) {
  // Observe the wrapper, not the moving spans: those start fully clipped by
  // their masks, so an observer on them would never report them as visible.
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        // Padding + negative margin keeps descenders and italics inside the mask.
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em] pr-[0.06em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: '112%' }}
            animate={{ y: inView ? 0 : '112%' }}
            transition={{ duration: 1.1, ease: EXPO, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Quiet fade and rise for body content. */
export function Rise({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
      <span className="label">
        <span className="text-accent">{index}</span>
        <span className="mx-2">/</span>
        {title}
      </span>
      {note && <span className="label hidden sm:inline">{note}</span>}
    </div>
  )
}
