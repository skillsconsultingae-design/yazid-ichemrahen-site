import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

type AnimatedTextProps = {
  text: string
  className?: string
  /** Délai global avant le début de la révélation (s) */
  delay?: number
  /** Décalage entre chaque caractère (s) */
  stagger?: number
}

/**
 * AnimatedText — révélation caractère par caractère au scroll
 * (phrases clés des Actes II et V). En reduced-motion : un simple fondu
 * du bloc entier.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.028,
}: AnimatedTextProps) {
  const reducedMotion = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return (
      <motion.p
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.p>
    )
  }

  let charIndex = 0
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {word.split('').map((char) => {
            const i = charIndex++
            return (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: '0.4em', filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: '0em',
                    filter: 'blur(0px)',
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {/* espace insécable visuel entre les mots */}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.p>
  )
}
