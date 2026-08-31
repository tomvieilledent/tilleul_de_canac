import { DISTANCES, MAP } from "../lib/site.js";

export default function Surroundings() {
  return (
    <section id="environs" className="section">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">Les environs</p>
          <h2>Tout est à quelques minutes</h2>
          <ul className="distance-list">
            {DISTANCES.map((d) => (
              <li key={d.place}>
                <span>{d.place}</span>
                <span>{d.value}</span>
              </li>
            ))}
          </ul>
          <p>
            Aux alentours, profitez de la randonnée pédestre, de la pêche et de balades à vélo. Le
            centre historique de Rodez, ses ruelles et ses musées se visitent facilement à pied.
          </p>
        </div>
        <div className="map-wrap">
          <iframe
            title="Localisation à Onet-le-Château"
            src={MAP.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="map-link" href={MAP.link} target="_blank" rel="noopener">
            Ouvrir dans OpenStreetMap
          </a>
        </div>
      </div>
    </section>
  );
}
