# Yazid Ichemrahen — At Home

Site vitrine cinématique pour le concept **« At Home »** : un dîner gastronomique
privé, une seule table par soirée. Direction artistique luxe monochrome
(noir / ivoire, accent champagne), signature **Élégance · Exigence · Excellence**.

## Le parti pris

Une **vidéo continue scrubée au scroll** sert d'ouverture : c'est le défilement
qui « joue » la séquence (la façade → la salle → le plat). La page se déroule
ensuite en sections éditoriales : le concept, l'expérience (trois piliers),
la carte, le chef, puis la réservation.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens via `@theme`)
- **Framer Motion** (animations liées au scroll)
- **Lenis** (smooth scroll)

## Démarrer

```bash
npm install
npm run dev      # serveur de dev (http://localhost:5173)
npm run build    # build de production -> dist/
npm run preview  # prévisualiser le build
```

## Structure

```
src/
  acts/        JourneyVideo (hero scrubé), la carte, la réservation
  sections/    Concept, Experience, Chef
  components/  Header, FadeIn, Picture, SmoothScroll…
  data/        menu.ts (la carte)
  config.ts    nom, coordonnées, navigation
public/
  videos/      video.mp4 (ré-encodée all-intra pour un scrub fluide)
  images/      visuels (webp + fallback jpg)
```

## Notes

- La vidéo du hero est ré-encodée **all-intra** (chaque image = keyframe) pour
  que le déplacement de la tête de lecture au scroll reste fluide.
- Certaines informations (menu, coordonnées, biographie) sont des **placeholders**
  à remplacer par les données réelles dans `src/config.ts` et `src/data/menu.ts`.
- Le site respecte `prefers-reduced-motion` (scrub et animations désactivés).
