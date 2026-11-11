import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { about, capabilities, experience, profile } from '../data/profile'
import { Rise, SectionHead } from './Reveal'

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

/** Statement that inks in word by word as it crosses the viewport. */
function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="display text-[clamp(1.75rem,3.6vw,3.5rem)] !leading-[1.12] !tracking-[-0.02em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

export function About() {
  return (
    <section id="about" className="shell scroll-mt-20 py-24 md:py-40">
      <SectionHead index="02" title="About" note={profile.location} />
      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-9">
          <Statement text={about} />
        </div>
      </div>

      <div className="mt-24 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-32 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Rise key={c.group} delay={(i % 3) * 0.07}>
            <h3 className="label border-t border-line pt-4">{c.group}</h3>
            <ul className="mt-4 space-y-1.5 text-lg">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Rise>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-20 py-24 md:py-40">
      <SectionHead index="03" title="Experience & education" />
      <ol className="mt-10">
        {experience.map((e, i) => (
          <li key={e.role}>
            <Rise delay={i * 0.05} className="grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-12 md:py-10">
              <span className="label pt-2 md:col-span-3">{e.period}</span>
              <div className="md:col-span-4">
                <h3 className="display text-3xl md:text-4xl">{e.role}</h3>
                <p className="mt-2 text-mute">
                  {e.org}, {e.place}
                </p>
              </div>
              <p className="max-w-lg md:col-span-5">{e.text}</p>
            </Rise>
          </li>
        ))}
      </ol>
    </section>
  )
}
