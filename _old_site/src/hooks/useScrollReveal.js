import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let revealed = false
    let mutObs = null

    const revealAll = () => {
      el.querySelectorAll('.fade-in').forEach(child => child.classList.add('visible'))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed = true
          revealAll()
          observer.unobserve(el)

          // Watch for new .fade-in nodes (e.g. filter re-renders) and reveal immediately
          mutObs = new MutationObserver(() => {
            if (revealed) revealAll()
          })
          mutObs.observe(el, { childList: true, subtree: true })
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      mutObs?.disconnect()
    }
  }, [])

  return ref
}
