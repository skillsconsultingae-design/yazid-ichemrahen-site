import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * SmoothScroll — initialise Lenis sur toute l'app pour le défilement fluide
 * « cinéma ». Désactivé si l'utilisateur préfère un mouvement réduit
 * (on retombe alors sur le scroll natif).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.25,
      // courbe lente et douce — cohérente avec l'ambiance feutrée
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    // Affordance de dev : permet de positionner le scroll de façon fiable
    // (ex. captures), sans interférer avec la prod.
    if (import.meta.env.DEV) {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
