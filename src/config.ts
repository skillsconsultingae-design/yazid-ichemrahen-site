/**
 * Config éditable du site.
 *
 * ⚠️ PLACEHOLDERS : adresse, téléphone, e-mail et menu sont des exemples.
 * S'il s'agit du vrai établissement, remplace par les vraies informations.
 */
export const site = {
  name: 'Yazid Ichemrahen',
  monogram: 'YI',
  concept: 'At Home',
  tagline: 'Élégance · Exigence · Excellence',
  // ligne d'adresse discrète (placeholder)
  address: 'Paris · sur réservation',
  city: 'Paris, sur réservation',
  subtitle: 'At Home',
  phone: '+33 1 00 00 00 00',
  email: 'reservation@yazidichemrahen.fr',
} as const

/** Ancres de navigation (header). */
export const nav = [
  { label: 'Le concept', href: '#concept' },
  { label: "L'expérience", href: '#experience' },
  { label: 'La carte', href: '#carte' },
  { label: 'Le chef', href: '#chef' },
] as const
