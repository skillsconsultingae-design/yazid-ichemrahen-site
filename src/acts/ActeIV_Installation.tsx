import { motion } from 'framer-motion'
import { Picture } from '../components/Picture'
import { FadeIn } from '../components/FadeIn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * ACTE IV — On s'installe.
 * table.png (table dressée). Les détails se révèlent en cascade
 * (fondu + léger slide), comme si l'on dressait devant le visiteur.
 * Micro-interactions au survol : un reflet sur le verre, la carte qui se
 * soulève. Texte : « Installez-vous. »
 */
export function ActeIVInstallation() {
  const reducedMotion = usePrefersReducedMotion()

  const cascade = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 26 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reducedMotion ? 0 : i * 0.16,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  }

  const pieces = [
    { label: 'La nappe', detail: 'lin lavé, blanc cassé' },
    { label: 'Les couverts', detail: 'argent patiné' },
    { label: 'La serviette', detail: 'pliée à la main' },
  ]

  return (
    <section
      className="relative bg-warm px-6 py-28 md:py-36"
      aria-label="On s'installe"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
            On s'installe
          </p>
          <h2 className="display mt-5 text-center text-[clamp(2rem,6vw,4rem)] text-bone">
            Installez-vous
          </h2>
        </FadeIn>

        {/* La table dressée */}
        <FadeIn delay={0.1} y={32}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-bone/10 shadow-2xl shadow-black/50">
            <Picture
              name="table"
              alt="La table dressée : serviette pliée, couverts, verre, bougie"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </FadeIn>

        {/* Détails en cascade */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-8 grid gap-5 sm:grid-cols-3"
        >
          {pieces.map((p, i) => (
            <motion.li
              key={p.label}
              custom={i}
              variants={cascade}
              className="rounded-xl border border-bone/10 bg-ink/30 px-6 py-7 text-center"
            >
              <span className="display block text-xl text-bone">{p.label}</span>
              <span className="mt-2 block text-sm text-dim">{p.detail}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Micro-interactions : le verre (reflet) & la carte (se soulève) */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Le verre : un reflet glisse au survol */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cascade}
            className="group relative flex h-40 items-end overflow-hidden rounded-xl border border-bone/10 bg-ink/30 p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bone/20 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
            />
            <div>
              <span className="display block text-xl text-bone">Le verre</span>
              <span className="mt-1 block text-sm text-dim">
                cristal — passez dessus
              </span>
            </div>
          </motion.div>

          {/* La carte : se soulève au survol */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cascade}
            whileHover={reducedMotion ? undefined : { y: -10, rotateZ: -0.5 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="flex h-40 flex-col justify-center rounded-xl border border-accent/30 bg-ink/40 p-6 shadow-xl shadow-black/40"
          >
            <span className="display block text-xl text-bone">La carte</span>
            <span className="mt-1 text-sm text-dim">
              posée à votre place — elle vous attend
            </span>
          </motion.div>
        </div>

        <FadeIn delay={0.1}>
          <p className="display mt-16 text-center text-[clamp(1.25rem,3.5vw,2rem)] text-bone/90">
            Le dîner commence.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
