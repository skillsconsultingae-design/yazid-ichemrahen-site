import { FadeIn } from '../components/FadeIn'
import { Picture } from '../components/Picture'

/**
 * Concept — manifeste « At Home ». Section ivoire, fort contraste après la
 * vidéo sombre : une déclaration éditoriale + une image atmosphérique.
 */
export function Concept() {
  return (
    <section id="concept" className="relative bg-ivory px-6 py-28 text-noir md:py-44">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-12">
        {/* Texte */}
        <div className="md:col-span-6 lg:col-span-5">
          <FadeIn>
            <p className="label text-[0.6rem] text-accent">Le concept</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
              La haute gastronomie,
              <br />
              <span className="italic">chez vous.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-noir/70">
              <span className="font-normal text-noir">At Home</span> efface la
              distance entre la table et l'atelier. Un soir, une seule table : la
              vôtre. Le chef se déplace, dresse, raconte — et le restaurant
              devient votre salon le temps d'un dîner.
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="#reserver"
                className="rounded-full bg-noir px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:bg-noir/80"
              >
                Réserver une soirée
              </a>
              <a
                href="#experience"
                className="nav-link text-[0.65rem] uppercase tracking-[0.25em] text-noir/60 hover:text-noir"
              >
                Je découvre
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Image */}
        <div className="md:col-span-6 lg:col-span-7">
          <FadeIn delay={0.1} y={36}>
            <figure className="relative overflow-hidden">
              <div className="aspect-[4/5] w-full md:aspect-[5/4]">
                <Picture
                  name="table"
                  alt="Une table dressée pour un dîner privé"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="label absolute bottom-4 left-4 text-[0.55rem] text-ivory mix-blend-difference">
                Une table · Un soir
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
