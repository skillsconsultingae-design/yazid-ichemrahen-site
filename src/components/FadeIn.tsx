import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type FadeInProps = {
  children: ReactNode
  /** Délai avant l'apparition (s) */
  delay?: number
  /** Décalage vertical initial (px) */
  y?: number
  /** Durée (s) */
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li' | 'p'
}

/**
 * FadeIn — apparition douce au scroll (`whileInView`, une seule fois).
 * Si reduced-motion : fondu simple sans déplacement.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className,
  as = 'div',
}: FadeInProps) {
  const reducedMotion = usePrefersReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: reducedMotion ? 0.4 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
