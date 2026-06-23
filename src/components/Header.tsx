import { useEffect, useState } from 'react'
import { nav, site } from '../config'

/**
 * Header — barre de navigation fixe, minimaliste.
 * Transparente par-dessus la vidéo d'ouverture, puis se densifie (fond
 * ivoire flouté + filet) une fois passé le premier écran. Sur mobile, les
 * liens passent dans un menu plein écran (burger). Style luxe monochrome
 * inspiré de yazid-ichemrahen.com.
 */
export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloque le scroll de fond quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Le menu mobile est toujours sombre → texte clair.
  const onLight = solid && !open

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        onLight
          ? 'border-b border-black/10 bg-ivory/85 text-noir backdrop-blur-md'
          : 'border-b border-transparent text-ivory [text-shadow:0_1px_12px_rgba(10,9,8,0.45)]',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Monogramme + nom */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-3"
          aria-label={site.name}
        >
          <span className="display text-xl tracking-[0.18em]">{site.monogram}</span>
          <span className="label hidden text-[0.6rem] opacity-70 sm:inline">
            {site.concept}
          </span>
        </a>

        {/* Liens (desktop) */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-link text-[0.7rem] uppercase tracking-[0.28em] opacity-80 transition-opacity hover:opacity-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <a
          href="#reserver"
          className={[
            'hidden rounded-full border px-5 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors duration-300 md:inline-block',
            onLight
              ? 'border-noir/30 hover:bg-noir hover:text-ivory'
              : 'border-ivory/40 hover:bg-ivory hover:text-noir',
          ].join(' ')}
        >
          Réserver
        </a>

        {/* Burger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={[
              'block h-px w-6 bg-current transition-transform duration-300',
              open ? 'translate-y-[3px] rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-px w-6 bg-current transition-transform duration-300',
              open ? '-translate-y-[3px] -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* Panneau de menu (mobile) */}
      <div
        className={[
          'fixed inset-0 -z-10 flex flex-col justify-center bg-noir px-8 text-ivory transition-opacity duration-400 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <nav className="flex flex-col gap-7">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="display text-3xl tracking-wide"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#reserver"
          onClick={() => setOpen(false)}
          className="mt-12 inline-block w-max rounded-full border border-accent px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.28em] text-accent"
        >
          Réserver
        </a>
        <p className="label mt-14 text-[0.55rem] text-accent">{site.tagline}</p>
      </div>
    </header>
  )
}
