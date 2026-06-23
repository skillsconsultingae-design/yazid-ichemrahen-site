import { useEffect, useState } from 'react'

/**
 * Suit la préférence système `prefers-reduced-motion`.
 * Sert à couper le smooth scroll (Lenis) et à réduire les animations
 * à de simples fondus partout dans le site.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
