import { motion } from 'motion/react'
import type { Project } from '../data/projects'

const EXPO = [0.16, 1, 0.3, 1] as const

export const shotSrc = (p: Project) => `/shots/${p.id}.webp`
export const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** A screenshot of a deployed site in a minimal browser frame. */
export function Screen({
  project,
  on = true,
  className = '',
  eager = false,
}: {
  project: Project
  on?: boolean
  className?: string
  eager?: boolean
}) {
  return (
    <motion.div
      className={`overflow-hidden rounded-[3px] border border-line bg-paper shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)] ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: on ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
      transition={{ duration: 1.1, ease: EXPO }}
    >
      <div className="flex h-6 items-center gap-1.5 border-b border-line px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-[0.625rem] text-mute">{project.demo ? host(project.demo) : ''}</span>
      </div>
      <img
        src={shotSrc(project)}
        alt={`Screenshot of the ${project.title} demo`}
        width={1440}
        height={900}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </motion.div>
  )
}
