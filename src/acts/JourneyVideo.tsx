import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { useIsMobile } from '../lib/useIsMobile'

/**
 * JourneyVideo — LE parcours en une vidéo continue.
 *
 * Desktop : la vidéo (public/videos/video.mp4, ré-encodée all-intra) est
 * scrubée au scroll — c'est le défilement qui « joue » la séquence.
 *
 * Mobile : le scrub tactile est lourd et la vidéo 16:9 serait rognée sur les
 * côtés en plein écran vertical. On sert donc un hero adapté : la vidéo
 * entière (aspect 16:9, jamais coupée) en lecture auto fluide, centrée sur
 * fond noir. Le rendu desktop n'est pas modifié.
 */
export function JourneyVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Desktop uniquement : le scroll pilote la tête de lecture.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (isMobile) return
    const v = videoRef.current
    if (v && v.duration) {
      target.current = p * v.duration
      if (reducedMotion) v.currentTime = target.current
    }
  })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Mobile : lecture auto en boucle (fluide), sauf reduced-motion → poster.
    if (isMobile) {
      if (reducedMotion) {
        v.pause()
        return
      }
      v.muted = true
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
      return
    }

    // Desktop : scrub lissé (lerp) vers la cible définie par le scroll.
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
  }, [isMobile, reducedMotion])

  // ----- Mobile : vidéo entière, non rognée, centrée -----
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="top"
        className="relative grid h-[100svh] place-items-center overflow-hidden bg-noir"
        aria-label="Le parcours"
      >
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}videos/video.mp4`}
          poster={`${import.meta.env.BASE_URL}videos/video_poster.jpg`}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          className="aspect-video w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span aria-hidden="true" className="scroll-bob text-ivory">
            ↓
          </span>
        </div>
      </section>
    )
  }

  // ----- Desktop : plein écran épinglé, scrubé au scroll -----
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
          src={`${import.meta.env.BASE_URL}videos/video.mp4`}
          poster={`${import.meta.env.BASE_URL}videos/video_poster.jpg`}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          className="h-full w-full object-cover"
        />

        {/* Indice de scroll discret */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span aria-hidden="true" className="scroll-bob text-ivory [filter:drop-shadow(0_1px_6px_rgba(10,9,8,0.5))]">
            ↓
          </span>
        </div>
      </div>
    </section>
  )
}
