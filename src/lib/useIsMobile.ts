import { useEffect, useState } from 'react'

/**
 * useIsMobile — vrai si le viewport est « téléphone » (≤ 767px par défaut,
 * soit le breakpoint `md` de Tailwind). Sert à servir un hero adapté au
 * mobile sans toucher au rendu desktop.
 */
export function useIsMobile(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
