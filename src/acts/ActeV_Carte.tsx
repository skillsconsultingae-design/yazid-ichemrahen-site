import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { FadeIn } from '../components/FadeIn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { menu, menuTitle } from '../data/menu'

/**
 * ACTE V — La carte.
 * Une carte/menu qui se lève (translateY + léger rotateX au scroll), sur
 * fond sombre chaud. Titre « Le Menu » + « Sept services · 145 € », puis
 * les services (chiffres romains en accent).
 */
export function ActeVCarte() {
  const ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const apply = (p: number) => {
    if (!cardRef.current) return
    if (reducedMotion) {
      cardRef.current.style.transform = 'none'
      cardRef.current.style.opacity = '1'
      return
    }
    const rotateX = 24 * (1 - p)
    const translateY = 70 * (1 - p)
    const scale = 0.92 + 0.08 * p
    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`
    cardRef.current.style.opacity = String(Math.min(1, 0.3 + p))
  }
  useMotionValueEvent(scrollYProgress, 'change', apply)
  useLayoutEffect(() => {
    apply(scrollYProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  return (
    <section
      ref={ref}
      id="carte"
      className="relative bg-coal px-6 py-28 md:py-44"
      aria-label="La carte"
    >
      <div className="mx-auto max-w-2xl" style={{ perspective: '1200px' }}>
        <div
          ref={cardRef}
          className="origin-bottom rounded-sm border border-noir/10 bg-ivory px-8 py-12 text-noir shadow-2xl shadow-black/60 md:px-16 md:py-16"
          style={{ willChange: 'transform, opacity', transformOrigin: 'center bottom' }}
        >
          <header className="text-center">
            <p className="label text-[0.6rem] text-accent">La carte</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,6vw,3.75rem)]">
              Le Menu
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-noir/55">
              {menuTitle}
            </p>
            <div className="mx-auto mt-8 h-px w-14 bg-accent/60" />
          </header>

          <ul className="mt-12 space-y-8">
            {menu.map((c) => (
              <li key={c.roman} className="flex items-baseline gap-6">
                <span className="display w-7 shrink-0 text-lg text-accent">
                  {c.roman}
                </span>
                <span className="flex-1 border-b border-noir/8 pb-1">
                  <span className="display block text-xl tracking-wide text-noir">
                    {c.name}
                  </span>
                  <span className="mt-1 block text-sm italic text-noir/55">
                    {c.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <FadeIn delay={0.1}>
          <p className="label mt-12 text-center text-[0.6rem] text-stone">
            La carte évolue au fil des saisons
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
