import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../data/profile'
import { Lines, Rise, SectionHead } from './Reveal'

/** Button that leans toward the cursor. Mouse only. */
function Magnetic({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 14 })
  const y = useSpring(my, { stiffness: 180, damping: 14 })

  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-sm font-medium leading-tight text-paper md:h-44 md:w-44 md:text-base"
    >
      {children}
    </motion.a>
  )
}

export function Contact() {
  return (
    <footer id="contact" className="shell scroll-mt-20 pb-8 pt-24 md:pt-40">
      <SectionHead index="04" title="Contact" />
      <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <Lines
          className="display text-[clamp(2.4rem,6.5vw,6rem)]"
          lines={[<>Let's build</>, <><em>something</em>.</>]}
        />
        <Rise className="shrink-0 md:pb-6">
          <Magnetic href={`mailto:${profile.email}`}>
            Write
            <br />
            to me
          </Magnetic>
        </Rise>
      </div>

      <Rise className="mt-16 grid gap-8 border-t border-line pt-6 text-sm md:grid-cols-12">
        <p className="max-w-sm text-mute md:col-span-5">
          Roles, projects, or a conversation about cloud and ML systems. My inbox is open.
        </p>
        <ul className="space-y-2 md:col-span-4 md:col-start-7">
          <li>
            <a className="link pb-0.5" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className="link pb-0.5" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link pb-0.5" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
        <a href="#top" className="link h-fit w-fit pb-0.5 md:col-span-2 md:justify-self-end">
          Back to top
        </a>
      </Rise>

      <p className="label mt-16">© {new Date().getFullYear()} Aditya Upadhyay</p>
    </footer>
  )
}
