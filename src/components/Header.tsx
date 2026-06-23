import { useEffect, useState } from 'react'
import { nav, site } from '../config'

/**
 * Header — barre de navigation fixe, minimaliste.
 * Transparente par-dessus la vidéo d'ouverture, puis se densifie (fond
 * ivoire flouté + filet) une fois passé le premier écran. Style luxe
 * monochrome inspiré de yazid-ichemrahen.com.
 */
export function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        solid
          ? 'border-b border-black/10 bg-ivory/85 text-noir backdrop-blur-md'
          : 'border-b border-transparent text-ivory [text-shadow:0_1px_12px_rgba(10,9,8,0.45)]',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Monogramme + nom */}
        <a href="#top" className="group flex items-baseline gap-3" aria-label={site.name}>
          <span className="display text-xl tracking-[0.18em]">{site.monogram}</span>
          <span className="label hidden text-[0.6rem] opacity-70 sm:inline">
            {site.concept}
          </span>
        </a>

        {/* Liens */}
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

        {/* CTA */}
        <a
          href="#reserver"
          className={[
            'rounded-full border px-5 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors duration-300',
            solid
              ? 'border-noir/30 hover:bg-noir hover:text-ivory'
              : 'border-ivory/40 hover:bg-ivory hover:text-noir',
          ].join(' ')}
        >
          Réserver
        </a>
      </div>
    </header>
  )
}
