import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * JourneyVideo — LE parcours en une vidéo continue, scrubée au scroll.
 * La vidéo (public/videos/video.mp4, ré-encodée all-intra pour un seek
 * fluide) joue de la façade au plat selon la progression du scroll.
 * Aucun texte ni voile par-dessus : on laisse l'image respirer.
 */
export function JourneyVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = videoRef.current
    if (v && v.duration) {
      target.current = p * v.duration
      if (reducedMotion) v.currentTime = target.current // snap, pas d'animation
    }
  })

  // Boucle de lissage du scrub (désactivée en reduced-motion).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    if (reducedMotion) return
    let raf = 0
    const loop = () => {
      if (v.duration) {
        const cur = v.currentTime
        const next = cur + (target.current - cur) * 0.18
        if (Math.abs(next - cur) > 0.001) v.currentTime = next
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[600vh] bg-noir"
      aria-label="Le parcours"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/video.mp4"
          poster="/videos/video_poster.jpg"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          className="h-full w-full object-cover"
        />

        {/* Indice de scroll discret — affordance, pas de voile sombre */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span aria-hidden="true" className="scroll-bob text-ivory [filter:drop-shadow(0_1px_6px_rgba(10,9,8,0.5))]">
            ↓
          </span>
        </div>
      </div>
    </section>
  )
}
