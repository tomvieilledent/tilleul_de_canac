import { ROOM_FEATURES } from "../lib/site.js";

export default function Room() {
  return (
    <section id="chambre" className="section section-alt">
      <div className="container">
        <p className="eyebrow">La chambre</p>
        <h2>Chambre familiale, jusqu'à 3 personnes</h2>
        <div className="cards">
          {ROOM_FEATURES.map((f) => (
            <article className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
