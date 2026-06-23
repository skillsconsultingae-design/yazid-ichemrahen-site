import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Picture } from '../components/Picture'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { site } from '../config'

/**
 * ACTE I — La façade.
 * facade.jpg plein écran (l'enseigne est sur la photo elle-même). La scène
 * « respire » (zoom lent), avec un léger parallax à la souris. Par-dessus,
 * uniquement le fonctionnel : l'adresse, le bouton de réservation et
 * l'indice de scroll. Au scroll, on zoome vers la porte éclairée → Acte II.
 */
export function ActeIHero() {
  const ref = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // On « entre » dans la porte : zoom + fondu.
  const scale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.7])
  const fade = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -24])

  // Parallax à la souris (subtil), coupé si reduced-motion / tactile.
  useEffect(() => {
    if (reducedMotion) return
    const el = parallaxRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        el.style.transform = `translate(${x * -16}px, ${y * -10}px)`
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <section ref={ref} className="relative h-[180vh]" aria-label="La façade">
      <div className="sticky top-0 h-screen overflow-hidden bg-bone">
        {/* Caméra : zoom vers la porte éclairée au scroll */}
        <motion.div
          style={{ scale, opacity: fade, transformOrigin: '50% 60%' }}
          className="absolute inset-0"
        >
          {/* Parallax souris (un peu plus grand pour ne pas montrer les bords) */}
          <div
            ref={parallaxRef}
            className="absolute -inset-[3%] transition-transform duration-300 ease-out"
            style={{ willChange: 'transform' }}
          >
            <Picture
              name="facade"
              alt="La façade du restaurant Yazid Ichemrahen, un store clair et une porte éclairée"
              eager
              className="breathe h-full w-full object-cover"
            />
          </div>

          {/* Voile : transparent en haut, léger en bas (lisibilité du CTA +
              amorce de la bascule vers l'intérieur sombre) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-warm/40" />
        </motion.div>

        {/* Contenu fonctionnel, discret, en bas */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[7vh] text-center"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-bone/90 drop-shadow-[0_1px_8px_rgba(20,19,15,0.6)]">
            {site.address}
          </p>
          <a
            href="#reserver"
            className="rounded-full border border-bone/50 bg-warm/30 px-7 py-3 text-xs uppercase tracking-[0.25em] text-bone backdrop-blur-sm transition-colors duration-300 hover:bg-bone hover:text-warm"
          >
            Demander une réservation
          </a>
          <div className="mt-9 flex flex-col items-center gap-2 text-bone/80">
            <span className="text-[0.7rem] uppercase tracking-[0.35em]">Entrez</span>
            <span aria-hidden="true" className="scroll-bob text-accent">
              ↓
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
