/**
 * Picture — sert le WebP (léger) avec fallback JPG, pour les images
 * préparées dans `public/images/` (ex. `facade.webp` + `facade.jpg`).
 * Le voile sombre éventuel se met en CSS par-dessus, jamais dans l'image.
 */
export function Picture({
  name,
  alt,
  className,
  eager = false,
}: {
  /** nom de base du fichier dans public/images (sans extension) */
  name: string
  alt: string
  className?: string
  eager?: boolean
}) {
  const base = import.meta.env.BASE_URL
  return (
    <picture>
      <source srcSet={`${base}images/${name}.webp`} type="image/webp" />
      <img
        src={`${base}images/${name}.jpg`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
