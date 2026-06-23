import { FadeIn } from '../components/FadeIn'
import { Picture } from '../components/Picture'
import { site } from '../config'

/**
 * Chef — portrait éditorial de la maison. Fond ivoire, image plein cadre à
 * gauche, citation + signature à droite.
 */
export function Chef() {
  return (
    <section id="chef" className="relative bg-ivory text-noir">
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <FadeIn y={0} duration={1.1}>
          <div className="relative h-[60vh] w-full md:h-[92vh]">
            <Picture
              name="plat"
              alt="Une assiette dressée par le chef"
              className="h-full w-full object-cover"
            />
            <span className="label absolute bottom-5 left-5 text-[0.55rem] text-ivory mix-blend-difference">
              Le geste · L'assiette
            </span>
          </div>
        </FadeIn>

        {/* Texte */}
        <div className="flex items-center px-6 py-24 md:px-16 md:py-0">
          <div className="max-w-md">
            <FadeIn>
              <p className="label text-[0.6rem] text-accent">Le chef</p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <blockquote className="display mt-7 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.12]">
                « Recevoir, c'est offrir le meilleur de soi. Je cuisine pour
                une table, comme on cuisine pour les siens. »
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-9 text-[1rem] leading-relaxed text-noir/70">
                Champion du monde de pâtisserie, passé par les plus grandes
                maisons, {site.name} a fait le choix de l'intime. At Home est
                l'aboutissement de ce parcours : la précision de l'étoile,
                l'émotion d'un dîner entre soi.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="display mt-10 text-2xl tracking-[0.04em]">
                {site.name}
              </p>
              <p className="label mt-2 text-[0.55rem] text-noir/50">
                {site.tagline}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
