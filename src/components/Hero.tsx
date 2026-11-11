import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Lines } from './Reveal'

function usePhoenixTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Phoenix', hour: '2-digit', minute: '2-digit', hour12: false }).format(
      new Date(),
    )
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 20_000)
    return () => clearInterval(id)
  }, [])
  return time
}

const facts = [
  ['Now', 'M.S. Computer Science, Arizona State University'],
  ['Graduating', 'May 2027'],
  ['Looking for', 'Software and cloud engineering roles'],
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const time = usePhoenixTime()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col justify-end pb-8 pt-28">
      <motion.div style={{ y, opacity: fade }} className="shell">
        <motion.p
          className="label mb-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to full-time roles from May 2027
        </motion.p>

        <Lines
          as="h1"
          delay={0.15}
          className="display text-[clamp(3.1rem,11.2vw,12.5rem)]"
          lines={[
            <>Cloud &amp; ML systems,</>,
            <>
              built to <em>hold up</em>
            </>,
            <>in production.</>,
          ]}
        />

        <div className="mt-12 grid gap-10 border-t border-line pt-6 md:grid-cols-12">
          <motion.p
            className="max-w-xl text-lg leading-relaxed md:col-span-5 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            I'm Aditya Upadhyay. I build intelligent cloud systems and full-stack applications, and this is where all of
            it lives, each project with a demo you can open.
          </motion.p>

          <motion.dl
            className="grid gap-3 text-sm md:col-span-5 md:col-start-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9 }}
          >
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="label pt-0.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7.5rem_1fr] gap-4">
              <dt className="label pt-0.5">Local time</dt>
              <dd className="font-mono text-[0.8125rem] tabular-nums">
                {time} <span className="text-mute">Tempe, AZ</span>
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>
    </section>
  )
}
