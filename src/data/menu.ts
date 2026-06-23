export type Course = {
  /** Numéro de service en chiffre romain */
  roman: string
  name: string
  detail: string
}

/**
 * La carte — Sept services. PLACEHOLDER (à valider / remplacer).
 * ⚠️ Le service III et le VII ont été reconstitués (le brief listait 6
 * services pour « Sept services ») — à confirmer.
 */
export const menuTitle = 'Sept services · 145 €'

export const menu: Course[] = [
  {
    roman: 'I',
    name: 'Petit pois & menthe',
    detail: 'velouté glacé, croustillant de sarrasin',
  },
  {
    roman: 'II',
    name: 'Truite des Pyrénées',
    detail: 'verveine, concombre, crème acidulée',
  },
  {
    roman: 'III',
    name: 'Asperge blanche',
    detail: 'sabayon au vin jaune, morilles', // reconstitué
  },
  {
    roman: 'IV',
    name: 'Pigeon de Racan',
    detail: 'navet glacé, jus au genièvre',
  },
  {
    roman: 'V',
    name: 'Comté 24 mois',
    detail: 'pain aux noix, miel de châtaignier',
  },
  {
    roman: 'VI',
    name: 'Fraise gariguette',
    detail: 'sorbet basilic, meringue',
  },
  {
    roman: 'VII',
    name: 'Mignardises',
    detail: 'café ou infusion', // reconstitué pour atteindre « Sept »
  },
]
