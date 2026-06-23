import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * ScrollVideo — épingle une vidéo plein écran et déplace sa tête de lecture
 * (`currentTime`) selon la progression du scroll : c'est le scroll qui
 * « joue » la vidéo (ex. les portes qui s'ouvrent).
 *
 * ⚠️ Fluidité : la vidéo doit être ré-encodée avec un keyframe sur chaque
 * image (GOP=1), sinon le seek saccade. (Préparation via ffmpeg.)
 *
 * En prefers-reduced-motion : on n'anime pas, on affiche le poster (1re image).
 */
export function ScrollVideo({
  src,
  poster,
  /** hauteur de défilement de la section (ex. '300vh' = scrub plus lent/détaillé) */
  scrollHeight = '300vh',
  children,
  className,
}: {
  src: string
  poster?: string
  scrollHeight?: string
  children?: ReactNode
  className?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Le scroll définit la position cible dans la vidéo.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = videoRef.current
    if (v && v.duration) target.current = p * v.duration
  })

  // Boucle de suivi : on rapproche doucement currentTime de la cible
  // (lissage entre deux événements de scroll → rendu plus fluide).
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
        if (Math.abs(next - cur) > 0.001) {
          // évite les seeks redondants
          v.currentTime = next
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      style={{ height: scrollHeight }}
      className="relative"
      aria-label="Séquence vidéo pilotée au scroll"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-warm">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          className={className ?? 'h-full w-full object-cover'}
        />
        {children}
      </div>
    </section>
  )
}
