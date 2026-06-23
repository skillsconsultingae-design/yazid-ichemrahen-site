import { SmoothScroll } from './components/SmoothScroll'
import { Header } from './components/Header'
import { JourneyVideo } from './acts/JourneyVideo'
import { Concept } from './sections/Concept'
import { Experience } from './sections/Experience'
import { ActeVCarte } from './acts/ActeV_Carte'
import { Chef } from './sections/Chef'
import { ActeVIReservation } from './acts/ActeVI_Reservation'

function App() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        {/* Ouverture : le parcours en une vidéo continue, scrubée au scroll
            (façade → on entre → la salle → on s'installe → le plat) */}
        <JourneyVideo />
        {/* Le manifeste « At Home » */}
        <Concept />
        {/* Les trois piliers de la maison */}
        <Experience />
        {/* La carte */}
        <ActeVCarte />
        {/* Le chef */}
        <Chef />
        {/* La réservation + pied de page */}
        <ActeVIReservation />
      </main>
    </SmoothScroll>
  )
}

export default App
