import { useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Picture } from '../components/Picture'
import { ParallaxLayer } from '../components/ParallaxLayer'
import { AnimatedText } from '../components/AnimatedText'
import { FadeIn } from '../components/FadeIn'

/**
 * ACTE III — La salle (parallax profondeur).
 * salle.png en plans superposés : arrière-plan (la salle qui s'enfonce),
 * plan moyen (bougies en bokeh), premier plan légèrement flou. Au scroll,
 * les plans bougent à des vitesses différentes → on avance dans la pièce.
 * Phrase révélée : « Ce soir, il n'y a qu'une table. La vôtre. »
 */

// Bougies en bokeh (plan moyen) — points ambrés flous, positions fixes.
const CANDLES = [
  { left: '12%', top: '58%', size: 26, blur: 6, op: 0.7 },
  { left: '30%', top: '52%', size: 16, blur: 5, op: 0.55 },
  { left: '68%', top: '55%', size: 20, blur: 6, op: 0.6 },
  { left: '82%', top: '62%', size: 30, blur: 8, op: 0.65 },
  { left: '48%', top: '48%', size: 12, blur: 4, op: 0.5 },
]

export function ActeIIISalle() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={ref}
      className="relative h-[220vh] bg-warm"
      aria-label="La salle"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Arrière-plan : la salle (lent) */}
        <ParallaxLayer
          progress={scrollYProgress}
          speed={-70}
          className="absolute inset-0 scale-110"
        >
          <Picture
            name="salle"
            alt="La salle à manger, éclairée à la bougie, en perspective"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-warm/30" />
        </ParallaxLayer>

        {/* Plan moyen : bougies en bokeh (vitesse moyenne) */}
        <ParallaxLayer
          progress={scrollYProgress}
          speed={130}
          className="pointer-events-none absolute inset-0"
        >
          {CANDLES.map((c, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                opacity: c.op,
                filter: `blur(${c.blur}px)`,
                background:
                  'radial-gradient(circle, rgba(255,221,150,1) 0%, rgba(216,162,74,0.6) 50%, rgba(216,162,74,0) 100%)',
              }}
            />
          ))}
        </ParallaxLayer>

        {/* Premier plan : copie floue du bas (rapide) → on passe les tables */}
        <ParallaxLayer
          progress={scrollYProgress}
          speed={280}
          className="absolute inset-x-0 bottom-0 h-[42vh]"
        >
          <Picture
            name="salle"
            alt=""
            className="h-full w-full scale-150 object-cover blur-md [mask-image:linear-gradient(to_top,black_35%,transparent)]"
          />
        </ParallaxLayer>

        {/* Voile pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm/40 via-transparent to-warm/70" />

        {/* La phrase */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <AnimatedText
            text="Ce soir, il n'y a qu'une table."
            className="display text-[clamp(1.5rem,5vw,3.5rem)] text-bone"
          />
          <FadeIn delay={0.5} y={12}>
            <p className="display text-[clamp(1.5rem,5vw,3.5rem)] text-accent">
              La vôtre.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
