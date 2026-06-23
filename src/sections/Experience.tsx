import { FadeIn } from '../components/FadeIn'

/**
 * Experience — trois piliers (Élégance · Exigence · Excellence), en colonnes
 * sur fond noir, séparées par des filets. Reprend la signature de la maison.
 */
const PILLARS = [
  {
    n: '01',
    title: 'Élégance',
    body:
      "Un dressage à la minute, une vaisselle choisie, un service feutré. Rien n'est laissé au hasard, tout semble évident.",
  },
  {
    n: '02',
    title: 'Exigence',
    body:
      'Des produits sourcés au plus juste, travaillés sans compromis. Sept services qui suivent la saison, pensés pour votre soirée.',
  },
  {
    n: '03',
    title: 'Excellence',
    body:
      "L'expérience d'un chef étoilé, dans l'intimité de votre table. Une grande cuisine, sans la distance d'une grande salle.",
  },
] as const

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-noir px-6 py-28 md:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center">
            <p className="label text-[0.6rem] text-accent">L'expérience</p>
            <h2 className="display mx-auto mt-6 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] text-ivory">
              Trois mots résument la maison.
              <br />
              Une soirée les fait vivre.
            </h2>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-px md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.1} y={32}>
              <article className="relative h-full px-2 md:px-10">
                {/* filet de séparation à gauche (sauf 1re colonne) */}
                {i > 0 && (
                  <span className="hairline absolute -left-px top-2 hidden h-[88%] w-px md:block" />
                )}
                <span className="display block text-2xl text-accent/70">{p.n}</span>
                <h3 className="display mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ivory">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-stone">
                  {p.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
