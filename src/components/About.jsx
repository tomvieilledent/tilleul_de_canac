import { HIGHLIGHTS, PHOTOS } from "../lib/site.js";
import Photo from "./Photo.jsx";

export default function About() {
  return (
    <section id="presentation" className="section">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">La maison</p>
          <h2>Une halte paisible entre ville et campagne</h2>
          <p>
            Le Tilleul de Canac vous accueille dans une maison au calme, entourée d'un jardin avec
            terrasse. Idéalement située à Onet-le-Château, vous êtes à quelques minutes à pied de la
            gare de Rodez et à deux pas du centre historique, tout en profitant de la tranquillité
            des environs.
          </p>
          <p>
            La chambre dispose d'un coin salon, d'une télévision et d'une salle de bains privative
            (baignoire ou douche), avec sèche-cheveux et articles de toilette offerts. Un coin repas
            avec kitchenette équipée (micro-ondes, réfrigérateur, vaisselle) est à votre disposition.
          </p>
          <ul className="feature-list">
            {HIGHLIGHTS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <figure className="figure">
          <Photo src={PHOTOS[0].src} alt="La maison et son jardin" />
          <figcaption>Le jardin et sa terrasse</figcaption>
        </figure>
      </div>
    </section>
  );
}
