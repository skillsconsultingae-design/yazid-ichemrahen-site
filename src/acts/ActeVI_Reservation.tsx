import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { site } from '../config'

/**
 * ACTE VI — La réservation.
 * Bloc final « Votre table vous attend. » + formulaire. Au clic : message
 * de confirmation (pas d'envoi réel, pas de stockage). Pied de page.
 */

const fieldClass =
  'peer w-full border-0 border-b border-ivory/20 bg-transparent py-3 text-ivory placeholder-transparent outline-none transition-colors focus:border-accent'
const labelClass =
  'pointer-events-none absolute left-0 top-3 text-stone transition-all duration-200 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs'

export function ActeVIReservation() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section
        id="reserver"
        className="relative bg-noir px-6 py-28 md:py-44"
        aria-label="Réservez votre table"
      >
        <div className="mx-auto max-w-xl text-center">
          <FadeIn>
            <p className="label text-[0.6rem] text-accent">
              La réservation
            </p>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,4rem)] text-ivory">
              Votre table vous attend
            </h2>
            <p className="mx-auto mt-6 max-w-md text-stone">
              Une table, quelques soirées par mois. Écrivez-moi — je vous
              réponds personnellement.
            </p>
          </FadeIn>

          <div className="mt-14 text-left">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-sm border border-accent/30 bg-coal px-8 py-12 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-7" />
                  </span>
                  <h3 className="display mt-6 text-2xl text-ivory">
                    Votre demande est notée.
                  </h3>
                  <p className="mt-3 text-stone">
                    Merci. Je reviens vers vous très vite pour confirmer votre
                    soirée.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-9"
                >
                  <div className="relative">
                    <input id="nom" name="nom" type="text" required placeholder="Nom" className={fieldClass} />
                    <label htmlFor="nom" className={labelClass}>Nom</label>
                  </div>
                  <div className="relative">
                    <input id="tel" name="tel" type="tel" required placeholder="Téléphone" className={fieldClass} />
                    <label htmlFor="tel" className={labelClass}>Téléphone</label>
                  </div>
                  <div className="grid gap-9 sm:grid-cols-2">
                    <div className="relative">
                      <input id="convives" name="convives" type="number" min={1} max={12} required placeholder="Convives" className={fieldClass} />
                      <label htmlFor="convives" className={labelClass}>Nombre de convives</label>
                    </div>
                    <div className="relative">
                      <input id="date" name="date" type="date" required className={`${fieldClass} [color-scheme:dark]`} />
                      <label htmlFor="date" className="pointer-events-none absolute -top-3.5 left-0 text-xs text-accent">Date souhaitée</label>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea id="message" name="message" rows={3} placeholder="Message" className={`${fieldClass} resize-none`} />
                    <label htmlFor="message" className={labelClass}>Message</label>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full border border-accent bg-accent/10 px-8 py-4 text-[0.65rem] uppercase tracking-[0.28em] text-accent transition-colors duration-300 hover:bg-accent hover:text-noir"
                  >
                    Demander une soirée
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="border-t border-ivory/10 bg-coal px-6 py-20 text-center">
        <p className="display text-3xl tracking-[0.1em] text-ivory">{site.name}</p>
        <p className="label mt-4 text-[0.55rem] text-accent">{site.tagline}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-stone">
          {site.concept} · {site.city}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="nav-link mt-6 inline-block text-accent underline-offset-4"
        >
          {site.email}
        </a>
        <p className="mt-12 text-xs text-stone/60">
          © {site.name} · Tous droits réservés
        </p>
      </footer>
    </>
  )
}
