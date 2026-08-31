import { DISTANCES } from "../lib/site.js";
import Map from "./Map.jsx";

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
          <Map />
        </div>
      </div>
    </section>
  );
}
