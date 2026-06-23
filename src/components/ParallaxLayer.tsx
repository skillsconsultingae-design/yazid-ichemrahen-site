import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * ParallaxLayer — translateY proportionnel à la progression de scroll, à
 * vitesse réglable (plans à vitesses différentes = profondeur). Piloté par
 * ref via une souscription unique (pas d'offload framer, fiable). Coupé si
 * prefers-reduced-motion.
 */
export function ParallaxLayer({
  progress,
  speed = -120,
  className,
  children,
}: {
  /** progression 0→1 partagée par la section (useScroll du parent) */
  progress: MotionValue<number>
  /** amplitude en px ; négatif = plus lent (arrière-plan), positif = plus rapide (premier plan) */
  speed?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const apply = (p: number) => {
    if (!ref.current) return
    const ty = reducedMotion ? 0 : (p - 0.5) * speed
    ref.current.style.transform = `translate3d(0, ${ty}px, 0)`
  }

  useMotionValueEvent(progress, 'change', apply)

  useLayoutEffect(() => {
    apply(progress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
