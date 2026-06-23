import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { Picture } from '../components/Picture'
import { AnimatedText } from '../components/AnimatedText'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * ACTE II — On franchit la porte.
 * entree.png (vue vers l'intérieur chaleureux). Au scroll : léger zoom
 * avant + la lumière se réchauffe (halo ambré qui monte). La phrase
 * « Bonsoir. Suivez-moi. » se révèle lettre par lettre.
 */
export function ActeIIPorte() {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const warmRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const apply = (p: number) => {
    if (imgRef.current) {
      const s = reducedMotion ? 1 : 1.05 + p * 0.22
      imgRef.current.style.transform = `scale(${s})`
    }
    if (warmRef.current) {
      warmRef.current.style.opacity = String(0.15 + p * 0.55)
    }
  }
  useMotionValueEvent(scrollYProgress, 'change', apply)
  useLayoutEffect(() => {
    apply(scrollYProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  return (
    <section
      ref={ref}
      className="relative h-[170vh] bg-warm"
      aria-label="On franchit la porte"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <Picture
            name="entree"
            alt="La vue vers l'intérieur chaleureux du restaurant"
            className="h-full w-full object-cover"
          />
        </div>

        {/* La lumière se réchauffe : halo ambré + assombrissement des bords */}
        <div
          ref={warmRef}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(194,168,120,0.35) 0%, rgba(28,26,20,0.2) 45%, rgba(20,19,15,0.92) 100%)',
          }}
        />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <AnimatedText
            text="Bonsoir. Suivez-moi."
            className="display text-center text-[clamp(1.75rem,6vw,4rem)] text-bone"
          />
        </div>
      </div>
    </section>
  )
}
